from flask_restful import Api, Resource  # type: ignore

api = Api(prefix="/api")


class HelloWorld(Resource):
    def get(self):
        return {"name": "Sean"}


api.add_resource(HelloWorld, "/")