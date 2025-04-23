import os

from app import app
from backend.models.models import *

with app.app_context():
    db.drop_all()
    db.create_all()

    test_pfp_path = "static/user_images/test_pfp.png"
    # Create user
    user_1 = User(email='1@hr.nl', username='1', password='1', study='SWD', profile_picture=test_pfp_path)
    db.session.add(user_1)

    # Create post
    first_post = Post(title='Eerste post', content='content', user=user_1)
    db.session.add(first_post)

    # Create comment
    first_comment = Comment(title='Leuke comment' , content='heel leuk', user=user_1, post=first_post)
    db.session.add(first_comment)

    # Add post to liked and favorites
    user_1.liked_posts.append(first_post)
    user_1.favorite_posts.append(first_post)

    # Create Tag
    programming_tag = Tag(name='programmeren')
    db.session.add(programming_tag)

    # Create Source
    source_1 = Source(type='video', title='Source 1', description='description',
                      school_subject='Werkplaats', subject='OOP', difficulty='moeilijk',
                      url='www.google.com', tags=[programming_tag], user=user_1)
    db.session.add(source_1)

    # Create Rating
    rating_1 = Rating(rating='50', content='5 sterren van mij', user=user_1, source=source_1)
    db.session.add(rating_1)

    # Add source to favorites
    user_1.favorite_sources.append(source_1)

    db.session.commit()

    # Querying with relationships
    queried_user = User.query.filter_by(id=1).first()
    print('User: ', queried_user.to_dict())
    print('Created Post: ',  queried_user.created_posts)
    print('Comments: ',  queried_user.comments)
    print('Created Ratings: ',  queried_user.created_ratings)
    print('Favorite Posts: ',  queried_user.favorite_posts)
    print('Liked Posts: ',  queried_user.liked_posts)
    print('Favorite Sources: ',  queried_user.favorite_sources)
