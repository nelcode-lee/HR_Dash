from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.core.database import get_db
from backend.schemas.training import TrainingCreate, TrainingUpdate, TrainingResponse
from backend.models.training import Training
from backend.routers.auth import get_current_user
from backend.models.user import User

router = APIRouter()

@router.get("/", response_model=List[TrainingResponse])
def get_trainings(db: Session = Depends(get_db)):
    trainings = db.query(Training).all()
    return trainings

@router.post("/", response_model=TrainingResponse)
def create_training(
    training: TrainingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_training = Training(**training.dict())
    db.add(db_training)
    db.commit()
    db.refresh(db_training)
    return db_training
