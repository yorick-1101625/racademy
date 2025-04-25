from sqlalchemy import asc, desc, or_
from sqlalchemy.exc import SQLAlchemyError

from backend.models.models import Source, User
from backend.database.db import db

class SourceService:

    @staticmethod
    def get_all_sources(current_user_id, search_term=None, offset=0, limit=10):
        query = db.session.query(Source)

        if search_term:
            search_term = f"%{search_term.lower()}%"
            query = query.filter(
                or_(
                    db.func.lower(Source.title).like(search_term),
                    db.func.lower(Source.content).like(search_term)
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
