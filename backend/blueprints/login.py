from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token
from werkzeug.exceptions import HTTPException
from backend.services.service_user import UserService

api_login = Blueprint('api_login', __name__)

@api_login.route('/', methods=['POST'])
@cross_origin()
def login():
    try:
        data = request.get_json()

        user = UserService.login_user(
            data.get("email"),
            data.get("password")
        )

        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify({
                "success": True,
                "message": "Login succeeded.",
                "access_token": access_token
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Login failed."
            }), 401

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[login] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500

# TODO: Find better implementation for cors?
# if request.method == 'OPTIONS':
#     response = jsonify({'status': 'success'})
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#     response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
#     return response, 200