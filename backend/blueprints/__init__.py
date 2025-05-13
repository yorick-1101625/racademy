from flask import request
from flask_cors import cross_origin
from flask_jwt_extended import verify_jwt_in_request

from backend.blueprints.post import api_post
from backend.blueprints.user import api_user
from backend.blueprints.source import api_source
from backend.blueprints.login import api_login

PUBLIC_ENDPOINTS = [
    'api_login.login',
    'api_user.register_user',
    'static'
]



def register_blueprints(app):

    @app.before_request
    def require_jwt():
        if request.endpoint in PUBLIC_ENDPOINTS or request.endpoint is None:
            return
        verify_jwt_in_request()

    # @app.before_request
    # def log_request_info():
    #     print(f"Incoming {request.method} request to {request.path}, {request.endpoint}")

    app.register_blueprint(api_post, url_prefix="/api/post")
    app.register_blueprint(api_user, url_prefix="/api/user")
    app.register_blueprint(api_source, url_prefix="/api/source")
    app.register_blueprint(api_login, url_prefix="/api/login")
