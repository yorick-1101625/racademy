from backend.database.db import db
from datetime import datetime

class BaseModel(db.Model):
    __abstract__ = True

    def to_dict(self):
        return {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }

class User(BaseModel):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255))
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    study = db.Column(db.String(255))
    is_blocked = db.Column(db.Boolean)
    is_admin = db.Column(db.Boolean)

    posts = db.relationship('Post', back_populates='user')

    def __repr__(self):
        return f"Test(id={self.user_id}, name={self.username})"

class Post(BaseModel):
    post_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=True)
    content = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.Date, default=datetime)
    updated_at = db.Column(db.DateTime, default=datetime, onupdate=datetime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

    user = db.relationship('User', back_populates='posts')