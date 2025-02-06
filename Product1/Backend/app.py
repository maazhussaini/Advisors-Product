from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
from routes.routes import register_routes
from database.dbconnection import db # Import from `database.py`

import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Flask configurations
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("SQLALCHEMY_DATABASE_URI")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
    app.config['UPLOAD_FOLDER'] = 'uploads/'  # Directory for uploaded files

    # Initialize extensions
    jwt = JWTManager(app)
    CORS(app)
    db.init_app(app)
    
    # with app.app_context():
    #     db.create_all()  # Create tables

    # Register routes
    register_routes(app)

    return app
