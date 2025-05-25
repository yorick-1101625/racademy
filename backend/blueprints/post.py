from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from flask_cors import cross_origin
from werkzeug.exceptions import HTTPException
from backend.services.service_post import PostService

api_post = Blueprint("api_post", __name__)

# TODO: More Error handling https://medium.com/@dmostoller/mastering-error-handling-in-flask-with-werkzeug-exceptions-ensuring-robust-server-side-validations-a00a9862566a
@api_post.route("/", methods=["GET"], strict_slashes=False)
@cross_origin()
def get_posts():
    try:
        search_term = request.args.get('search')
        sort_by = request.args.get('sort')
        posts = PostService.get_all_posts(
            current_user_id=get_jwt_identity(),
            search_term=search_term,
            sort_by=sort_by
        )
        return jsonify({
            "success": True,
            "data": posts
        }), 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_posts] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_post.route("/<post_id>", methods=["GET"])
def get_post(post_id):
    try:
        post = PostService.get_post_by_id(post_id)
        if post:
            return jsonify({
                "success": True,
                "data": post
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": f"Post with ID {post_id} not found."
            }), 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_post] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_post.route("/", methods=["POST"])
def create_post():
    data = request.get_json()
    try:
        post = PostService.create_post(data)
        return jsonify({
            "success": True,
            "data": post
        }), 201
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[create_post] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_post.route("/<post_id>", methods=["PATCH"])
def update_post(post_id):
    data = request.get_json()
    try:
        post = PostService.get_post_by_id(post_id)
        if post.user.id != get_jwt_identity():
            return {
                "success": False,
                "message": "You are not authorized to edit this post"
            }, 401

        updated_post = PostService.update_post(post_id, data)
        if updated_post:
            return jsonify({
                "success": True,
                "data": updated_post
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": f"Post with ID {post_id} not found or not updated."
            }), 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[update_post] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500


@api_post.route("/<post_id>", methods=["DELETE"])
def delete_post(post_id):
    try:
        post = PostService.get_post_by_id(post_id)
        if post.user.id != int(get_jwt_identity()):  # And user not admin
            return {
                "success": False,
                "message": "You are not authorized to delete this post"
            }, 401

        deleted_post = PostService.delete_post(post_id)
        if deleted_post:
            return jsonify({
                "success": True,
                "data": deleted_post
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": f"Post with ID {post_id} not found or already deleted."
            }), 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[delete_post] Unexpected error: {e}")
        return jsonify({
            "success": False,
            "message": "An unexpected error occurred."
        }), 500
