from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
from backend.models.performance import PerformanceRating

class PerformanceBase(BaseModel):
    employee_id: int
    reviewer_id: int
    review_date: date
    review_period_start: date
    review_period_end: date
    overall_rating: PerformanceRating
    technical_skills: Optional[PerformanceRating] = None
    communication: Optional[PerformanceRating] = None
    teamwork: Optional[PerformanceRating] = None
    leadership: Optional[PerformanceRating] = None
    initiative: Optional[PerformanceRating] = None
    strengths: Optional[str] = None
    areas_for_improvement: Optional[str] = None
    goals: Optional[str] = None
    comments: Optional[str] = None

class PerformanceCreate(PerformanceBase):
    pass

class PerformanceUpdate(BaseModel):
    overall_rating: Optional[PerformanceRating] = None
    technical_skills: Optional[PerformanceRating] = None
    communication: Optional[PerformanceRating] = None
    teamwork: Optional[PerformanceRating] = None
    leadership: Optional[PerformanceRating] = None
    initiative: Optional[PerformanceRating] = None
    strengths: Optional[str] = None
    areas_for_improvement: Optional[str] = None
    goals: Optional[str] = None
    comments: Optional[str] = None
    is_completed: Optional[bool] = None
    employee_acknowledged: Optional[bool] = None

class PerformanceResponse(PerformanceBase):
    id: int
    is_completed: bool
    employee_acknowledged: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
