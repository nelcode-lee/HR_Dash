from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
from backend.models.absence import AbsenceType, AbsenceStatus

class AbsenceBase(BaseModel):
    employee_id: int
    absence_type: AbsenceType
    start_date: date
    end_date: date
    total_days: float
    reason: Optional[str] = None
    notes: Optional[str] = None

class AbsenceCreate(AbsenceBase):
    pass

class AbsenceUpdate(BaseModel):
    absence_type: Optional[AbsenceType] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    total_days: Optional[float] = None
    reason: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[AbsenceStatus] = None
    approved_by: Optional[int] = None

class AbsenceResponse(AbsenceBase):
    id: int
    status: AbsenceStatus
    approved_by: Optional[int] = None
    approved_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
