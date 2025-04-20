from backend.blueprints.post import api_post
from backend.blueprints.user import api_user


def register_blueprints(app):
    app.register_blueprint(api_post, url_prefix="/api/post")
    app.register_blueprint(api_user, url_prefix="/api/user")