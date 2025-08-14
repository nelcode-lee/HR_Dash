from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, ForeignKey, Text, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.core.database import Base
import enum

class TrainingStatus(str, enum.Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    EXPIRED = "expired"

class TrainingType(str, enum.Enum):
    MANDATORY = "mandatory"
    OPTIONAL = "optional"
    CERTIFICATION = "certification"
    SKILL_DEVELOPMENT = "skill_development"

class Training(Base):
    __tablename__ = "training"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    
    # Training Information
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    training_type = Column(Enum(TrainingType), nullable=False)
    provider = Column(String(200), nullable=True)
    
    # Dates
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    due_date = Column(Date, nullable=True)
    completion_date = Column(Date, nullable=True)
    
    # Status and Progress
    status = Column(Enum(TrainingStatus), default=TrainingStatus.NOT_STARTED)
    progress_percentage = Column(Float, default=0.0)
    score = Column(Float, nullable=True)
    
    # Certification
    certificate_number = Column(String(100), nullable=True)
    expiry_date = Column(Date, nullable=True)
    
    # Cost and Duration
    cost = Column(Float, nullable=True)
    duration_hours = Column(Float, nullable=True)
    
    # Notes
    notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    employee = relationship("Employee", backref="training_records")
    
    def __repr__(self):
        return f"<Training(id={self.id}, employee_id={self.employee_id}, title='{self.title}', status='{self.status}')>"
