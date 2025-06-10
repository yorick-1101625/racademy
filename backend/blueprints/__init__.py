from flask import request
from flask_jwt_extended import verify_jwt_in_request

from backend.blueprints.comment import api_comment
from backend.blueprints.post import api_post
from backend.blueprints.user import api_user
from backend.blueprints.source import api_source
from backend.blueprints.auth import api_auth

PUBLIC_ENDPOINTS = [
    'api_auth.login',
    'api_user.register_user',
    'static'
]

REFRESH_ENDPOINTS = [
    'api_auth.refresh'
]


def register_blueprints(app):
    @app.before_request
    def require_jwt():
        if request.endpoint in PUBLIC_ENDPOINTS or request.endpoint is None:
            return

        if request.endpoint in REFRESH_ENDPOINTS:
            verify_jwt_in_request(refresh=True)
        else:
            verify_jwt_in_request()

    app.register_blueprint(api_post, url_prefix="/api/post")
    app.register_blueprint(api_user, url_prefix="/api/user")
    app.register_blueprint(api_source, url_prefix="/api/source")
    app.register_blueprint(api_auth, url_prefix="/api/auth")
    app.register_blueprint(api_comment, url_prefix="/api/comment")
