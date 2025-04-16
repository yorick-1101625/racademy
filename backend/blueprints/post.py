from flask import Blueprint
from werkzeug.exceptions import HTTPException
from backend.services.service_post import *

api_post = Blueprint("api_post", __name__)

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