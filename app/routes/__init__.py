from flask import send_from_directory, render_template as render, Flask
from .api import api


def init_routes(app: Flask):
    app.register_blueprint(api)

    @app.route("/")
    def base():
        return render("index.html")

    @app.route("/build/<path:path>")
    def build(path):
        return send_from_directory("client/build", path)
