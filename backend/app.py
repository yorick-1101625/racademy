from pathlib import Path

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from blueprints import register_blueprints
from database.db import init_db, db



ROOT_PATH = Path(__file__).parent.resolve()
STATIC_PATH = ROOT_PATH / 'static'


app = Flask(__name__)

# Configuratie
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'key'
app.config['ROOT_PATH'] = ROOT_PATH
app.config['IMAGE_UPLOAD_FOLDER'] = STATIC_PATH / 'user_images'

init_db(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

from models.models import User

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return db.session.get(User, identity)

register_blueprints(app)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
