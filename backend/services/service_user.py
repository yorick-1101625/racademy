from flask import current_app
from sqlalchemy import or_, and_
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash

from backend.models.models import User, Post, Source, Rating, UserLikedPost, UserBookmarkedPost, UserBookmarkedSource
from backend.database.db import db
from backend.utils.validators import is_hr_mail


class UserService:

    @staticmethod
    def get_all_users(search_term=None, sort_by='asc', offset=0, limit=None):
        query = db.session.query(User)

        if search_term:
            search_term = f"%{search_term.lower()}%"
            query = query.filter(
                or_(
                    db.func.lower(User.email).like(search_term),
                    db.func.lower(User.username).like(search_term),
                    db.func.lower(User.study).like(search_term),
                )
            )

        if sort_by == 'desc':
            query = query.order_by(User.email.desc())
        else:
            query = query.order_by(User.email.asc())

        query = query.offset(offset).limit(limit)
        users = query.all()
        users = [user.to_dict() for user in users]
        for user in users:
            user.pop("password", None)
        return users


    @staticmethod
    def get_user_by_id(user_id):
        user = User.query.get(user_id)
        if user:
            user_dict = user.to_dict()
            user_dict.pop("password", None)

            # Toegevoegde statistieken
            user_dict["total_likes"] = len(user.liked_posts)
            user_dict["total_bookmarked_posts"] = len(user.bookmarked_posts)
            user_dict["total_bookmarked_sources"] = len(user.bookmarked_sources)

            return user_dict
        return None

    # TODO: Implement register instead of create_user
    @staticmethod
    def create_user(data):
        try:
            email = data.get("email").lower()
            if not is_hr_mail(email):
                return Exception("Must provide a valid email address")

            if User.query.filter_by(email=email).one_or_none() is not None:
                return Exception("Email already exists")

            if not data.get("password"):
                return Exception("Must provide a valid password")

            username = email.split('@')[0]
            hashed_password = generate_password_hash(data.get("password"))

            new_user = User(
                email=email,
                password=hashed_password,
                username=username,
            )
            db.session.add(new_user)
            db.session.commit()

            new_user = new_user.to_dict()
            new_user.pop("password", None)
            return new_user
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error creating user: {e}")
            return Exception(f"Error creating user: {e}")


    @staticmethod
    def login_user(email, password):
        user = User.query.filter_by(email=email.lower()).first()

        if not user:
            return Exception("User does not exist")
        if not check_password_hash(user.password, password):
            return Exception("Invalid password")

        return user


    @staticmethod
    def update_user(user_id, data):
        import os
        import uuid
        import base64

        user = User.query.get(user_id)
        if not user:
            return None
        try:
            image_data = data.get('image')
            if image_data and 'base64' in image_data and 'mime_type' in image_data:
                old_picture = user.profile_picture

                # Check if file is an image
                mime_type = image_data['mime_type']
                file_type = mime_type.split('/')[0]
                if file_type != 'image':
                    return Exception('Uploaded file must be an image')

                # Create filename
                file_extension = mime_type.split('/')[-1]
                filename = f"{uuid.uuid4()}.{file_extension}"

                # Save image in bytes
                base64_str = image_data['base64']
                image_bytes = base64.b64decode(base64_str)
                save_dir = current_app.config['IMAGE_UPLOAD_FOLDER'] / 'profile_pictures'
                os.makedirs(save_dir, exist_ok=True)

                file_path = save_dir / filename
                with open(file_path, 'wb') as f:
                    f.write(image_bytes)

                user.profile_picture = f"/static/user_images/profile_pictures/{filename}"

                # Delete old image
                if old_picture != "/static/user_images/profile_pictures/default.png":
                    os.remove(str(current_app.config['ROOT_PATH']) + (old_picture.replace('/', os.sep)))

            user.email = data.get('email', user.email)
            user.username = data.get('username', user.username)
            user.study = data.get('study', user.study)

            if data.get('liked_post'):
                liked_post = Post.query.get(data.get('liked_post'))
                if liked_post in user.liked_posts:
                    user.liked_posts.remove(liked_post)
                else:
                    user.liked_posts.append(liked_post)

            if data.get('bookmarked_post'):
                bookmarked_post = Post.query.get(data.get('bookmarked_post'))
                if bookmarked_post in user.bookmarked_posts:
                    user.bookmarked_posts.remove(bookmarked_post)
                else:
                    user.bookmarked_posts.append(bookmarked_post)

            if data.get('bookmarked_source'):
                bookmarked_source = Source.query.get(data.get('bookmarked_source'))
                if bookmarked_source in user.bookmarked_sources:
                    user.bookmarked_sources.remove(bookmarked_source)
                else:
                    user.bookmarked_sources.append(bookmarked_source)

            if data.get('rated_source'):
                source_id = data.get('rated_source')

                if data.get('rating'):
                    rating = int(data.get('rating'))
                    if rating not in [10,20,30,40,50]:
                        return Exception("Invalid rating")

                    current_rating = Rating.query.filter(
                        and_(Rating.user_id==user_id, Rating.source_id==source_id)
                    ).one_or_none()
                    # Update rating
                    if current_rating:
                        current_rating.rating = rating

                    # Create rating
                    else:
                        new_rating = Rating(
                            rating=rating,
                            source_id=source_id,
                            user_id=user_id
                        )
                        db.session.add(new_rating)
                else:
                    deleted_rating = Rating.query.filter(
                        and_(Rating.user_id==user_id, Rating.source_id==source_id)
                    ).one_or_none()

                    if deleted_rating:
                        db.session.delete(deleted_rating)

            db.session.commit()

            user = user.to_dict()
            user.pop("password", None)
            return user
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error updating user: {e}")
            return None


    @staticmethod
    def delete_user(user_id):
        user = User.query.get(user_id)
        if not user:
            return False
        try:
            # Delete all content created by user
            for post in user.created_posts:
                db.session.delete(post)
            for source in user.created_sources:
                db.session.delete(source)
            for comment in user.comments:
                db.session.delete(comment)
            for rating in user.created_ratings:
                db.session.delete(rating)
            db.session.delete(user)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error deleting user: {e}")
            return False

    @staticmethod
    def get_liked_posts(user_id, current_user_id, offset=0, limit=None ):
        user = User.query.get(user_id)
        if not user:
            raise Exception("User does not exist")

        user_liked_posts = (
            db.session
                .query(UserLikedPost)
                .filter(UserLikedPost.user_id == user.id)
                .order_by(UserLikedPost.liked_at.desc())
                .limit(limit)
                .offset(offset)
                .all()
        )


        current_user = User.query.get(current_user_id)

        result = []
        for user_liked_post in user_liked_posts:
            post = Post.query.get(user_liked_post.post_id)
            user = post.user.to_dict()
            user.pop('password')
            post_dict = post.to_dict()

            post_dict['user'] = user
            post_dict['tags'] = [tag.to_dict()['name'] for tag in post.tags]
            post_dict['number_of_likes'] = len(post.users_liked)
            post_dict['number_of_comments'] = len(post.comments)
            post_dict['liked_by_current_user'] = post in current_user.liked_posts
            post_dict['bookmarked_by_current_user'] = post in current_user.bookmarked_posts
            result.append(post_dict)

        return result


    @staticmethod
    def get_bookmarked_posts(user_id, current_user_id, offset=0, limit=None):

        user = User.query.get(user_id)
        if not user:
            raise Exception("User does not exist")

        user_bookmarked_posts = (
            db.session.query(UserBookmarkedPost)
                .filter(UserBookmarkedPost.user_id == user.id)
                .order_by(UserBookmarkedPost.bookmarked_at.desc())
                .limit(limit)
                .offset(offset)
                .all()
        )

        current_user = User.query.get(current_user_id)

        posts = []
        for user_bookmarked_post in user_bookmarked_posts:
            post = Post.query.get(user_bookmarked_post.post_id)
            user = post.user.to_dict()
            user.pop('password')
            post_dict = post.to_dict()


            post_dict['user'] = user
            post_dict['tags'] = [tag.to_dict()['name'] for tag in post.tags]
            post_dict['number_of_likes'] = len(post.users_liked)
            post_dict['number_of_comments'] = len(post.comments)
            post_dict['liked_by_current_user'] = post in current_user.liked_posts
            post_dict['bookmarked_by_current_user'] = post in current_user.bookmarked_posts
            posts.append(post_dict)

        return posts


    @staticmethod
    def get_bookmarked_sources(user_id, current_user_id, offset=0, limit=None):

        user = User.query.get(user_id)
        if not user:
            raise Exception("User does not exist")

        user_bookmarked_sources = (
            db.session
            .query(UserBookmarkedSource)
            .filter(UserBookmarkedSource.user_id == user.id)
            .order_by(UserBookmarkedSource.bookmarked_at.desc())
            .limit(limit)
            .offset(offset)
            .all()
        )

        current_user = User.query.get(current_user_id)

        sources = []
        for user_bookmarked_source in user_bookmarked_sources:
            source = Source.query.get(user_bookmarked_source.source_id)
            current_rating = Rating.query.filter(
                and_(Rating.user_id == current_user_id, Rating.source_id == source.id)
            ).one_or_none()
            if current_rating:
                current_rating = current_rating.rating

            user = source.user.to_dict()
            user.pop('password')
            source_dict = source.to_dict()
            source_dict['user'] = source.user.to_dict()
            source_dict['ratings'] = [rating.to_dict()['rating'] for rating in source.ratings]
            source_dict['bookmarked_by_current_user'] = source in current_user.bookmarked_sources
            source_dict['current_rating'] = current_rating
            sources.append(source_dict)

        return sources
