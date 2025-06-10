from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event, Engine

db = SQLAlchemy()


@event.listens_for(Engine, "connect")
def enable_sqlite_foreign_keys(dbapi_connection, _):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON;")
    cursor.close()


def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
