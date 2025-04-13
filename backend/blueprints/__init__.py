def register_blueprints(app):
    app.register_blueprint(api_test, url_prefix="/api/test")