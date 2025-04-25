from flask import Blueprint, request
from werkzeug.exceptions import HTTPException
from backend.services.service_source import SourceService

api_source = Blueprint("api_source", __name__)

@api_source.route("/", methods=["GET"])
def get_sources():
    try:
        current_user_id = 1 # TODO: get from session
        sources = SourceService.get_all_sources(current_user_id)
        return {
            "success": True,
            "data": sources
        }, 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_sources] Unexpected error: {e}")
        return {
            "success": False,
            "message": "An unexpected error occurred."
        }, 500
