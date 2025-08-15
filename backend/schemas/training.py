from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
from backend.models.training import TrainingStatus, TrainingType

class TrainingBase(BaseModel):
    employee_id: int
    title: str
    description: Optional[str] = None
    training_type: TrainingType
    provider: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    due_date: Optional[date] = None
    duration_hours: Optional[float] = None
    cost: Optional[float] = None
    notes: Optional[str] = None

class TrainingCreate(TrainingBase):
    pass

class TrainingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    training_type: Optional[TrainingType] = None
    provider: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    due_date: Optional[date] = None
    duration_hours: Optional[float] = None
    cost: Optional[float] = None
    notes: Optional[str] = None
    status: Optional[TrainingStatus] = None
    progress_percentage: Optional[float] = None
    score: Optional[float] = None
    completion_date: Optional[date] = None
    certificate_number: Optional[str] = None
    expiry_date: Optional[date] = None

class TrainingResponse(TrainingBase):
    id: int
    status: TrainingStatus
    progress_percentage: float
    score: Optional[float] = None
    completion_date: Optional[date] = None
    certificate_number: Optional[str] = None
    expiry_date: Optional[date] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
