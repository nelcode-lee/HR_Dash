from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.core.database import get_db
from backend.schemas.document import DocumentCreate, DocumentUpdate, DocumentResponse
from backend.models.document import Document
from backend.routers.auth import get_current_user
from backend.models.user import User

router = APIRouter()

@router.get("/", response_model=List[DocumentResponse])
def get_documents(db: Session = Depends(get_db)):
    documents = db.query(Document).all()
    return documents

@router.post("/", response_model=DocumentResponse)
def create_document(
    document: DocumentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_document = Document(**document.dict())
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document
