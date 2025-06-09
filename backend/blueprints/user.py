from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt_identity, current_user
from werkzeug.exceptions import HTTPException

from backend.services.service_user import UserService

api_user = Blueprint("api_user", __name__)


@api_user.route("/", methods=["GET"], strict_slashes=False)
@cross_origin()
def get_users():
    try:
        search_term = request.args.get('search')
        sort_by = request.args.get('sort')
        offset = int(request.args.get('offset', 0))
        limit = int(request.args.get('limit', 10))

        users = UserService.get_all_users(
            search_term=search_term,
            sort_by=sort_by,
            offset=offset,
            limit=limit
        )
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
        print(f"[get_user] Unexpected error: {e}")
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
def update_user():
    data = request.get_json()
    try:
        current_user_id = get_jwt_identity()
        updated_user_id = data.get("user_id", current_user_id)

        if data.get('is_admin') or data.get('is_blocked'):
            if not current_user.is_admin:
                return jsonify({"success": False, "message": "You are not authorized to edit this field"}), 401

        updated_user = UserService.update_user(updated_user_id, data)
        if updated_user:
            return jsonify({
                "success": True,
                "data": updated_user
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": f"User with ID {updated_user_id} not found or not updated."
            }), 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[update_user] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@api_user.route("/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        if user_id != get_jwt_identity():
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


@api_user.route('/current', methods=['GET'])
def get_current_user():
    try:
        current_user = UserService.get_user_by_id(get_jwt_identity())
        return jsonify({
            "success": True,
            "user": current_user
        }), 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_current_user] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_user.route('/<user_id>/liked', methods=["GET"])
def get_liked_posts(user_id):
    try:
        offset = request.args.get('offset')
        limit = request.args.get('limit')

        liked_posts = UserService.get_liked_posts(
            user_id,
            current_user_id=get_jwt_identity(),
            offset=offset,
            limit=limit
        )

        return jsonify({
            "success": True,
            "data": liked_posts
        }), 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_liked_posts] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_user.route('/<user_id>/bookmarked/posts', methods=["GET"])
def get_bookmarked_posts(user_id):
    try:
        offset = request.args.get('offset')
        limit = request.args.get('limit')

        bookmarked_posts = UserService.get_bookmarked_posts(
            user_id,
            current_user_id=get_jwt_identity(),
            offset=offset,
            limit=limit
        )

        return jsonify({
            "success": True,
            "data": bookmarked_posts
        }), 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_bookmarked_posts] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_user.route('/<user_id>/bookmarked/sources', methods=["GET"])
def get_bookmarked_sources(user_id):
    try:
        offset = request.args.get('offset')
        limit = request.args.get('limit')

        bookmarked_sources = UserService.get_bookmarked_sources(
            user_id,
            current_user_id=get_jwt_identity(),
            offset=offset,
            limit=limit
        )

        return jsonify({
            "success": True,
            "data": bookmarked_sources
        }), 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_bookmarked_sources] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500
