from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.core.database import Base
import enum

class DocumentType(str, enum.Enum):
    CONTRACT = "contract"
    ID_DOCUMENT = "id_document"
    CERTIFICATE = "certificate"
    PERFORMANCE_REVIEW = "performance_review"
    TRAINING_CERTIFICATE = "training_certificate"
    POLICY_ACKNOWLEDGMENT = "policy_acknowledgment"
    OTHER = "other"

class DocumentStatus(str, enum.Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    ARCHIVED = "archived"
    PENDING_APPROVAL = "pending_approval"

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    
    # Document Information
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    document_type = Column(Enum(DocumentType), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_name = Column(String(200), nullable=False)
    file_size = Column(Integer, nullable=True)  # in bytes
    mime_type = Column(String(100), nullable=True)
    
    # Status and Dates
    status = Column(Enum(DocumentStatus), default=DocumentStatus.ACTIVE)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())
    expiry_date = Column(Date, nullable=True)
    archived_date = Column(DateTime(timezone=True), nullable=True)
    
    # Metadata
    tags = Column(Text, nullable=True)  # JSON string of tags
    version = Column(String(20), default="1.0")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    employee = relationship("Employee", backref="documents")
    
    def __repr__(self):
        return f"<Document(id={self.id}, title='{self.title}', type='{self.document_type}', status='{self.status}')>"
