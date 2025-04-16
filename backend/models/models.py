import flask_sqlalchemy
from backend.database.db import db

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f"Test(id={self.id}, name={self.name})"