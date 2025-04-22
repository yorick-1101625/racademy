from flask import Blueprint, request, jsonify
from werkzeug.exceptions import HTTPException
from backend.services.service_post import PostService
from backend.models.models import *

api_login = Blueprint('api_login', __name__)

@api_login.route('/', methods=['GET', 'POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success',})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        return response, 200

    data = request.get_json(force=True)
    print(data)
    result = check_login(data)
    print(result)
    return jsonify({'status': 'success'}), 200


def check_login(data):
    user = User.query.filter_by(email=data['email']).first()
    if user is None:
        return False
    else:
        if user.password == data['password']:
            return True
        else:
            return False