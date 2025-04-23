import os
from flask import Flask
from datetime import datetime
import random

from backend.models.models import User, Post
from backend.database.db import init_db, db

instance_path = os.path.join(os.path.dirname(__file__), '..', 'instance')
app = Flask(__name__, instance_path=instance_path)

db_path = os.path.join(app.instance_path, 'database.sqlite3')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

init_db(app)

def generate_dummy_data():
    users = []
    for i in range(10):
        user = User(
            email=f"user{i}@example.com",
            username=f"user{i}",
            password="password123",
            study=random.choice(['Math', 'Science', 'History', 'Engineering']),
            is_blocked=random.choice([True, False]),
            is_admin=random.choice([True, False])
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    posts = []
    for i in range(20):
        post = Post(
            title=f"Post Title {i}",
            content=f"Content of post {i}. This is some random content.",
            created_at=datetime.now(),
            updated_at=datetime.now(),
            user_id=random.choice(users).user_id
        )
        posts.append(post)

    db.session.add_all(posts)
    db.session.commit()

    print("Dummy data inserted successfully!")
    print(f"{User.query.count()} users in DB")
    print(f"{Post.query.count()} posts in DB")
    print("Using DB path:", db_path)

if __name__ == "__main__":
    os.makedirs(app.instance_path, exist_ok=True)
    with app.app_context():
        generate_dummy_data()
