from flask_restful import Resource, reqparse, abort
from database.dbconnection import db, Session
from flask import jsonify, request
from werkzeug.exceptions import BadRequest, NotFound, InternalServerError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import and_
# from models.models import *
import pyodbc
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.utils import secure_filename
import os
from decimal import Decimal
import pandas as pd
from datetime import datetime
from utils.consolidation import  ProcessExcelFiles, DynamicDataMapper
import gridfs
# from Backend.database.dbconnection import MongoDBConnection
from database.dbconnection import MongoDBConnection
import logging

# Custom function to handle both Decimal and Timestamp objects
def custom_serializer(obj):
    if isinstance(obj, Decimal):
        return float(obj)  # Convert Decimal to float
    elif isinstance(obj, (pd.Timestamp, datetime)):  # Use the correct datetime
        return obj.isoformat()  # Convert Timestamp/datetime to ISO 8601 string format
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

def get_model_by_tablename(table_name):
    return globals().get(table_name)

"""
class FileUploadResource(Resource):
    
    def generate_mapping_config(self, mapping_df):
        levels = [col for col in mapping_df.columns if "level" in col.lower()]
        account_column = None
        for col in mapping_df.columns:
            if "account" in col.lower():
                account_column = col
                break
        if not account_column and levels:
            account_column = levels[-1]

        financial_columns = [col for col in mapping_df.columns if any(term in col.lower() for term in ["debit", "credit", "balance"])]

        return {
            "consolidated_account_column": account_column,
            "mapping_account_column": account_column,
            "levels": levels,
            "financial_columns": financial_columns
        }
    
    def post(self):
        
        # Endpoint to upload multiple Excel/CSV files, process, and consolidate them.
        
        try:
            
            data = request.form.to_dict()  # Extract all form data as a dictionary

            # Retrieve uploaded files and mapping file
            uploaded_files = request.files.getlist('files')  # List of uploaded files
            mapping_file = request.files.get('mapping_file')  # Single mapping file
            
            if not uploaded_files:
                return {"status": "error", "message": "No files uploaded"}, 400
            if not mapping_file:
                return {"status": "error", "message": "Mapping file is required"}, 400
            
            # Validate additional form data if required fields are expected
            required_form_fields = ["user_id", "company_id"] # Required form fields
            missing_fields = [field for field in required_form_fields if field not in data]
            if missing_fields:
                return {
                    "status": "error",
                    "message": f"Missing required form fields: {', '.join(missing_fields)}"
                }, 400
            
            # Initialize processing objects
            process_excel_files = ProcessExcelFiles()
            
            # Process each file
            raw_data_list = []
            failed_files = []  # Track failed files
            
            for uploaded_file in uploaded_files:
                try:
                    # Process the file
                    processed_data = process_excel_files.process_file(uploaded_file)
                    if isinstance(processed_data, list):
                        raw_data_list.append(pd.DataFrame(processed_data))
                    else:
                        # Log error and continue
                        failed_files.append({
                            "filename": uploaded_file.filename,
                            "error": processed_data.get('message', 'Unknown error')
                        })
                except Exception as e:
                    # Catch any other processing exceptions
                    failed_files.append({"filename": uploaded_file.filename, "error": str(e)})
            
            # Consolidate data from successful files
            if raw_data_list:
                consolidated_data = pd.concat(raw_data_list, ignore_index=True)
                print("Successfully Consolidated")
            else:
                return {"status": "error", "message": "All files failed to process"}, 400
            
            # Process mapping file
            mapping_data = pd.read_excel(mapping_file)
            mapping_config = self.generate_mapping_config(mapping_data)
            dynamic_mapper = DynamicDataMapper(mapping_config=mapping_config)
            print("Read Mapping File.")
            
            # Map consolidated data
            mapped_data = dynamic_mapper.map_data(consolidated_data, mapping_data)
            
            # Generate pivot table (optional)
            pivot_table = dynamic_mapper.generate_pivot_table(mapped_data)
            
            # Convert results to JSON
            consolidated_data_json = consolidated_data.to_dict(orient='records')
            mapped_data_json = mapped_data.to_dict(orient='list')
            pivot_table_json = pivot_table.to_dict(orient='records') if pivot_table is not None else None
            
            mapped_data.to_csv("Platraw_MappedData.csv", index=False)
            
            if not failed_files:
                return {
                    "status": "success",
                    "mapped_data": mapped_data_json
                }, 200
            else:
                return {
                    "status": "error",
                    "failed_files": failed_files
                }, 200
        
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

"""

# import os
# import pandas as pd
# from flask import request
# from flask_restful import Resource
# import gridfs
# from werkzeug.utils import secure_filename
# from Backend.database.dbconnection import MongoDBConnection
# import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the uploads folder exists



class FileUploadResource(Resource):
    def __init__(self):
        # Initialize database and GridFS
        db_connection = MongoDBConnection()
        self.db = db_connection.get_database()
        self.collection = self.db["users"]
        self.gridfs = gridfs.GridFS(self.db)

    def store_file_locally(self, file, folder=UPLOAD_FOLDER):
        
        # Save the file to the local 'uploads' folder.
        
        try:
            filename = secure_filename(file.filename)
            local_path = os.path.join(folder, filename)
            file.save(local_path)
            logging.info(f"File saved locally at: {local_path}")
            return local_path
        except Exception as e:
            logging.error(f"Failed to save file locally: {e}")
            raise

    def store_file_in_gridfs(self, file):
        
        # Store a file in MongoDB GridFS and return its ObjectId.
        
        try:
            pass
            logging.info(f"Storing file '{file.filename}' in GridFS...")
            # file_id = self.gridfs.put(file, filename=file.filename)
            # logging.info(f"File stored in GridFS with ID: {file_id}")
            # return file_id
        except Exception as e:
            logging.error(f"Failed to store file in GridFS: {e}")
            raise

    def generate_mapping_config(self, mapping_df):
        
        # Generate mapping configuration from the mapping file.
        
        levels = [col for col in mapping_df.columns if "level" in col.lower()]
        account_column = None
        for col in mapping_df.columns:
            if "account" in col.lower():
                account_column = col
                break
        if not account_column and levels:
            account_column = levels[-1]

        financial_columns = [col for col in mapping_df.columns if any(term in col.lower() for term in ["debit", "credit", "balance"])]
        
        return {
            "consolidated_account_column": account_column,
            "mapping_account_column": account_column,
            "levels": levels,
            "financial_columns": financial_columns,
        }

    def post(self):
        
        # Endpoint to upload multiple Excel/CSV files, process, and consolidate them.
        
        try:
            # Extract form data
            data = request.form.to_dict()
            user_id = data.get("user_id")
            company_id = data.get("company_id")

            # Validate form fields
            if not user_id or not company_id:
                return {"status": "error", "message": "user_id and company_id are required"}, 400

            # Retrieve uploaded files and mapping file
            uploaded_files = request.files.getlist("files")
            mapping_file = request.files.get("mapping_file")

            if not uploaded_files:
                return {"status": "error", "message": "No files uploaded"}, 400
            if not mapping_file:
                return {"status": "error", "message": "Mapping file is required"}, 400

            # Prepare file metadata array
            files_metadata = []
            raw_data_list = []
            failed_files = []

            # Process each uploaded file
            for uploaded_file in uploaded_files:
                try:
                    # Save file locally
                    local_path = self.store_file_locally(uploaded_file)

                    # Save file in GridFS
                    # file_id = self.store_file_in_gridfs(uploaded_file)

                    # Process the file and collect raw data
                    process_excel_files = ProcessExcelFiles()
                    processed_data = process_excel_files.process_file(uploaded_file)

                    if isinstance(processed_data, list):
                        raw_data_list.append(pd.DataFrame(processed_data))
                        files_metadata.append({
                            "filename": uploaded_file.filename,
                            "local_path": local_path,
                            # "file_id": str(file_id),
                            "status": "processed",
                        })
                    else:
                        failed_files.append({
                            "filename": uploaded_file.filename,
                            "error": processed_data.get("message", "Unknown error"),
                        })

                except Exception as e:
                    logging.error(f"Failed to process file '{uploaded_file.filename}': {e}")
                    failed_files.append({
                        "filename": uploaded_file.filename,
                        "error": str(e),
                    })

            # Consolidate data from successful files
            if raw_data_list:
                consolidated_data = pd.concat(raw_data_list, ignore_index=True)
                logging.info("Successfully consolidated data.")
            else:
                return {"status": "error", "message": "All files failed to process"}, 400

            # Process mapping file
            mapping_data = pd.read_excel(mapping_file)
            print("mapping 1:")
            mapping_config = self.generate_mapping_config(mapping_data)
            print("mapping 2:")
            dynamic_mapper = DynamicDataMapper(mapping_config=mapping_config)
            logging.info("Read mapping file.")

            # Map consolidated data
            mapped_data = dynamic_mapper.map_data(consolidated_data, mapping_data)
            logging.info("Mapping Data.")

            # Generate pivot table (optional)
            # pivot_table = dynamic_mapper.generate_pivot_table(mapped_data)

            # Convert results to JSON
            consolidated_data_json = consolidated_data.to_dict(orient="records")
            mapped_data_json = mapped_data.to_dict(orient="list")
            # pivot_table_json = pivot_table.to_dict(orient="records") if pivot_table is not None else None

            # Save results to MongoDB
            """
            self.collection.update_one(
                {"user_id": user_id, "company_id": company_id},
                {
                    "$set": {
                        "files": files_metadata,
                        "consolidated_data": consolidated_data_json,
                        "mapped_data": mapped_data_json,
                        "pivot_table": pivot_table_json,
                    }
                },
                upsert=True,  # Insert if the document doesn't exist
            )
            """
            # Return response
            if not failed_files:
                return {
                    "status": "success",
                    "mapped_data": mapped_data_json,
                    # "pivot_table": pivot_table_json,
                }, 200
            else:
                return {
                    "status": "partial_success",
                    "failed_files": failed_files,
                }, 200

        except Exception as e:
            logging.error(f"Unexpected error: {e}")
            return {"status": "error", "message": str(e)}, 500

"""

import os
import pandas as pd
from flask import request
from flask_restful import Resource
from werkzeug.utils import secure_filename
from sqlalchemy import MetaData, Table
import logging
from datetime import datetime
from Backend.database.dbconnection import session, engine  # Import the existing session and engine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the uploads folder exists

# Reflect the database tables using SQLAlchemy
metadata = MetaData(bind=engine)
metadata.reflect()

# Access the relevant tables
file_metadata_table = Table("file_metadata", metadata, autoload_with=engine)
consolidated_data_table = Table("consolidated_data", metadata, autoload_with=engine)
mapped_data_table = Table("mapped_data", metadata, autoload_with=engine)
pivot_table_table = Table("pivot_table", metadata, autoload_with=engine)

class FileUploadResource(Resource):
    def __init__(self):
        # Use the existing database connection from dbConnection.py
        self.db_session = session
        self.engine = engine

    def store_file_locally(self, file, folder=UPLOAD_FOLDER):
        
        # Save the file to the local 'uploads' folder.
        
        try:
            filename = secure_filename(file.filename)
            local_path = os.path.join(folder, filename)
            file.save(local_path)
            logging.info(f"File saved locally at: {local_path}")
            return local_path
        except Exception as e:
            logging.error(f"Failed to save file locally: {e}")
            raise

    def generate_mapping_config(self, mapping_df):
        
        # Generate mapping configuration from the mapping file.
        
        levels = [col for col in mapping_df.columns if "level" in col.lower()]
        account_column = None
        for col in mapping_df.columns:
            if "account" in col.lower():
                account_column = col
                break
        if not account_column and levels:
            account_column = levels[-1]

        financial_columns = [col for col in mapping_df.columns if any(term in col.lower() for term in ["debit", "credit", "balance"])]

        return {
            "consolidated_account_column": account_column,
            "mapping_account_column": account_column,
            "levels": levels,
            "financial_columns": financial_columns,
        }

    def post(self):
        
        # Endpoint to upload multiple Excel/CSV files, process, and consolidate them.

        try:
            # Extract form data
            data = request.form.to_dict()
            user_id = data.get("user_id")
            company_id = data.get("company_id")

            # Validate form fields
            if not user_id or not company_id:
                return {"status": "error", "message": "user_id and company_id are required"}, 400

            # Retrieve uploaded files and mapping file
            uploaded_files = request.files.getlist("files")
            mapping_file = request.files.get("mapping_file")

            if not uploaded_files:
                return {"status": "error", "message": "No files uploaded"}, 400
            if not mapping_file:
                return {"status": "error", "message": "Mapping file is required"}, 400

            # Prepare file metadata array
            files_metadata = []
            raw_data_list = []
            failed_files = []

            # Process each uploaded file
            for uploaded_file in uploaded_files:
                try:
                    # Save file locally
                    local_path = self.store_file_locally(uploaded_file)

                    # Save file metadata in the file_metadata table
                    with self.engine.connect() as conn:
                        conn.execute(
                            file_metadata_table.insert().values(
                                user_id=user_id,
                                company_id=company_id,
                                filename=uploaded_file.filename,
                                local_path=local_path,
                                status="processed",
                                created_at=datetime.utcnow()
                            )
                        )
                        logging.info(f"Saved metadata for file: {uploaded_file.filename}")

                    # Process the file and collect raw data
                    process_excel_files = ProcessExcelFiles()
                    processed_data = process_excel_files.process_file(uploaded_file)

                    if isinstance(processed_data, list):
                        raw_data_list.append(pd.DataFrame(processed_data))
                        files_metadata.append({
                            "filename": uploaded_file.filename,
                            "local_path": local_path,
                            "status": "processed",
                        })
                    else:
                        failed_files.append({
                            "filename": uploaded_file.filename,
                            "error": processed_data.get("message", "Unknown error"),
                        })

                except Exception as e:
                    logging.error(f"Failed to process file '{uploaded_file.filename}': {e}")
                    failed_files.append({
                        "filename": uploaded_file.filename,
                        "error": str(e),
                    })

            # Consolidate data from successful files
            if raw_data_list:
                consolidated_data = pd.concat(raw_data_list, ignore_index=True)
                logging.info("Successfully consolidated data.")
            else:
                return {"status": "error", "message": "All files failed to process"}, 400

            # Save consolidated data in the database
            with self.engine.connect() as conn:
                for chunk in consolidated_data.to_dict(orient="records"):
                    conn.execute(
                        consolidated_data_table.insert().values(
                            user_id=user_id,
                            company_id=company_id,
                            data=chunk,
                            created_at=datetime.utcnow()
                        )
                    )

            logging.info("Saved consolidated data in the database.")

            # Process mapping file
            mapping_data = pd.read_excel(mapping_file)
            mapping_config = self.generate_mapping_config(mapping_data)
            dynamic_mapper = DynamicDataMapper(mapping_config=mapping_config)

            # Map consolidated data
            mapped_data = dynamic_mapper.map_data(consolidated_data, mapping_data)

            # Save mapped data in the database
            with self.engine.connect() as conn:
                for chunk in mapped_data.to_dict(orient="records"):
                    conn.execute(
                        mapped_data_table.insert().values(
                            user_id=user_id,
                            company_id=company_id,
                            data=chunk,
                            created_at=datetime.utcnow()
                        )
                    )

            logging.info("Saved mapped data in the database.")

            # Generate and save pivot table
            pivot_table = dynamic_mapper.generate_pivot_table(mapped_data)
            if pivot_table is not None:
                with self.engine.connect() as conn:
                    for chunk in pivot_table.to_dict(orient="records"):
                        conn.execute(
                            pivot_table_table.insert().values(
                                user_id=user_id,
                                company_id=company_id,
                                data=chunk,
                                created_at=datetime.utcnow()
                            )
                        )

                logging.info("Saved pivot table in the database.")

            # Return response
            if not failed_files:
                return {
                    "status": "success",
                    "files_metadata": files_metadata,
                }, 200
            else:
                return {
                    "status": "partial_success",
                    "failed_files": failed_files,
                }, 200

        except Exception as e:
            logging.error(f"Unexpected error: {e}")
            return {"status": "error", "message": str(e)}, 500
"""
