from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from werkzeug.exceptions import HTTPException
from backend.services.service_user import UserService

api_user = Blueprint("api_user", __name__)

@api_user.route("/", methods=["GET"])
def get_users():
    try:
        users = UserService.get_all_users()
        return jsonify({
            "success": True,
            "data": users
        }), 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_users] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_user.route("/<user_id>", methods=["GET"])
def get_user(user_id):
    try:
        user = UserService.get_user_by_id(user_id)
        if user:
            return jsonify({
                "success": True,
                "data": user
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": f"User with ID {user_id} not found."
            }), 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_post] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_user.route("/", methods=["POST"])
def register_user():
    data = request.get_json()
    try:
        result = UserService.create_user(data)
        if type(result) == Exception:
            error = str(result)
            return {
                "success": False,
                "message": error
            }, 400
        else:
            return {
                "success": True,
                "data": result
            }, 201
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[register_user] Unexpected error: {e}")
        return {
            "success": False,
            "message": "An unexpected error occurred."
        }, 500


@api_user.route("/", methods=["PATCH"])
def update_post():
    data = request.get_json()
    try:
        user_id = get_jwt_identity()
        updated_user = UserService.update_user(user_id, data)
        if updated_user:
            return jsonify({
                "success": True,
                "data": updated_user
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": f"User with ID {user_id} not found or not updated."
            }), 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[update_user] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_user.route("/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        if user_id != get_jwt_identity(): # And not admin
            return {
                "success": False,
                "message": "You are not authorized to delete this user"
            }, 401

        deleted_user = UserService.delete_user(user_id)
        if deleted_user:
            return jsonify({
                "success": True,
                "data": deleted_user
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": f"User with ID {user_id} not found or already deleted."
            }), 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[delete_user] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500
