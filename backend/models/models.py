from backend.database.db import db
from datetime import datetime



class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)

    def to_dict(self):
        return {
            column.name: getattr(self, column.name)
            for column in self.__mapper__.columns
        }


class UserBookmarkedPost(BaseModel):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)


class UserLikedPost(BaseModel):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)


class UserBookmarkedSource(BaseModel):
    user_id     = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    source_id   = db.Column(db.Integer, db.ForeignKey('source.id'), nullable=False)


class PostTag(BaseModel):
    post_id   = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    tag_id      = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)


class User(BaseModel):
    email           = db.Column(db.String(255), unique=True, nullable=False)
    username        = db.Column(db.String(255), nullable=False)
    password        = db.Column(db.String(255), nullable=False)
    study           = db.Column(db.String(255))
    profile_picture = db.Column(db.String(255), default="/static/user_images/profile_pictures/default.png")
    is_blocked      = db.Column(db.Boolean, default=False, nullable=False)
    is_admin        = db.Column(db.Boolean, default=False, nullable=False)

    # user -< posts
    created_posts   = db.relationship('Post', back_populates='user')
    # user -< sources
    created_sources   = db.relationship('Source', back_populates='user')
    # user -< comments
    comments        = db.relationship('Comment', back_populates='user')
    # user -< ratings
    created_ratings = db.relationship('Rating', back_populates='user')
    # users >-< posts
    bookmarked_posts  = db.relationship('Post', secondary='user_bookmarked_post', back_populates='users_bookmarked')
    liked_posts     = db.relationship('Post', secondary='user_liked_post', back_populates='users_liked')
    # users >-< sources
    bookmarked_sources = db.relationship('Source', secondary='user_bookmarked_source', back_populates='users_bookmarked')

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}')>"


class Post(BaseModel):
    content         = db.Column(db.Text, nullable=False)
    created_at      = db.Column(db.DateTime, default=datetime.now)
    updated_at      = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # post >- user
    user_id         = db.Column(db.ForeignKey('user.id'), nullable=False)
    user            = db.relationship('User', back_populates='created_posts')
    # post -< comments
    comments        = db.relationship('Comment', back_populates='post')
    # posts >-< users
    users_bookmarked  = db.relationship('User', secondary='user_bookmarked_post', back_populates='bookmarked_posts')
    users_liked     = db.relationship('User', secondary='user_liked_post', back_populates='liked_posts')
    # posts >-< tags
    tags = db.relationship('Tag', secondary='post_tag', back_populates='posts')
    # post - source
    source_id = db.Column(db.Integer, db.ForeignKey('source.id'))
    source = db.relationship('Source')

    def __repr__(self):
        return f"<Post(id={self.id}, name='{self.title}')>"


class Comment(BaseModel):
    content         = db.Column(db.Text, nullable=False)
    created_at      = db.Column(db.DateTime, default=datetime.now)
    updated_at      = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # comment >- user
    user_id         = db.Column(db.ForeignKey('user.id'), nullable=False)
    user            = db.relationship('User', back_populates='comments')
    # comment >- post
    post_id         = db.Column(db.ForeignKey('post.id'), nullable=False)
    post            = db.relationship('Post', back_populates='comments')

    def __repr__(self):
        return f"<Comment(id={self.id}, name='{self.title}')>"


class Source(BaseModel):
    type                = db.Column(db.String(255), nullable=False)
    title               = db.Column(db.String(255), nullable=False)
    description         = db.Column(db.Text, nullable=False)
    created_at          = db.Column(db.DateTime, default=datetime.now)
    school_subject      = db.Column(db.String(255), nullable=False)
    subject             = db.Column(db.String(255), nullable=False)
    difficulty          = db.Column(db.String(255), nullable=False)
    url                 = db.Column(db.String(255))
    isbn                = db.Column(db.String(255))
    image               = db.Column(db.String(255))

    # source >- user
    user_id         = db.Column(db.ForeignKey('user.id'), nullable=False)
    user            = db.relationship('User', back_populates='created_sources')
    # source -< ratings
    ratings = db.relationship('Rating', back_populates='source')
    # sources >-< users
    users_bookmarked = db.relationship('User', secondary='user_bookmarked_source', back_populates='bookmarked_sources')

    def __repr__(self):
        return f"<Source(id={self.id}, type='{self.type}', title='{self.title}')>"


class Rating(BaseModel):
    rating          = db.Column(db.Integer, nullable=False)
    created_at      = db.Column(db.DateTime, default=datetime.now)

    # rating >- user
    user_id         = db.Column(db.ForeignKey('user.id'), nullable=False)
    user            = db.relationship('User', back_populates='created_ratings')
    # rating >- source
    source_id       = db.Column(db.ForeignKey('source.id'), nullable=False)
    source          = db.relationship('Source', back_populates='ratings')

    def __repr__(self):
        return f"<Rating(id={self.id}, rating={self.rating})>"


class Tag(BaseModel):
    name = db.Column(db.String(255), nullable=False)

    # tags >-< posts
    posts = db.relationship('Post', secondary='post_tag', back_populates='tags')

    def __repr__(self):
        return f"<Tag(id={self.id}, name='{self.name}')>"

