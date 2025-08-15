from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class EmployeeBase(BaseModel):
    employee_id: str
    first_name: str
    last_name: str
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    hire_date: date
    position: str
    salary: Optional[float] = None
    employment_type: str
    department_id: Optional[int] = None
    manager_id: Optional[int] = None

class EmployeeCreate(EmployeeBase):
    user_id: int

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    position: Optional[str] = None
    salary: Optional[float] = None
    employment_type: Optional[str] = None
    department_id: Optional[int] = None
    manager_id: Optional[int] = None
    is_active: Optional[bool] = None

class EmployeeResponse(EmployeeBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
