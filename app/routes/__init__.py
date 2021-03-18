from flask import send_from_directory, render_template as render
from .api import api


def init_routes(app):
    api.init_app(app)

    @app.route("/")
    def base():
        return render("index.html")

    @app.route("/build/<path:path>")
    def build(path):
        return send_from_directory("client/build", path)
