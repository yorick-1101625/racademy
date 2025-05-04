from sqlalchemy import or_
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash

from backend.models.models import User, Post, Source
from backend.database.db import db
from backend.utils.validate_email import validate_email


class UserService:

    @staticmethod
    def get_all_users(search_term=None, offset=0, limit=10):
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

        query = query.offset(offset).limit(limit)

        users = query.all()
        return [user.to_dict() for user in users]

    @staticmethod
    def get_user_by_id(user_id):
        user = User.query.get(user_id)
        return user.to_dict() if user else None

    # TODO: Implement register instead of create_user
    @staticmethod
    def create_user(data):
        try:
            # Check if email contains @hr.nl
            email = data.get("email")
            if not validate_email(email):
                return Exception("Must provide a valid email address")
            # Check if email already exists
            if User.query.filter_by(email=email).one_or_none() is not None:
                return Exception("Email already exists")

            if not data.get("password"):
                return Exception("Must provide a valid password")

            # Make username the student-number inside the email
            username = email.split('@')[0]

            hashed_password = generate_password_hash(data.get("password"))

            new_user = User(
                email=email,
                password=hashed_password,
                username=username,
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict()
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error creating user: {e}")
            return Exception(f"Error creating user: {e}")

    @staticmethod
    def login_user(email, password):
        user = User.query.filter_by(email=email).first()

        if not user:
            return Exception("User does not exist")

        if not check_password_hash(user.password, password):
            return Exception("Invalid password")

        return user

    @staticmethod
    def update_user(user_id, data):
        user = User.query.get(user_id)
        if not user:
            return None
        try:
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

            db.session.commit()
            return user.to_dict()
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
            db.session.delete(user)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error deleting user: {e}")
            return False
