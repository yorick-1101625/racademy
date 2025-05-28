from sqlalchemy.exc import SQLAlchemyError
from backend.database.db import db
from backend.models.models import Comment


class CommentService:

    @staticmethod
    def create_comment(data, current_user_id):
        try:
            if not data.get('content'): return Exception("Must provide content")

            new_comment = Comment(
                content=data.get('content'),
                user_id=current_user_id,
                post_id=data.get('post_id'),
            )

            db.session.add(new_comment)
            db.session.commit()
            return new_comment.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error creating comment: {e}")
            return Exception(f"Error creating comment: {e}")
