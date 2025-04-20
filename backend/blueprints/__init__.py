from backend.blueprints.post import api_post

def register_blueprints(app):
    app.register_blueprint(api_post, url_prefix="/api/post")
    app.register_blueprint(api_post, url_prefix="/api/user")