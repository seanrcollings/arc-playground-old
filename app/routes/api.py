from flask import Blueprint, request, jsonify
from typing import TypedDict
import epicbox

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/arc/run", methods=["POST"])
def run():
    snippet = request.json["snippet"]

    epicbox.configure(profiles=[epicbox.Profile("python", "arc")])

    files = [{"name": "main.py", "content": snippet["code"].encode("utf-8")}]
    limits = {"cputime": 1, "memory": 64}
    result: dict = epicbox.run(
        "python", f"python3 main.py {snippet['command']}", files=files, limits=limits
    )
    exit_code = result.pop("exit_code")
    oom_killed = result.pop("oom_killed")
    return jsonify(
        result
        | {
            "stdout": result["stdout"].decode("utf-8"),
            "stderr": result["stderr"].decode("utf-8"),
            "exitCode": exit_code,
            "oomKilled": oom_killed,
        }
    )
