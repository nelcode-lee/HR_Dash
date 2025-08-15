from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.core.database import get_db
from backend.schemas.department import DepartmentCreate, DepartmentUpdate, DepartmentResponse
from backend.models.department import Department
from backend.routers.auth import get_current_user
from backend.models.user import User

router = APIRouter()

@router.get("/", response_model=List[DepartmentResponse])
def get_departments(db: Session = Depends(get_db)):
    departments = db.query(Department).filter(Department.is_active == True).all()
    return departments

@router.post("/", response_model=DepartmentResponse)
def create_department(
    department: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_dept = Department(**department.dict())
    db.add(db_dept)
    db.commit()
    db.refresh(db_dept)
    return db_dept
