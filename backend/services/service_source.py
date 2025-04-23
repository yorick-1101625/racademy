from sqlalchemy import asc, desc, or_
from sqlalchemy.exc import SQLAlchemyError

from backend.models.models import Source, User
from backend.database.db import db

class SourceService:

    @staticmethod
    def get_all_sources(search_term=None, offset=0, limit=10):
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

        sources = query.all()
        # Add user, number of comments, number of likes
        result = []
        for source in sources:
            source_dict = source.to_dict()
            source_dict['user'] = source.user.to_dict()
            source_dict['number_of_favorites'] = len(source.users_favorite)
            source_dict['tags'] = [tag.to_dict() for tag in source.tags]
            source_dict['ratings'] = [rating.to_dict()['rating'] for rating in source.ratings]
            result.append(source_dict)

        return result
