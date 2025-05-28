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
        offset = request.args.get('offset')
        limit = request.args.get('limit')

        sources = SourceService.get_all_sources(
            current_user_id=get_jwt_identity(),
            search_term=search_term,
            sort_by=sort_by,
            offset=offset,
            limit=limit
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
def create_source():
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


@api_source.route("/<source_id>", methods=["GET"],  strict_slashes=False)
@cross_origin()
def get_source(source_id):
    try:
        source = SourceService.get_source_by_id(source_id, current_user_id=get_jwt_identity())
        return {
            "success": True,
            "data": source
        }, 200
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[get_source] Unexpected error: {e}")
        return {
            "success": False,
            "message": "An unexpected error occurred."
        }, 500


@api_source.route("/<source_id>", methods=["DELETE"])
def delete_source(source_id):
    try:
        source = SourceService.get_source_by_id(source_id, current_user_id=get_jwt_identity())
        if source['user']['id'] != int(get_jwt_identity()):  # And user not admin
            return {
                "success": False,
                "message": "You are not authorized to delete this source"
            }, 401

        deleted_source = SourceService.delete_source(source_id)
        if deleted_source:
            return {
                "success": True,
                "data": deleted_source
            }, 200
        else:
            return {
                "success": False,
                "message": f"Source with ID {source_id} not found or already deleted."
            }, 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[delete_source] Unexpected error: {e}")
        return {
            "success": False,
            "message": "An unexpected error occurred."
        }, 500


@api_source.route("/<source_id>", methods=["PATCH"])
def edit_source(source_id):
    try:
        source = SourceService.get_source_by_id(source_id, current_user_id=get_jwt_identity())
        if source['user']['id'] != int(get_jwt_identity()):  # And user not admin
            return {
                "success": False,
                "message": "You are not authorized to edit this source"
            }, 401

        data = request.get_json()
        edited_source = SourceService.edit_source(data, source_id)
        if edited_source:
            return {
                "success": True,
                "data": edited_source
            }, 200
        else:
            return {
                "success": False,
                "message": f"Source with ID {source_id} not found."
            }, 404
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"[edit_source] Unexpected error: {e}")
        return {
            "success": False,
            "message": "An unexpected error occurred."
        }, 500