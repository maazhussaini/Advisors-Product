from flask_restful import Api
from flask import Blueprint
from flask_cors import CORS, cross_origin
from resources.resources import *
from resources.customApi import *

def register_routes(app):
    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)
    app.register_blueprint(api_bp, url_prefix='/api')
    
    CORS(app, resources={
        r"/api/*": {"origins": ["http://localhost:3000/", "*"]}
    })
    
    
    ## Dynamic APIs
    api.add_resource(FileUploadResource, '/fileUpload', '')