# from app import db
from datetime import datetime
import re
from exceptions import ValidationError
import json
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, TIMESTAMP, Boolean, func
from sqlalchemy.orm import sessionmaker, declarative_base, relationship

Base = declarative_base()

# Define models
class UserInformation(Base):
    __tablename__ = 'user_information'
    __table_args__ = {'schema': 'advisors'}
    
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_first_name = Column(String(255), nullable=False)
    user_last_name = Column(String(255), nullable=False)
    user_email = Column(String(255), nullable=False)
    user_password = Column(String(255), nullable=False)
    user_phone = Column(String(20), nullable=True)
    is_active = Column(Boolean, nullable=False, server_default='true')
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    
    companies = relationship("CompanyInformation", back_populates="user")

class CompanySize(Base):
    __tablename__ = 'company_size'
    __table_args__ = {'schema': 'advisors'}
    
    size_id = Column(Integer, primary_key=True, autoincrement=True)
    size_description = Column(String(20), nullable=False, unique=True)
    is_active = Column(Boolean, nullable=False, server_default='true')

class CompanyInformation(Base):
    __tablename__ = 'company_information'
    __table_args__ = {'schema': 'advisors'}
    
    company_id = Column(Integer, primary_key=True, autoincrement=True)
    company_name = Column(String(255), nullable=False)
    company_email = Column(String(255), nullable=False)
    company_country = Column(String(255), nullable=False)
    company_city = Column(String(255), nullable=False)
    company_phone = Column(String(20), nullable=False)
    user_id = Column(Integer, ForeignKey('advisors.user_information.user_id'), nullable=False)
    # company_size_id = Column(Integer, ForeignKey('advisors.company_size.size_id'), nullable=False)
    
    is_active = Column(Boolean, nullable=False, server_default='true')
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    
    user = relationship("UserInformation", back_populates="companies")
    # company_size = relationship("CompanySize")










