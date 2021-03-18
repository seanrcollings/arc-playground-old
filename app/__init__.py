import os
from flask import Flask
from .routes import init_routes

ENVIRONMENT = os.environ.get("FLASK_ENV", "development")


def create_app(config=None):
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_mapping(
        SECRET_KEY="dev",
    )

    init_routes(app)

    if ENVIRONMENT == "development":

        @app.after_request
        def disable_caching(res):
            """Disable Caching for development
            With Caching, Svelte doesn't update properly on save"""
            res.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            res.headers["Pragma"] = "no-cache"
            res.headers["Expires"] = "0"
            res.headers["Cache-Control"] = "public, max-age=0"
            return res

    return app
