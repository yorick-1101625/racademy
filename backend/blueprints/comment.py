from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, current_user
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
        if current_user.is_blocked:
            return {
                "success": False,
                "message": "This account is blocked."
            }, 400

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


@api_comment.route("/<comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    try:
        current_user_id = int(get_jwt_identity())
        comment = CommentService.get_comment_by_id(comment_id)
        if comment["user"]["id"] != current_user_id and not current_user.is_admin:  # And user not admin
            return {
                "success": False,
                "message": "You are not authorized to delete this comment"
            }, 401

        deleted_comment = CommentService.delete_comment(comment_id)
        if deleted_comment:
            return jsonify({
                "success": True,
                "data": deleted_comment
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": f"Comment with ID {comment_id} not found or already deleted."
            }), 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[delete_comment] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500
