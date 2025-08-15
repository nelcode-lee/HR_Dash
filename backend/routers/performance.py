from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.core.database import get_db
from backend.schemas.performance import PerformanceCreate, PerformanceUpdate, PerformanceResponse
from backend.models.performance import Performance
from backend.routers.auth import get_current_user
from backend.models.user import User

router = APIRouter()

@router.get("/", response_model=List[PerformanceResponse])
def get_performances(db: Session = Depends(get_db)):
    performances = db.query(Performance).all()
    return performances

@router.post("/", response_model=PerformanceResponse)
def create_performance(
    performance: PerformanceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_performance = Performance(**performance.dict())
    db.add(db_performance)
    db.commit()
    db.refresh(db_performance)
    return db_performance
