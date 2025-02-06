from flask_restful import Resource, reqparse, abort
from models.models import *
from datetime import datetime, date, timedelta
from flask import jsonify, request
from werkzeug.exceptions import BadRequest, NotFound, InternalServerError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import and_
from sqlalchemy import extract
import json
from sqlalchemy.exc import SQLAlchemyError
from flask_mail import Message
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from dotenv import load_dotenv
import logging
from exceptions import *
from sqlalchemy import text
from datetime import datetime, timedelta
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text
from resources.crypto_utils import encrypt
import traceback
from sqlalchemy import exc
from database.dbconnection import db, Session

load_dotenv()

ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx']
UPLOAD_FOLDER = 'uploads/'

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# from flask import Flask, jsonify, request
# from flask_restful import Api, Resource
# from sqlalchemy import create_engine, exc
# from sqlalchemy.orm import sessionmaker, scoped_session

# SQLAlchemy Database Configuration
# DATABASE_URL = "postgresql://username:password@localhost:5432/your_database"
# engine = create_engine(DATABASE_URL)
# Base.metadata.bind = engine
# Session = scoped_session(sessionmaker(bind=engine))

# Custom Exception Handling
# class APIError(Exception):
#     def __init__(self, message, status_code=400):
#         super().__init__(message)
#         self.message = message
#         self.status_code = status_code

# @app.errorhandler(APIError)
# def handle_api_error(error):
#     return jsonify({"error": error.message}), error.status_code

# @app.errorhandler(Exception)
# def handle_general_error(error):
#     traceback.print_exc()
#     return jsonify({"error": "Internal Server Error"}), 500

# User API
# from flask_restful import Resource
# from flask import request
# from sqlalchemy.exc import SQLAlchemyError
# from werkzeug.security import generate_password_hash
# from models import UserInformation
# import logging


class UserSignupResource(Resource):
    def post(self):
        try:
            session = Session()
            # Parse request data
            data = request.form.to_dict()
            if not data or 'user_first_name' not in data or 'user_last_name' not in data or 'user_email' not in data or 'user_password' not in data or 'user_phone' not in data:
                logger.warning(f"Missing required fields in request data | {data}")
                return {"data": {'status': 400, 'message': 'All fields are required'}}, 400

            user_first_name = data.get('user_first_name').strip()
            user_last_name = data.get('user_last_name').strip()
            user_email = data.get('user_email').strip().lower()
            user_password = data.get('user_password').strip()
            user_phone = data.get('user_phone')

            user_name = f"{user_first_name} {user_last_name}"
            
            logging.info(f"User name: {user_name}, Email: {user_email}, Phone: {user_phone}")
            
            # Check if user already exists
            try:
                existing_user = session.query(UserInformation).filter_by(user_email=user_email).first()
            except SQLAlchemyError as e:
                logger.error(f"Database query error: {e}")
                return {"data": {'status': 500, 'message': 'Database error'}}, 500

            if existing_user:
                logger.warning("User already exists with the provided email")
                return {"data": {'status': 400, 'message': 'User already exists with this email'}}, 400

            # Hash the password
            try:
                hashed_password = encrypt(user_password)
            except Exception as e:
                logger.error(f"Error hashing password: {e}")
                return {"data": {'status': 500, 'message': 'Password hashing error'}}, 500

            # Create a new user record
            new_user = UserInformation(
                user_first_name=user_first_name,
                user_last_name=user_last_name,
                user_email=user_email,
                user_password=hashed_password,
                user_phone=user_phone,
                is_active=True  # Default value
            )

            # Add user to the database
            try:
                session.add(new_user)
                session.commit()
            except SQLAlchemyError as e:
                session.rollback()
                logger.error(f"Database commit error: {e}")
                return {"data": {'status': 500, 'message': 'Database commit error'}}, 500

            logger.info(f"User {user_name} created successfully")
            return {"data": {'status': 201, 'message': 'User created successfully'}, "user_id": new_user.user_id}, 201

        except SQLAlchemyError as e:
            return {"data": {'status': 500, 'message': f"Database error occurred: {str(e)}"}}, 500
        except Exception as e:
            logger.error(f"An unexpected error occurred: {e}")
            return {"data": {'status': 500, 'message': f'Internal server error: {e}'}}, 500

# Company Size API
class CompanySizeResource(Resource):
    def get(self, size_id=None):
        session = Session()
        try:
            if size_id:
                size = session.query(CompanySize).filter_by(size_id=size_id).first()
                # if not size:
                #     raise APIError("Company size not found", 404)
                return jsonify({"company_size": {
                    "size_id": size.size_id,
                    "size_description": size.size_description
                }})
            else:
                sizes = session.query(CompanySize).all()
                return jsonify({"company_sizes": [
                    {
                        "size_id": size.size_id,
                        "size_description": size.size_description
                    } for size in sizes
                ]})
        except exc.SQLAlchemyError as e:
            session.rollback()
            # raise APIError(f"Database error: {str(e)}")
        finally:
            session.close()

    def post(self):
        session = Session()
        try:
            data = request.json
            logging.info(f"Data: {data}")
            
            new_size = CompanySize(
                size_description=data["size_description"]
            )
            session.add(new_size)
            session.commit()
            return jsonify({"message": "Company size created successfully", "size_id": new_size.size_id}), 201
        except KeyError as e:
            raise f"Missing required field: {str(e)}"
        except exc.SQLAlchemyError as e:
            session.rollback()
            raise f"Database error: {str(e)}"
        finally:
            session.close()

    def delete(self, size_id):
        session = Session()
        try:
            size = session.query(CompanySize).filter_by(size_id=size_id).first()
            # if not size:
            #     raise APIError("Company size not found", 404)

            session.delete(size)
            session.commit()

            return jsonify({"message": "Company size deleted successfully"})
        except exc.SQLAlchemyError as e:
            session.rollback()
            # raise APIError(f"Database error: {str(e)}")
        finally:
            session.close()

# Company Information API
class CreateCompanyResource(Resource):
    def get(self, company_id=None):
        session = Session()
        try:
            if company_id:
                company = session.query(CompanyInformation).filter_by(company_id=company_id).first()
                if not company:
                    raise APIError("Company not found", 404)
                return jsonify({"company": {
                    "company_id": company.company_id,
                    "company_name": company.company_name,
                    "company_email": company.company_email,
                    "company_country": company.company_country,
                    "company_city": company.company_city,
                    "company_phone": company.company_phone,
                    "user_id": company.user_id,
                    "company_size_id": company.company_size_id,
                    "created_at": company.created_at
                }})
            else:
                companies = session.query(CompanyInformation).all()
                return jsonify({"companies": [
                    {
                        "company_id": company.company_id,
                        "company_name": company.company_name,
                        "company_email": company.company_email,
                        "company_country": company.company_country,
                        "company_city": company.company_city,
                        "company_phone": company.company_phone,
                        "user_id": company.user_id,
                        "company_size_id": company.company_size_id,
                        "created_at": company.created_at
                    } for company in companies
                ]})
        except exc.SQLAlchemyError as e:
            session.rollback()
            raise APIError(f"Database error: {str(e)}")
        finally:
            session.close()

    def post(self):
        session = Session()
        try:
            data = request.json
            new_company = CompanyInformation(
                company_name=data["company_name"],
                company_email=data["company_email"],
                company_country=data["company_country"],
                company_city=data["company_city"],
                company_phone=data["company_phone"],
                user_id=data["user_id"],
                company_size_id=data["company_size_id"]
            )
            session.add(new_company)
            session.commit()
            return jsonify({"message": "Company created successfully", "company_id": new_company.company_id}), 201
        except KeyError as e:
            raise APIError(f"Missing required field: {str(e)}")
        except exc.SQLAlchemyError as e:
            session.rollback()
            raise APIError(f"Database error: {str(e)}")
        finally:
            session.close()

    def delete(self, company_id):
        session = Session()
        try:
            company = session.query(CompanyInformation).filter_by(company_id=company_id).first()
            if not company:
                logging.error("Company not found")
                return jsonify({"status":"error", "message": "Company not found"})

            session.delete(company)
            session.commit()

            return jsonify({"message": "Company deleted successfully"})
        except exc.SQLAlchemyError as e:
            session.rollback()
            logging.error(f"Database error: {str(e)}")
            return jsonify({"status":"error", "message": f"{str(e)}"})
            # raise APIError(f"Database error: {str(e)}")
        finally:
            session.close()

#Testing API
class TestingAPIS(Resource):
    
    def get(self):
        return {"message": "Changes Successfully Completed"}
    
    def post(self):
        if not request.form:
                logging.warning("No file or form data found in the request.")
                return {'message': 'No file or form data in the request'}, 400

        # Process form data
        form_data = request.form.to_dict(flat=False)  # Use flat=False for multi-valued keys
        
        return form_data