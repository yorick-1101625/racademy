from backend.models.models import Post
from backend.database.db import db
from sqlalchemy.exc import SQLAlchemyError

class PostService:

    @staticmethod
    def get_all_posts():
        posts = Post.query.all()
        result = [post.to_dict() for post in posts]
        return result

    @staticmethod
    def get_post_by_id(post_id):
        post = Post.query.get(post_id)
        return post.to_dict() if post else None

    @staticmethod
    def create_post(data):
        try:
            new_post = Post(
                title=data.get('title'),
                content=data.get('content')
            )
            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error creating post: {e}")
            return None

    @staticmethod
    def update_post(post_id, data):
        post = Post.query.get(post_id)
        if not post:
            return None
        try:
            post.title = data.get('title', post.title)
            post.content = data.get('content', post.content)
            db.session.commit()
            return post.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error updating post: {e}")
            return None

    @staticmethod
    def delete_post(post_id):
        post = Post.query.get(post_id)
        if not post:
            return False
        try:
            db.session.delete(post)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error deleting post: {e}")
            return False