import logging
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from flask import request, jsonify
from sqlalchemy.exc import SQLAlchemyError
from database.dbconnection import db, Session
from resources.crypto_utils import encrypt
from datetime import timedelta  # Import timedelta
from models.models import UserInformation

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class UserLoginResource(Resource):
    def post(self):
        try:
            # Parse and validate input data
            
            if request.form:
                data = request.form.to_dict()
            # Handle JSON data
            elif request.is_json:
                data = request.get_json()
            
            if not data or 'user_email' not in data or 'user_password' not in data:
                logger.warning("Missing username or password in request data")
                return {"data": {'status': 400, 'message': 'Username and password are required'}}, 400

            user_email = data.get('user_email').lower().strip()
            user_password = data.get('user_password').strip()

            # Encrypt credentials
            try:
                encrypted_username = user_email
                encrypted_password = encrypt(user_password)
            except Exception as e:
                logger.error(f"Encryption error: {e}")
                return {"data": {'status': 500, 'message': 'Encryption error'}}, 500

            # Query the database using a session
            session = Session()
            try:
                user = session.query(UserInformation).filter_by(
                    user_email=encrypted_username,
                    user_password=encrypted_password
                ).first()
            except SQLAlchemyError as e:
                logger.error(f"Database query error: {e}")
                session.rollback()
                return {"data": {'status': 500, 'message': 'Database error'}}, 500
            finally:
                session.close()

            # Validate user
            if not user:
                logger.warning("Invalid credentials provided")
                return {"data": {'status': 401, 'message': 'Invalid credentials'}}, 401

            if not user.is_active:
                logger.warning("Attempt to access inactive account")
                return {"data": {'status': 403, 'message': 'Account is inactive'}}, 403

            # Generate access token
            try:
                access_token = create_access_token(identity=encrypted_username, expires_delta=timedelta(hours=2))
            except Exception as e:
                logger.error(f"Token creation error: {e}")
                return {"data": {'status': 500, 'message': 'Token creation error'}}, 500

            # Construct response
            user_details = {
                'accessToken': access_token,
                'user': {
                    'id': user.user_id,
                    'displayName': user.user_first_name,
                    'email': user.user_email,
                }
            }

            logger.info(f"User {user_email} successfully logged in")
            return {"data": user_details, "status": 200}, 200

        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return {"data": {'status': 500, 'message': f'Internal server error'}}, 500
