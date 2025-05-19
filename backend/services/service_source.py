import base64
import os
from uuid import uuid4

from sqlalchemy import asc, desc, or_
from sqlalchemy.exc import SQLAlchemyError
from flask import current_app

from backend.models.models import Source, User, Rating
from backend.database.db import db
from backend.utils.validators import is_isbn


class SourceService:

    @staticmethod
    def get_all_sources(current_user_id, search_term=None, sort_by='recent', offset=0, limit=None):
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

        if sort_by == 'recent':
            query = query.order_by(Source.created_at.desc())
        elif sort_by == 'rating':
            query = (
                query.outerjoin(Source.ratings)
                .group_by(Source.id)
                .order_by(
                    db.func.avg(Rating.rating).desc(), # Calculate average rating for a source
                    Source.created_at.desc()
                ))
        query = query.offset(offset).limit(limit)

        current_user = User.query.get(current_user_id)
        sources = query.all()
        # Add user, number of comments, number of likes
        result = []
        for source in sources:
            source_dict = source.to_dict()
            source_dict['user'] = source.user.to_dict()
            source_dict['ratings'] = [rating.to_dict()['rating'] for rating in source.ratings]
            source_dict['bookmarked_by_current_user'] = source in current_user.bookmarked_sources
            result.append(source_dict)

        return result

    @staticmethod
    def create_source(data, current_user_id):
        try:
            # Validation
            if not data.get('type'):            return Exception('Must provide source type.')
            if not data.get('title'):           return Exception('Must provide title.')
            if not data.get('description'):     return Exception('Must provide description.')
            if not data.get('school_subject'):  return Exception('Must provide school subject.')
            if not data.get('subject'):         return Exception('Must provide subject.')
            if not data.get('difficulty'):      return Exception('Must provide difficulty.')

            if data.get('type') == 'book' and data.get('isbn') is None:
                return Exception('Must provide ISBN when type is book')

            if data.get('type') != 'book' and data.get('url') is None:
                return Exception('Must provide URL')

            if data.get('type') == 'book' and data.get('image') is None:
                return Exception('Must provide image when type is book')

            if not is_isbn(data.get('isbn')):
                return Exception('Invalid ISBN')

            current_user = User.query.get(current_user_id)
            new_source = Source(
                type=data.get('type'),
                title=data.get('title'),
                description=data.get('description'),
                school_subject=data.get('school_subject'),
                subject=data.get('subject'),
                difficulty=data.get('difficulty'),
                user=current_user,
                url=data.get('url'),
                isbn=data.get('isbn'),
                image=None
            )

            if data.get('image') and data.get('type') == 'book':
                image = data.get('image')
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
            print(f"Error creating post: {e}")
            return None
        except Exception as e:
            print(f"Error creating post: {e}")
            db.session.rollback()
            return None
