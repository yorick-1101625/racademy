from flask import Blueprint, request
from werkzeug.exceptions import HTTPException
from backend.services.service_post import *

api_post = Blueprint("api_post", __name__)
# TODO Rework error handling
@api_post.route("/", methods=["GET"])
def get_posts():
    try:
        result = PostService.get_all_posts()
        if result:
            return {
                "success": True,
                "data": result,
            }, 200
        else:
            return {
                "success": False,
                "data": result,
            }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)


@api_post.route("/<post_id>", methods=["GET"])
def get_post(post_id):
    try:
        result = PostService.get_post_by_id(post_id)
        if result:
            return {
                "success": True,
                "data": result,
            }, 200
        else:
            return {
                "success": False,
                "data": result,
            }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)


@api_post.route("/", methods=["POST"])
def create_post():
    data = request.get_json()
    try:
        result = PostService.create_post(data)
        if result:
            return {
                "success": True,
                "data": result,
            }, 200
        else:
            return {
                "success": False,
                "data": result,
            }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)


@api_post.route("/<post_id>", methods=["PATCH"])
def update_post(post_id):
    data = request.get_json()
    try:
        result = PostService.update_post(post_id, data)
        if result:
            return {
                "success": True,
                "data": result,
            }, 200
        else:
            return {
                "success": False,
                "data": result,
            }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)


@api_post.route("/<post_id>", methods=["DELETE"])
def update_post(post_id):
    try:
        result = PostService.delete_post(post_id)
        if result:
            return {
                "success": True,
                "data": result,
            }, 200
        else:
            return {
                "success": False,
                "data": result,
            }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)