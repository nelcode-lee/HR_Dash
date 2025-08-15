from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
from backend.models.document import DocumentType, DocumentStatus

class DocumentBase(BaseModel):
    employee_id: int
    title: str
    description: Optional[str] = None
    document_type: DocumentType
    file_path: str
    file_name: str
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    expiry_date: Optional[date] = None
    tags: Optional[str] = None
    version: str = "1.0"

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    document_type: Optional[DocumentType] = None
    file_path: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    status: Optional[DocumentStatus] = None
    expiry_date: Optional[date] = None
    tags: Optional[str] = None
    version: Optional[str] = None

class DocumentResponse(DocumentBase):
    id: int
    status: DocumentStatus
    upload_date: datetime
    archived_date: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
