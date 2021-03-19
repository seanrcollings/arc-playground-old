from flask import Blueprint, request

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/arc", methods=["GET", "POST"])
def run_cli():
    return {"test": "data"}
