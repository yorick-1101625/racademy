from sqlalchemy import asc, desc, or_
from sqlalchemy.exc import SQLAlchemyError

from backend.models.models import Post, User
from backend.database.db import db


class PostService:

    @staticmethod
    def get_all_posts(current_user_id, search_term=None, offset=0, limit=10):
        query = db.session.query(Post)

        if search_term:
            search_term = f"%{search_term.lower()}%"
            query = query.filter(
                or_(
                    db.func.lower(Post.title).like(search_term),
                    db.func.lower(Post.content).like(search_term)
                )
            )

        query = query.offset(offset).limit(limit)

        current_user = User.query.get(current_user_id)
        posts = query.all()
        # Add user, number of comments, number of likes, liked by current user
        result = []
        for post in posts:
            post_dict = post.to_dict()
            post_dict['user'] = post.user.to_dict()
            post_dict['number_of_likes'] = len(post.users_liked)
            post_dict['number_of_comments'] = len(post.users_favorite)
            post_dict['liked_by_current_user'] = post in current_user.liked_posts
            result.append(post_dict)

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