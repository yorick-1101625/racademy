import os
import string

from flask import Flask
from datetime import datetime
import random

from werkzeug.security import generate_password_hash

from backend.models.models import User, Post, Comment, Tag, Source, Rating
from backend.database.db import init_db, db

instance_path = os.path.join(os.path.dirname(__file__), '..', 'instance')
app = Flask(__name__, instance_path=instance_path)

db_path = os.path.join(app.instance_path, 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

init_db(app)

def generate_random_isbn():
    isbn = ''.join(random.choices(string.digits, k=13))
    return isbn

def generate_random_youtube_url():
    youtube_urls = [
        "https://www.youtube.com/watch?v=gvkqT_Uoahw",
    ]
    return random.choice(youtube_urls)

def generate_dummy_data():
    db.drop_all()
    db.create_all()

    os.makedirs("static/user_images/profile_pictures", exist_ok=True)

    users = [
        User(
            email="test@hr.nl",
            username="test",
            password=generate_password_hash("1234"),
            study="Software Development",
            is_blocked=False,
            is_admin=True,
            profile_picture="/static/user_images/profile_pictures/default.png"
        ),
        User(
            email="hoiyorick@hr.nl",
            username="Yo rick",
            password=generate_password_hash("1234"),
            study="Software Development",
            is_blocked=False,
            is_admin=True,
            profile_picture="/static/user_images/profile_pictures/yorick.webp"
        ),
        User(
            email="hoimarco@hr.nl",
            username="Marco",
            password=generate_password_hash("1234"),
            study="Software Development",
            is_blocked=False,
            is_admin=True,
            profile_picture="/static/user_images/profile_pictures/marco.webp"
        ),
        User(
            email="hoikevin@hr.nl",
            username="kevin",
            password=generate_password_hash("1234"),
            study="Software Development",
            is_blocked=False,
            is_admin=True,
            profile_picture="/static/user_images/profile_pictures/kevin.webp"
        ),
    ]

    # for i in range(10):
    #     user = User(
    #         email=f"test{i}@hr.nl",
    #         username=f"user{i}",
    #         password=generate_password_hash("1234"),
    #         study=random.choice(['Software Development']),
    #         is_blocked=random.choice([True, False]),
    #         is_admin=random.choice([True, False])
    #     )
    #     users.append(user)
    db.session.add_all(users)
    db.session.commit()

    tags = [Tag(name=name) for name in ['Python', 'Flask', 'SQL', 'React']]
    db.session.add_all(tags)
    db.session.commit()

    sample_post_texts = [
        "Eerste keer dat ik Flask gebruik, en ik ben verkocht! 🔥 #Python #WebDev",
        "SQL lijkt simpel, maar er zit zoveel kracht achter. 💪",
        "React hooks... ik snap het nog steeds niet helemaal 😅 #frontend",
        "Weekendproject: eigen portfolio bouwen met React 🚀",
        "Async Python gelezen vandaag. Echt mindblowing 🤯",
        "Waarom duurt debuggen altijd 80% van de tijd? 😩",
        "Flask en React combineren werkt verrassend goed ❤️",
        "Eindelijk begrepen hoe database migraties werken in Flask. 🙌",
        "Even pauze. Tijd om wat zonlicht te zien 🌞 #coderlife",
        "Ik blijf maar dezelfde bug tegenkomen... help 😤",
        "Code werkt in één keer... dat kan niet kloppen 😎",
        "Refactoren is leuk, tot je je eigen spaghetti tegenkomt 🍝",
        "Een jaar geleden begonnen met coderen. Wat een reis 💻✨",
        "Wat is volgens jullie de beste folderstructuur voor een React project? 🤔",
        "Clean Code lezen voor de tweede keer. Elke keer leer ik iets nieuws 📘",
        "Flask is top, maar misschien toch eens Django proberen?",
        "List comprehensions in Python... heerlijk kort en krachtig.",
        "Vandaag NativeWind uitgeprobeerd. Ziet er strak uit! 🎨",
        "Late night coderen met lo-fi op de achtergrond 🌙 #devvibes",
        "Eerste pull request geaccepteerd! Open source is tof 🎉"
    ]

    posts = []
    for i in range(20):
        post = Post(
            title=f"Post Titel {i}",
            content=random.choice(sample_post_texts),
            created_at=datetime.now(),
            updated_at=datetime.now(),
            user=random.choice(users),
            tags=random.sample(tags, k=random.randint(1, 2))
        )
        posts.append(post)
    db.session.add_all(posts)
    db.session.commit()

    comments = []
    for i in range(30):
        comment = Comment(
            title=f"Comment {i}",
            content=f"Dit is een comment {i}.",
            user=random.choice(users),
            post=random.choice(posts)
        )
        comments.append(comment)
    db.session.add_all(comments)
    db.session.commit()

    sources = []
    for i in range(10):
        source = Source(
            type=random.choice(['video', 'article', 'book']),
            title=f"Bron {i}",
            description=f"Beschrijving voor bron {i}",
            school_subject=random.choice(['Werkplaats', 'Programming Essentials']),
            subject=random.choice(['Programmeren', 'Python', 'Javascript']),
            difficulty=random.choice(['makkelijk', 'gemiddeld', 'moeilijk']),
            user=random.choice(users)
        )
        if source.type == 'video':
            source.url = generate_random_youtube_url()
        if source.type == 'book':
            source.isbn = generate_random_isbn()
            source.image = '/static/user_images/sources/bookcover.jpg'
        if source.type == 'article':
            source.url = "https://www.netguru.com/glossary/react-native"

        sources.append(source)
    db.session.add_all(sources)
    db.session.commit()

    ratings = []
    for i in range(15):
        rating = Rating(
            rating=random.choice([10, 20, 30, 40, 50]),
            content=f"Dit is rating {i}",
            user=random.choice(users),
            source=random.choice(sources)
        )
        ratings.append(rating)
    db.session.add_all(ratings)
    db.session.commit()

    for user in users:
        user.bookmarked_posts.extend(random.sample(posts, k=random.randint(0, 5)))
        user.liked_posts.extend(random.sample(posts, k=random.randint(0, 5)))
        user.bookmarked_sources.extend(random.sample(sources, k=random.randint(0, 3)))

    db.session.commit()

    print("Dummy data inserted successfully!")
    print(f"{User.query.count()} users in DB")
    print(f"{Post.query.count()} posts in DB")
    print(f"{Comment.query.count()} comments in DB")
    print(f"{Tag.query.count()} tags in DB")
    print(f"{Source.query.count()} sources in DB")
    print(f"{Rating.query.count()} ratings in DB")
    print("Using DB path:", db_path)

if __name__ == "__main__":
    os.makedirs(app.instance_path, exist_ok=True)
    with app.app_context():
        generate_dummy_data()