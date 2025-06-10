import os
import random
import shutil
import string
from datetime import datetime
from pathlib import Path
from uuid import uuid4

from flask import Flask
from werkzeug.security import generate_password_hash

from database.db import init_db, db
from models.models import User, Post, Comment, Tag, Source, Rating

instance_path = os.path.join(os.path.dirname(__file__), '..', 'instance')
app = Flask(__name__, instance_path=instance_path)

db_path = os.path.join(app.instance_path, 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
ROOT_PATH = Path(__file__).parent.parent.resolve()

init_db(app)


def generate_random_isbn():
    isbn = ''.join(random.choices(string.digits, k=13))
    return isbn


def generate_random_youtube_url():
    youtube_urls = [
        "https://www.youtube.com/watch?v=gvkqT_Uoahw",
    ]
    return random.choice(youtube_urls)


def generate_files():
    shutil.rmtree(ROOT_PATH / 'static' / 'user_images' / 'sources', ignore_errors=True)
    shutil.rmtree(ROOT_PATH / 'static' / 'user_images' / 'profile_pictures', ignore_errors=True)

    os.makedirs(ROOT_PATH / "static"/"user_images"/"profile_pictures", exist_ok=True)
    os.makedirs(ROOT_PATH /"static"/"user_images"/"sources", exist_ok=True)
    # Copy dummy images to user_images folder
    shutil.copy(
        ROOT_PATH / 'static' / 'dummy_images' / 'default.png',
        ROOT_PATH / 'static' / 'user_images' / 'profile_pictures' / f'default.png'
    )
    shutil.copy(
        ROOT_PATH / 'static' / 'dummy_images' / 'kevin.webp',
        ROOT_PATH / 'static' / 'user_images' / 'profile_pictures' / f'kevin.webp'
    )
    shutil.copy(
        ROOT_PATH / 'static' / 'dummy_images' / 'marco.webp',
        ROOT_PATH / 'static' / 'user_images' / 'profile_pictures' / f'marco.webp'
    )
    shutil.copy(
        ROOT_PATH / 'static' / 'dummy_images' / 'yorick.webp',
        ROOT_PATH / 'static' / 'user_images' / 'profile_pictures' / f'yorick.webp'
    )


def generate_dummy_data():
    db.drop_all()
    db.create_all()

    generate_files()

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
        "Eerste pull request geaccepteerd! Open source is tof 🎉",
        "Vandaag voor het eerst een volledige REST API opgezet met Flask én getest met Postman. Het was even puzzelen met de routes en error handling, maar uiteindelijk liep alles als een trein. Echt leuk om te zien hoe alles samenkomt. Volgende stap: JWT authenticatie toevoegen! 🔐",
        "Ik ben al een paar dagen bezig met het refactoren van een oud project, en het is echt bizar hoeveel beter mijn code nu is dan een jaar geleden. Alles is ineens zoveel leesbaarder, modulaire functies, en minder gekke hacks. Het voelt alsof ik m’n eigen code in een andere taal lees 😅",
        "Vandaag geprobeerd om mijn project mobile-first te maken. Niet normaal hoeveel kleine layout bugs je tegenkomt zodra je op een kleiner scherm kijkt. Maar wat een verschil als het goed werkt! Responsive design is echt een kunst op zich 📱🎨",
        """Afgelopen maand heb ik mezelf uitgedaagd om een volledige webapplicatie from scratch te bouwen, zonder tutorials stap voor stap te volgen — gewoon zelf uitzoeken, documentatie lezen, fouten maken, en vooral: veel leren.

Ik koos Flask voor de backend, omdat ik al wat ervaring had met Python, en React voor de frontend (dat laatste bleef wel een uitdaging, vooral met state management en props-drilling). Alles lokaal opgezet met Docker, PostgreSQL als database, en uiteindelijk zelfs user authentication met JWT geïmplementeerd.

De eerste week was chaotisch. Routes werkten niet, ik kreeg rare CORS-fouten, en m’n React-componenten herlaadden constant zonder reden. Maar iedere keer als ik een bug oploste, voelde het als een mini-overwinning."""
    ]

    sample_comment_texts = [
        "Haha, dat gevoel als alles ineens werkt... pure magie 😄",
        "Knap dat je alles zelf hebt uitgezocht zonder tutorials. Dat is echt de beste manier om te leren.",
        "Ik herken dat gevoel van spaghetti-code tijdens het refactoren. Je leert zoveel van je oude fouten!",
        "Eerste pull request is altijd spannend. Goed gedaan! 💪",
        "Dat moment wanneer je begrijpt hoe het werkt… zo'n opluchting!",
        "Zonlicht tijdens het coderen? Wat is dat? 😅",
        "Ik blijf het lastig vinden om frontend en backend mooi te laten samenwerken. Props dat jij het combineert!",
        "Wat een herkenbare post. Ik leer ook elke dag nog bij. Programmeerreis ftw! 🧭",
        "Clean Code zou eigenlijk verplichte kost moeten zijn voor elke dev.",
        "Even een random vraag: gebruik je TypeScript in je React-projecten?",
        "Heb je tips om Flask routes schoon te houden bij grotere projecten?",
        "Ik zit nu ook midden in een project from scratch. Leuk en frustrerend tegelijk 😂",
        "Gebruik je dark mode in je IDE? Vraag voor een vriend.",
        "Dat eerste gevoel van 'wow, ik snap het' blijft magisch. Gefeliciteerd met je vooruitgang!",
        "Soms voelt debuggen als een escape room zonder hints. Maar oh wat is het lekker als je eruit komt.",
        "Ik ben benieuwd of je achteraf dingen anders zou aanpakken. Reflecties zijn altijd interessant!",
        "Dit soort updates motiveren echt. Thanks voor het delen en succes met de volgende stap!"
    ]

    posts = []
    for i in range(30):
        post = Post(
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
            content=random.choice(sample_comment_texts),
            user=random.choice(users),
            post=random.choice(posts)
        )
        comments.append(comment)
    db.session.add_all(comments)
    db.session.commit()

    sample_source_titles = [
        "Goed boek om Javascript te leren!",
        "Python tutorial van youtube!",
        "Beste artikel over OOP",
        "Gratis cursus over Web Dev.",
        "Uitstekende handleiding voor beginners in Java!",
        "Compleet video cursus over React!",
        "Top 10 tips voor effectief leren van C++",
        "Gratis online cursus over machine learning!",
        "De beste bronnen voor leren van SQL!",
        "Interactieve video's over HTML en CSS",
        "Gratis e-book over Python voor data science",
        "Uitstekende handleiding voor beginners in Ruby!",
        "Compleet video cursus over Angular!",
        "Top 10 tips voor effectief leren van Swift",
        "Gratis online cursus over blockchain technologie!",
        "De beste bronnen voor leren van JavaScript frameworks!",
        "Interactieve video's over Node.js",
        "Gratis e-book over PHP voor web development",
        "Uitstekende handleiding voor beginners in Kotlin!"
    ]

    sources = []
    for i in range(20):
        source = Source(
            type=random.choice(['video', 'article', 'book']),
            title=random.choice(sample_source_titles),
            description=f"Beschrijving voor bron {i}",
            school_subject=random.choice(['Werkplaats', 'Programming Essentials']),
            subject=random.choice(['Programmeren', 'Python', 'Javascript']),
            difficulty=random.choice(['easy', 'medium', 'hard', 'expert']),
            user=random.choice(users)
        )
        if source.type == 'video':
            source.url = generate_random_youtube_url()
        if source.type == 'book':
            source.isbn = generate_random_isbn()
            img_id = uuid4()
            shutil.copy(
                ROOT_PATH / 'static' / 'dummy_images' / 'bookcover.jpg',
                ROOT_PATH / 'static' / 'user_images' / 'sources' / f'{img_id}.jpg'
            )
            source.image = f'/static/user_images/sources/{img_id}.jpg'
        if source.type == 'article':
            source.url = "https://www.netguru.com/glossary/react-native"

        sources.append(source)
    db.session.add_all(sources)
    db.session.commit()

    ratings = []
    for i in range(len(sources)):
        rating = Rating(
            rating=random.choice([10, 20, 30, 40, 50]),
            user=random.choice(users),
            source=sources[i]
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
