from sqlalchemy.exc import SQLAlchemyError

from backend.database.db import db
from backend.models.models import Comment, Post


class CommentService:

    @staticmethod
    def get_all_comments(post_id):
        post = Post.query.get(post_id)
        if not post:
            raise ValueError(f"Post with id {post_id} not found.")

        query = db.session.query(Comment).join(Comment.user).filter(Comment.post_id == post_id)
        query = query.order_by(Comment.created_at.desc())
        comments = query.all()

        result = []
        for comment in comments:
            comment_dict = comment.to_dict()
            comment_dict['user'] = comment.user.to_dict()
            result.append(comment_dict)

        return result

    @staticmethod
    def get_comment_by_id(comment_id):
        comment = Comment.query.get(comment_id)
        if not comment:
            raise Exception("Comment not found")

        user = comment.user.to_dict()
        user.pop('password')
        comment_dict = comment.to_dict()
        comment_dict['user'] = user
        return comment_dict

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

    @staticmethod
    def delete_comment(comment_id):
        try:
            comment = Comment.query.get(comment_id)
            db.session.delete(comment)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error deleting comment: {e}")
            return False
