from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, ForeignKey, Text, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.core.database import Base
import enum

class PerformanceRating(str, enum.Enum):
    EXCELLENT = "5 - Excellent"
    GOOD = "4 - Good"
    AVERAGE = "3 - Average"
    BELOW_AVERAGE = "2 - Below Average"
    POOR = "1 - Poor"

class Performance(Base):
    __tablename__ = "performance"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    reviewer_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    
    # Review Information
    review_date = Column(Date, nullable=False)
    review_period_start = Column(Date, nullable=False)
    review_period_end = Column(Date, nullable=False)
    
    # Ratings
    overall_rating = Column(Enum(PerformanceRating), nullable=False)
    technical_skills = Column(Enum(PerformanceRating), nullable=True)
    communication = Column(Enum(PerformanceRating), nullable=True)
    teamwork = Column(Enum(PerformanceRating), nullable=True)
    leadership = Column(Enum(PerformanceRating), nullable=True)
    initiative = Column(Enum(PerformanceRating), nullable=True)
    
    # Comments
    strengths = Column(Text, nullable=True)
    areas_for_improvement = Column(Text, nullable=True)
    goals = Column(Text, nullable=True)
    comments = Column(Text, nullable=True)
    
    # Status
    is_completed = Column(Boolean, default=False)
    employee_acknowledged = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    employee = relationship("Employee", foreign_keys=[employee_id], backref="performance_reviews")
    reviewer = relationship("Employee", foreign_keys=[reviewer_id], backref="conducted_reviews")
    
    def __repr__(self):
        return f"<Performance(id={self.id}, employee_id={self.employee_id}, rating='{self.overall_rating}', date='{self.review_date}')>"
