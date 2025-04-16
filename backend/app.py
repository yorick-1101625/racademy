from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from backend.blueprints import register_blueprints
from backend.database.db import init_db, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///HoiRuben.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
init_db(app)
migrate = Migrate(app, db)
CORS(app)
register_blueprints(app)

if __name__ == '__main__':
    app.run(debug=True)
