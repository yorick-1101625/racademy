from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from werkzeug.exceptions import HTTPException
from backend.services.service_user import UserService
from datetime import timedelta

api_auth = Blueprint('api_auth', __name__)

@api_auth.route('/login', methods=['POST'])
@cross_origin()
def login():
    try:
        data = request.get_json()

        result = UserService.login_user(
            data.get("email"),
            data.get("password")
        )

        if type(result) == Exception:
            return jsonify({
                "success": False,
                "message": str(result)
            }), 401
        else:
            access_token = create_access_token(
                identity=str(result['id']),
                expires_delta=timedelta(hours=1)
            )
            refresh_token = create_refresh_token(
                identity=str(result['id']),
                expires_delta=timedelta(days=7)
            )
            return jsonify({
                "success": True,
                "message": "Login succeeded.",
                "access_token": access_token,
                "refresh_token": refresh_token
            }), 200

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

@api_auth.route('/refresh', methods=['POST'])
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(
        identity=current_user,
        expires_delta=timedelta(hours=1)
    )

    return {
        "success": True,
        "access_token": new_access_token
    }, 200