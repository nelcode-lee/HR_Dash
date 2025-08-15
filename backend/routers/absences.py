from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.core.database import get_db
from backend.schemas.absence import AbsenceCreate, AbsenceUpdate, AbsenceResponse
from backend.models.absence import Absence
from backend.routers.auth import get_current_user
from backend.models.user import User

router = APIRouter()

@router.get("/", response_model=List[AbsenceResponse])
def get_absences(db: Session = Depends(get_db)):
    absences = db.query(Absence).all()
    return absences

@router.post("/", response_model=AbsenceResponse)
def create_absence(
    absence: AbsenceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_absence = Absence(**absence.dict())
    db.add(db_absence)
    db.commit()
    db.refresh(db_absence)
    return db_absence
