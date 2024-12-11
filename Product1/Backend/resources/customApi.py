from flask_restful import Resource, reqparse, abort
from app import db
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

# Custom function to handle both Decimal and Timestamp objects
def custom_serializer(obj):
    if isinstance(obj, Decimal):
        return float(obj)  # Convert Decimal to float
    elif isinstance(obj, (pd.Timestamp, datetime)):  # Use the correct datetime
        return obj.isoformat()  # Convert Timestamp/datetime to ISO 8601 string format
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

def get_model_by_tablename(table_name):
    return globals().get(table_name)

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
        """
        Endpoint to upload multiple Excel/CSV files, process, and consolidate them.
        """
        try:
            # Retrieve uploaded files and mapping file
            uploaded_files = request.files.getlist('files')  # List of uploaded files
            mapping_file = request.files.get('mapping_file')  # Single mapping file
            
            if not uploaded_files:
                return {"status": "error", "message": "No files uploaded"}, 400
            if not mapping_file:
                return {"status": "error", "message": "Mapping file is required"}, 400
            
            # Initialize processing objects
            process_excel_files = ProcessExcelFiles()
            
            # Process each file
            raw_data_list = []
            failed_files = []  # Track failed files
            
            for uploaded_file in uploaded_files:
                print(uploaded_file)
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
            
            return {
                "status": "success",
                # "consolidated_data": consolidated_data_json,
                "mapped_data": mapped_data_json,
                # "pivot_table": pivot_table_json,
                "failed_files": failed_files
            }, 200
            
        
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500














