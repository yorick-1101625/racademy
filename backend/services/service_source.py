from sqlalchemy import asc, desc, or_
from sqlalchemy.exc import SQLAlchemyError

from backend.models.models import Source, User
from backend.database.db import db

class SourceService:

    @staticmethod
    def get_all_sources(current_user_id, search_term=None, offset=0, limit=10):
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
            if data.get('type') == 'book' and data.get('isbn') is None:
                return Exception('Must provide ISBN when type is book')
            elif data.get('url') is None:
                return Exception('Must provide URL')

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
            )
            db.session.add(new_source)
            db.session.commit()
            return new_source.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error creating post: {e}")
            return None
