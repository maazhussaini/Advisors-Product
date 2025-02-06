from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

# Initialize SQLAlchemy
db = SQLAlchemy()

# Database connection setup
def get_engine(connection_string):
    return create_engine(
        'postgresql://{}:{}@{}:{}/{}'.format(
            connection_string['user'],
            connection_string['password'],
            connection_string['host'],
            connection_string['port'],
            connection_string['database']
        )
    )

connection_string = {
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT'),
    'database': os.getenv('DB_NAME')
}

engine = get_engine(connection_string)
Session = scoped_session(sessionmaker(bind=engine))
session = Session()


# Ensure the database tables are created
# Base.metadata.create_all(engine)

# # Create the engine and scoped session for raw SQL operations
# engine = create_engine(os.getenv("SQLALCHEMY_DATABASE_URI"))
# Session = scoped_session(sessionmaker(bind=engine))


class MongoDBConnection:
    def __init__(self):
        self.mongo_uri = self.get_connection_string()
        self.database_name = os.getenv("MONGO_INITDB_DATABASE", "file_uploads")

    @staticmethod
    def get_connection_string():
        username = os.getenv("MONGO_INITDB_ROOT_USERNAME")
        password = os.getenv("MONGO_INITDB_ROOT_PASSWORD")
        host = os.getenv("MONGO_HOST", "localhost")
        return f"mongodb+srv://{username}:{password}@{host}/"

    def get_database(self):
        client = MongoClient(self.mongo_uri)
        return client[self.database_name]
