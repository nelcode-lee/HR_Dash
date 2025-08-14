from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, ForeignKey, Text, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.core.database import Base
import enum

class AbsenceType(str, enum.Enum):
    ANNUAL_LEAVE = "annual_leave"
    SICK_LEAVE = "sick_leave"
    PERSONAL_LEAVE = "personal_leave"
    MATERNITY_LEAVE = "maternity_leave"
    PATERNITY_LEAVE = "paternity_leave"
    BEREAVEMENT_LEAVE = "bereavement_leave"
    OTHER = "other"

class AbsenceStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    CANCELLED = "cancelled"

class Absence(Base):
    __tablename__ = "absences"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    absence_type = Column(Enum(AbsenceType), nullable=False)
    status = Column(Enum(AbsenceStatus), default=AbsenceStatus.PENDING)
    
    # Date Information
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    total_days = Column(Float, nullable=False)
    
    # Details
    reason = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    
    # Approval
    approved_by = Column(Integer, ForeignKey("employees.id"), nullable=True)
    approved_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    employee = relationship("Employee", foreign_keys=[employee_id], backref="absences")
    approver = relationship("Employee", foreign_keys=[approved_by], backref="approved_absences")
    
    def __repr__(self):
        return f"<Absence(id={self.id}, employee_id={self.employee_id}, type='{self.absence_type}', status='{self.status}')>"
