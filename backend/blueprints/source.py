from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt_identity
from werkzeug.exceptions import HTTPException
from backend.services.service_source import SourceService

api_source = Blueprint("api_source", __name__)

@api_source.route("/", methods=["GET"],  strict_slashes=False)
@cross_origin()
def get_sources():
    try:
        search_term = request.args.get('search')
        sort_by = request.args.get('sort')
        sources = SourceService.get_all_sources(
            current_user_id=get_jwt_identity(),
            search_term=search_term,
            sort_by=sort_by
        )
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


@api_source.route("/", methods=["POST"])
def create_post():
    data = request.get_json()
    try:
        result = SourceService.create_source(data, current_user_id=get_jwt_identity())
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
        return {
            "success": False,
            "message": "An unexpected error occurred."
        }, 500