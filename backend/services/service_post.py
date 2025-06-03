from sqlalchemy import asc, desc, or_
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import aliased

from backend.models.models import Post, User, Tag
from backend.database.db import db


class PostService:

    @staticmethod
    def get_all_posts(current_user_id, search_term=None, user_id=None, sort_by='recent', offset=0, limit=None):
        query = db.session.query(Post).join(Post.user)

        if search_term:
            search_term = f"%{search_term.lower()}%"
            query = query.filter(
                or_(
                    db.func.lower(Post.content).like(search_term),
                    db.func.lower(User.username).like(search_term),
                    db.func.lower(User.email).like(search_term)
                )
            )

        if user_id:
            query = query.filter(Post.user_id == user_id)

        user_alias = aliased(User)

        if sort_by == 'likes':
            query = (
                query.outerjoin(Post.users_liked.of_type(user_alias))
                .group_by(Post.id)
                .order_by(
                    db.func.count(user_alias.id).desc(),
                    Post.created_at.desc()
                )
            )
        else:
            query = query.order_by(Post.created_at.desc())

        query = query.offset(offset).limit(limit)

        current_user = User.query.get(current_user_id)
        posts = query.all()
        result = []
        for post in posts:
            post_dict = post.to_dict()
            user = post.user.to_dict()
            if post.source_id:
                post_dict['linked_source'] = post.source.to_dict()
            user.pop('password')
            post_dict['user'] = user
            post_dict['tags'] = [tag.to_dict()['name'] for tag in post.tags]
            post_dict['number_of_likes'] = len(post.users_liked)
            post_dict['number_of_comments'] = len(post.comments)
            post_dict['liked_by_current_user'] = post in current_user.liked_posts
            post_dict['bookmarked_by_current_user'] = post in current_user.bookmarked_posts

            result.append(post_dict)

        return result

    @staticmethod
    def get_post_by_id(post_id, current_user_id):
        post = Post.query.get(post_id)
        current_user = User.query.get(current_user_id)
        if not post:
            raise Exception("Post not found")

        user = post.user.to_dict()
        user.pop('password')
        post_dict = post.to_dict()
        if post.source_id:
            post_dict['linked_source'] = post.source.to_dict()
        post_dict['user'] = user
        post_dict['tags'] = [tag.to_dict()['name'] for tag in post.tags]
        post_dict['number_of_likes'] = len(post.users_liked)
        post_dict['number_of_comments'] = len(post.comments)
        post_dict['liked_by_current_user'] = post in current_user.liked_posts
        post_dict['bookmarked_by_current_user'] = post in current_user.bookmarked_posts
        return post_dict

    @staticmethod
    def create_post(data, current_user_id):
        try:
            if not data.get('content'): return Exception("Must provide content")

            # Create Tags
            tags = []
            for t in data.get('tags'):
                tag = Tag(name=t.lower())
                tags.append(tag)

            new_post = Post(
                content=data.get('content'),
                user_id=current_user_id,
                source_id=data.get('source_id'),
                tags=tags
            )

            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error creating post: {e}")
            return Exception(f"Error creating post: {e}")

    @staticmethod
    def update_post(post_id, data):
        post = Post.query.get(post_id)
        if not post:
            return None
        try:
            post.content = data.get('content', post.content)

            # Create Tags
            tags = []
            for t in data.get('tags'):
                tag = Tag(name=t.lower())
                tags.append(tag)

            post.tags = tags
            post.source_id = data.get('source_id', None)

            db.session.commit()
            return post.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error updating post: {e}")
            return None

    @staticmethod
    def delete_post(post_id):
        try:
            post = Post.query.get(post_id)
            for comment in post.comments:
                db.session.delete(comment)
            db.session.delete(post)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error deleting post: {e}")
            return False