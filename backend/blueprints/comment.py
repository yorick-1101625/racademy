from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from werkzeug.exceptions import HTTPException

from backend.services.service_comment import CommentService

api_comment = Blueprint("api_comment", __name__)


@api_comment.route("/<post_id>", methods=["GET"], strict_slashes=False)
@cross_origin()
def get_comments(post_id):
    try:
        comments = CommentService.get_all_comments(post_id)
        return jsonify({
            "success": True,
            "data": comments
        }), 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_comments] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500

@api_comment.route("/", methods=["POST"])
def create_comment():
    data = request.get_json()
    try:
        result = CommentService.create_comment(data, current_user_id=get_jwt_identity())
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
        print(f"[create_post] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500

