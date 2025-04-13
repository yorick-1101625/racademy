from flask import Flask
from blueprints import register_blueprints

app = Flask(__name__)
register_blueprints(app)

@app.route('/')
def home():
    return "Hello, Flask is running in debug mode!"

if __name__ == '__main__':
    app.run(debug=True)
