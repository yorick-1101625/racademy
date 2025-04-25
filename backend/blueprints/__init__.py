from backend.blueprints.post import api_post
from backend.blueprints.user import api_user
from backend.blueprints.source import api_source
from backend.blueprints.login import api_login


def register_blueprints(app):
    app.register_blueprint(api_post, url_prefix="/api/post")
    app.register_blueprint(api_user, url_prefix="/api/user")
    app.register_blueprint(api_source, url_prefix="/api/source")
    app.register_blueprint(api_login, url_prefix="/api/login")