from app import app
from backend.models.models import *

with app.app_context():
    db.drop_all()
    db.create_all()