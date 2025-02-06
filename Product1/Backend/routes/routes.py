from flask_restful import Api
from flask import Blueprint
from flask_cors import CORS, cross_origin
from resources.resources import UserSignupResource, CompanySizeResource, CreateCompanyResource, TestingAPIS
from resources.customApi import FileUploadResource
from resources.auth import UserLoginResource

def register_routes(app):
    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)
    app.register_blueprint(api_bp, url_prefix='/api')
    
    CORS(app, resources={
        r"/api/*": {"origins": ["http://localhost:3000/", "*"]}
    })
    
    
    ## Dynamic APIs
    api.add_resource(FileUploadResource, '/fileUpload', '')
    api.add_resource(TestingAPIS, '/testing', '')
    
    # Define Routes
    api.add_resource(UserSignupResource, "/users", "/users/<int:user_id>")
    api.add_resource(UserLoginResource, "/login")
    api.add_resource(CompanySizeResource, "/company-sizes", "/company-sizes/<int:size_id>")
    api.add_resource(CreateCompanyResource, "/companies", "/companies/<int:company_id>")