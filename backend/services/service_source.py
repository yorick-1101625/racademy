import base64
import os
from uuid import uuid4

from flask import current_app
from sqlalchemy import or_, and_
from sqlalchemy.exc import SQLAlchemyError

from database.db import db
from models.models import Source, User, Rating
from utils.validators import is_isbn


class SourceService:

    @staticmethod
    def get_all_sources(current_user_id, search_term=None, user_id=None, sort_by='recent', offset=0, limit=None):
        query = db.session.query(Source).join(Source.user)

        if search_term:
            search_term = f"%{search_term.lower()}%"
            query = query.filter(
                or_(
                    db.func.lower(Source.title).like(search_term),
                    db.func.lower(Source.description).like(search_term),
                    db.func.lower(User.username).like(search_term),
                    db.func.lower(User.email).like(search_term)
                )
            )

        if user_id:
            query = query.filter(Source.user_id == user_id)

        if sort_by == 'rating':
            query = (
                query.outerjoin(Source.ratings)
                .group_by(Source.id)
                .order_by(
                    db.func.avg(Rating.rating).desc(),
                    Source.created_at.desc()
                )
            )
        else:
            query = query.order_by(Source.created_at.desc())

        query = query.offset(offset).limit(limit)

        current_user = User.query.get(current_user_id)
        sources = query.all()
        result = []
        for source in sources:
            current_rating = Rating.query.filter(
                and_(Rating.user_id == current_user_id, Rating.source_id == source.id)
            ).one_or_none()
            if current_rating:
                current_rating = current_rating.rating

            user = source.user.to_dict()
            user.pop('password')
            source_dict = source.to_dict()
            source_dict['user'] = user
            source_dict['ratings'] = [rating.to_dict()['rating'] for rating in source.ratings]
            source_dict['bookmarked_by_current_user'] = source in current_user.bookmarked_sources
            source_dict['current_rating'] = current_rating
            result.append(source_dict)

        return result

    @staticmethod
    def get_source_by_id(source_id, current_user_id):
        source = Source.query.get(source_id)
        current_user = User.query.get(current_user_id)
        if not source:
            raise Exception("Source not found")

        current_rating = Rating.query.filter(
            and_(Rating.user_id == current_user_id, Rating.source_id == source.id)
        ).one_or_none()
        if current_rating:
            current_rating = current_rating.rating

        user = source.user.to_dict()
        user.pop('password')
        source_dict = source.to_dict()
        source_dict['user'] = user
        source_dict['ratings'] = [rating.to_dict()['rating'] for rating in source.ratings]
        source_dict['bookmarked_by_current_user'] = source in current_user.bookmarked_sources
        source_dict['current_rating'] = current_rating
        return source_dict

    @staticmethod
    def create_source(data, current_user_id):
        try:
            if not data.get('type'): return Exception('Must provide source type.')
            if not data.get('title'): return Exception('Must provide title.')
            if not data.get('description'): return Exception('Must provide description.')
            if not data.get('school_subject'): return Exception('Must provide school subject.')
            if not data.get('subject'): return Exception('Must provide subject.')
            if not data.get('difficulty'): return Exception('Must provide difficulty.')

            if data.get('type') == 'book':
                if not data.get('isbn'): return Exception('Must provide ISBN when type is book')
                if not is_isbn(data.get('isbn')): return Exception('Invalid ISBN')
                if data.get('image') is None: return Exception('Must provide image when type is book')
            else:
                if not data.get('url'): return Exception('Must provide URL')

            new_source = Source(
                type=data.get('type'),
                title=data.get('title'),
                description=data.get('description'),
                school_subject=data.get('school_subject'),
                subject=data.get('subject'),
                difficulty=data.get('difficulty'),
                user_id=current_user_id,
                url=data.get('url'),
                isbn=data.get('isbn'),
                image=None
            )

            image = data.get('image')
            source_type = data.get('type')
            if image and (source_type == 'book' or source_type == 'link'):
                mime_type = image['mime_type'].split('/')
                if mime_type[0] != 'image':
                    return Exception('Uploaded file must be an image')
                file_extension = '.' + mime_type[-1]
                image_path = current_app.config['IMAGE_UPLOAD_FOLDER'] / 'sources' / f"{uuid4()}{file_extension}"
                with open(image_path, 'wb') as file:
                    file.write(base64.b64decode(image['base64']))

                image_path = '/' + str(image_path.relative_to(current_app.config['ROOT_PATH'])).replace(os.sep, '/')
                new_source.image = image_path

            db.session.add(new_source)
            db.session.commit()
            return new_source.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error creating source: {e}")
            return None
        except Exception as e:
            db.session.rollback()
            print(f"Error creating source: {e}")
            return None

    @staticmethod
    def delete_source(source_id):
        try:
            source = Source.query.get(source_id)

            for rating in source.ratings:
                db.session.delete(rating)

            if source.image:
                # Delete image
                os.remove(str(current_app.config['ROOT_PATH']) + (source.image.replace('/', os.sep)))

            db.session.delete(source)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error deleting source: {e}")
            return Exception("Error deleting source")

    @staticmethod
    def edit_source(data, source_id):
        try:
            source = Source.query.get(source_id)
            source.type = data.get('type', source.type)

            # Validation
            if source.type == 'book':
                if data.get('isbn') and not is_isbn(data.get('isbn')):
                    return Exception('Invalid ISBN')

            image = data.get('image')
            if image and (source.type == 'book') and not image == source.image:
                old_image = source.image

                mime_type = image['mime_type'].split('/')
                if mime_type[0] != 'image':
                    return Exception('Uploaded file must be an image')
                file_extension = '.' + mime_type[-1]
                image_path = current_app.config['IMAGE_UPLOAD_FOLDER'] / 'sources' / f"{uuid4()}{file_extension}"
                with open(image_path, 'wb') as file:
                    file.write(base64.b64decode(image['base64']))

                image_path = '/' + str(image_path.relative_to(current_app.config['ROOT_PATH'])).replace(os.sep, '/')
                source.image = image_path

                # Delete old image
                if old_image:
                    os.remove(str(current_app.config['ROOT_PATH']) + (source.image.replace('/', os.sep)))

            source.title = data.get('title', source.title)
            source.description = data.get('description', source.description)
            source.school_subject = data.get('school_subject', source.school_subject)
            source.subject = data.get('subject', source.subject)
            source.difficulty = data.get('difficulty', source.difficulty)
            source.url = data.get('url', source.url)
            source.isbn = data.get('isbn', source.isbn)

            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error deleting source: {e}")
            return Exception("Error deleting source")
