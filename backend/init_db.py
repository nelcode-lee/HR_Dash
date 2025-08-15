#!/usr/bin/env python3
"""
Database Initialization Script
Creates sample data for the HR Dashboard
"""

import asyncio
from sqlalchemy.orm import Session
from backend.core.database import SessionLocal, engine
from backend.models import Base, User, Department, Employee
from backend.routers.auth import get_password_hash
from backend.models.user import UserRole

def init_db():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(User).first():
            print("Database already contains data. Skipping initialization.")
            return
        
        print("Initializing database with sample data...")
        
        # Create departments
        departments = [
            Department(name="Engineering", description="Software development and technical teams"),
            Department(name="Sales", description="Sales and business development"),
            Department(name="Marketing", description="Marketing and communications"),
            Department(name="HR", description="Human resources and people operations"),
            Department(name="Finance", description="Finance and accounting"),
            Department(name="Operations", description="Business operations and support")
        ]
        
        for dept in departments:
            db.add(dept)
        db.commit()
        
        # Create admin user
        admin_user = User(
            email="admin@company.com",
            username="admin",
            full_name="System Administrator",
            hashed_password=get_password_hash("admin123"),
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin_user)
        db.commit()
        
        # Create HR manager
        hr_user = User(
            email="hr@company.com",
            username="hr_manager",
            full_name="HR Manager",
            hashed_password=get_password_hash("hr123"),
            role=UserRole.HR_MANAGER,
            is_active=True
        )
        db.add(hr_user)
        db.commit()
        
        # Create sample employees
        employees = [
            Employee(
                employee_id="EMP001",
                user_id=hr_user.id,
                department_id=departments[3].id,  # HR
                first_name="Sarah",
                last_name="Johnson",
                hire_date="2023-01-15",
                position="HR Manager",
                salary=65000.00,
                employment_type="Full-time"
            ),
            Employee(
                employee_id="EMP002",
                user_id=admin_user.id,
                department_id=departments[0].id,  # Engineering
                first_name="John",
                last_name="Smith",
                hire_date="2023-02-01",
                position="Senior Software Engineer",
                salary=75000.00,
                employment_type="Full-time"
            ),
            Employee(
                employee_id="EMP003",
                user_id=None,
                department_id=departments[1].id,  # Sales
                first_name="Emma",
                last_name="Davis",
                hire_date="2023-03-10",
                position="Sales Representative",
                salary=45000.00,
                employment_type="Full-time"
            )
        ]
        
        for emp in employees:
            db.add(emp)
        db.commit()
        
        print("Database initialized successfully!")
        print(f"Created {len(departments)} departments")
        print(f"Created {len(employees)} employees")
        print(f"Created admin user: admin@company.com / admin123")
        print(f"Created HR user: hr@company.com / hr123")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
