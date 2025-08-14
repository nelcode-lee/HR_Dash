UK HR System - Backend API Documentation
Overview
RESTful API built with FastAPI for managing UK employment data and ensuring legal compliance. The API follows OpenAPI 3.0 specification and includes automatic interactive documentation.
Base URL
Development: http://localhost:8000
Production: https://your-domain.com/api
Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
bashAuthorization: Bearer <your-jwt-token>
API Endpoints
🏠 Health Check
GET /health
Check API health status.
Response:
json{
  "status": "healthy",
  "timestamp": "2025-08-12T10:30:00Z",
  "version": "1.0.0"
}

👥 Employee Management
GET /employees/
Retrieve list of employees with pagination.
Query Parameters:

skip (int, optional): Number of records to skip (default: 0)
limit (int, optional): Maximum records to return (default: 100)
department (string, optional): Filter by department
status (string, optional): Filter by employment status

Response:
json[
  {
    "id": 1,
    "employee_number": "EMP12345678",
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@company.com",
    "job_title": "Software Developer",
    "department": "Engineering",
    "employment_status": "active",
    "onboarding_completed": true,
    "start_date": "2025-01-15",
    "salary": 45000.00
  }
]
POST /employees/
Create a new employee record.
Request Body:
json{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@company.com",
  "phone": "+44 7700 123456",
  "date_of_birth": "1990-05-15",
  "national_insurance_number": "AB123456C",
  "job_title": "Marketing Manager",
  "department": "Marketing",
  "start_date": "2025-09-01",
  "contract_type": "permanent",
  "salary": 38000.00,
  "manager_id": 5
}
Response:
json{
  "id": 15,
  "employee_number": "EMP87654321",
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@company.com",
  "job_title": "Marketing Manager",
  "department": "Marketing",
  "employment_status": "pending",
  "onboarding_completed": false
}
GET /employees/{employee_id}
Retrieve detailed employee information.
Path Parameters:

employee_id (int): Employee ID

Response:
json{
  "id": 1,
  "employee_number": "EMP12345678",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@company.com",
  "phone": "+44 7700 987654",
  "date_of_birth": "1985-03-10",
  "national_insurance_number": "AB987654C",
  "address_line_1": "123 High Street",
  "address_line_2": "Flat 2A",
  "city": "London",
  "county": "Greater London",
  "postcode": "SW1A 1AA",
  "job_title": "Software Developer",
  "department": "Engineering",
  "start_date": "2023-01-15",
  "employment_status": "active",
  "contract_type": "permanent",
  "salary": 45000.00,
  "holiday_entitlement": 28,
  "manager_id": 3,
  "onboarding_completed": true,
  "right_to_work_verified": true,
  "dbs_check_completed": true,
  "references_completed": true,
  "contract_signed": true,
  "created_at": "2023-01-10T09:00:00Z",
  "updated_at": "2025-08-10T14:30:00Z"
}
PUT /employees/{employee_id}
Update employee information.
Request Body: (Same as POST, all fields optional)
DELETE /employees/{employee_id}
Soft delete employee (sets employment_status to 'terminated').

📋 Onboarding Management
PUT /employees/{employee_id}/onboarding
Update onboarding checklist status.
Query Parameters:

field (string): Onboarding field to update

right_to_work_verified
dbs_check_completed
references_completed
contract_signed


value (boolean): New status value

Request:
bashPUT /employees/1/onboarding?field=right_to_work_verified&value=true
Response:
json{
  "message": "Onboarding status updated",
  "onboarding_completed": false
}
GET /employees/{employee_id}/onboarding-status
Get complete onboarding status.
Response:
json{
  "employee_id": 1,
  "onboarding_completed": false,
  "right_to_work_verified": true,
  "dbs_check_completed": false,
  "references_completed": true,
  "contract_signed": false,
  "completion_percentage": 50
}

📅 Absence Management
GET /absences/
Retrieve absence records.
Query Parameters:

employee_id (int, optional): Filter by employee
absence_type (string, optional): Filter by type
start_date (date, optional): Filter from date
end_date (date, optional): Filter to date
approved (boolean, optional): Filter by approval status

Response:
json[
  {
    "id": 1,
    "employee_id": 5,
    "absence_type": "annual_leave",
    "start_date": "2025-08-20",
    "end_date": "2025-08-24",
    "days_count": 5.0,
    "reason": "Summer holiday",
    "approved": true,
    "approved_by": "manager@company.com",
    "approved_at": "2025-08-01T10:00:00Z"
  }
]
POST /absences/
Create absence request.
Request Body:
json{
  "employee_id": 5,
  "absence_type": "annual_leave",
  "start_date": "2025-09-15",
  "end_date": "2025-09-19",
  "reason": "Family holiday"
}
Response:
json{
  "id": 15,
  "employee_id": 5,
  "absence_type": "annual_leave",
  "start_date": "2025-09-15",
  "end_date": "2025-09-19",
  "days_count": 5.0,
  "reason": "Family holiday",
  "approved": false,
  "approved_by": null,
  "approved_at": null
}
PUT /absences/{absence_id}/approve
Approve or reject absence request.
Request Body:
json{
  "approved": true,
  "approved_by": "manager@company.com",
  "notes": "Approved - adequate cover arranged"
}
GET /employees/{employee_id}/absences
Get all absences for specific employee.
GET /employees/{employee_id}/absence-summary
Get absence summary and entitlements.
Response:
json{
  "employee_id": 5,
  "holiday_entitlement": 28,
  "holiday_taken": 15.0,
  "holiday_remaining": 13.0,
  "sick_days_taken": 2.0,
  "year": 2025,
  "absence_breakdown": {
    "annual_leave": 15.0,
    "sick_leave": 2.0,
    "maternity": 0.0,
    "paternity": 0.0,
    "compassionate": 1.0,
    "unpaid": 0.0
  }
}

📊 Performance Management
GET /performance-reviews/
Retrieve performance reviews.
Query Parameters:

employee_id (int, optional): Filter by employee
year (int, optional): Filter by review year

Response:
json[
  {
    "id": 1,
    "employee_id": 5,
    "review_period_start": "2024-01-01",
    "review_period_end": "2024-12-31",
    "overall_rating": 4,
    "goals_met": "Successfully delivered 3 major projects on time",
    "areas_for_improvement": "Could improve time management skills",
    "next_period_goals": "Lead team on new product launch",
    "reviewer_name": "Sarah Johnson",
    "review_date": "2025-01-15T14:00:00Z"
  }
]
POST /performance-reviews/
Create performance review.
Request Body:
json{
  "employee_id": 5,
  "review_period_start": "2025-01-01",
  "review_period_end": "2025-12-31",
  "overall_rating": 4,
  "goals_met": "Exceeded sales targets by 15%",
  "areas_for_improvement": "Needs to develop leadership skills",
  "next_period_goals": "Take on team leadership role",
  "reviewer_name": "Mike Wilson"
}
GET /employees/{employee_id}/performance-history
Get performance review history for employee.

🎓 Training & Certifications
GET /training-records/
Retrieve training records.
Query Parameters:

employee_id (int, optional): Filter by employee
mandatory (boolean, optional): Filter mandatory training
expiring_soon (boolean, optional): Filter training expiring within 30 days

Response:
json[
  {
    "id": 1,
    "employee_id": 5,
    "training_name": "Health & Safety Awareness",
    "provider": "SafetyFirst Training Ltd",
    "completion_date": "2025-01-15",
    "expiry_date": "2026-01-15",
    "certificate_number": "HS2025001",
    "mandatory": true
  }
]
POST /training-records/
Add training record.
Request Body:
json{
  "employee_id": 5,
  "training_name": "Advanced Excel",
  "provider": "TechSkills Academy",
  "completion_date": "2025-08-10",
  "expiry_date": null,
  "certificate_number": "EXC2025789",
  "mandatory": false
}
GET /training-records/expiring
Get training expiring within specified timeframe.
Query Parameters:

days (int, optional): Days ahead to check (default: 30)


📄 Document Management
POST /upload-document/
Upload employee document.
Form Data:

employee_id (int): Employee ID
document_type (string): Document type

right_to_work
dbs_check
contract
p45
p46
reference
qualification


file (file): Document file

Response:
json{
  "message": "Document uploaded successfully",
  "document_id": 25,
  "file_name": "passport_scan.pdf",
  "document_type": "right_to_work"
}
GET /employees/{employee_id}/documents
Get all documents for employee.
Response:
json[
  {
    "id": 25,
    "employee_id": 5,
    "document_type": "right_to_work",
    "file_name": "passport_scan.pdf",
    "uploaded_at": "2025-08-12T09:00:00Z",
    "verified": true,
    "verified_by": "hr@company.com",
    "verified_at": "2025-08-12T11:00:00Z",
    "expiry_date": "2030-04-15"
  }
]
PUT /documents/{document_id}/verify
Verify uploaded document.
Request Body:
json{
  "verified": true,
  "verified_by": "hr@company.com",
  "expiry_date": "2030-04-15",
  "notes": "Valid UK passport verified"
}

📈 Dashboard & Analytics
GET /dashboard/stats
Get dashboard statistics.
Response:
json{
  "total_employees": 150,
  "pending_onboarding": 5,
  "active_employees": 140,
  "pending_absences": 8,
  "expiring_documents": 3,
  "expiring_training": 12,
  "departments": [
    {"name": "Engineering", "count": 45},
    {"name": "Sales", "count": 30},
    {"name": "Marketing", "count": 25},
    {"name": "HR", "count": 8}
  ],
  "employment_status_breakdown": {
    "active": 140,
    "pending": 5,
    "on_notice": 3,
    "terminated": 2
  }
}
GET /dashboard/alerts
Get system alerts and notifications.
Response:
json[
  {
    "id": 1,
    "type": "warning",
    "title": "Documents Expiring Soon",
    "message": "3 employee documents expire within 30 days",
    "action_url": "/documents/expiring",
    "created_at": "2025-08-12T08:00:00Z"
  },
  {
    "id": 2,
    "type": "info",
    "title": "Pending Absence Approvals",
    "message": "8 absence requests require approval",
    "action_url": "/absences/pending",
    "created_at": "2025-08-11T16:30:00Z"
  }
]
GET /reports/compliance
Generate compliance report.
Query Parameters:

start_date (date, optional): Report start date
end_date (date, optional): Report end date
format (string, optional): Response format (json, csv, pdf)


🔒 Authentication Endpoints
POST /auth/login
Authenticate user and get JWT token.
Request Body:
json{
  "email": "admin@company.com",
  "password": "secure_password"
}
Response:
json{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 1800,
  "user": {
    "id": 1,
    "email": "admin@company.com",
    "is_admin": true
  }
}
POST /auth/refresh
Refresh JWT token.
POST /auth/logout
Logout user (invalidate token).

🌍 UK Compliance Utilities
POST /uk-compliance/validate-ni-number
Validate UK National Insurance number.
Request Body:
json{
  "ni_number": "AB123456C"
}
Response:
json{
  "valid": true,
  "formatted": "AB 12 34 56 C",
  "message": "Valid National Insurance number"
}
GET /uk-compliance/statutory-holidays/{year}
Get UK statutory holidays for given year.
Response:
json[
  {
    "name": "New Year's Day",
    "date": "2025-01-01",
    "type": "bank_holiday"
  },
  {
    "name": "Good Friday",
    "date": "2025-04-18",
    "type": "bank_holiday"
  }
]
POST /uk-compliance/calculate-statutory-pay
Calculate statutory sick pay or maternity pay.
Request Body:
json{
  "employee_id": 5,
  "pay_type": "statutory_sick_pay",
  "start_date": "2025-08-01",
  "end_date": "2025-08-07",
  "gross_weekly_earnings": 500.00
}

Error Handling
Standard Error Response
json{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The provided data is invalid",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "timestamp": "2025-08-12T10:30:00Z",
  "path": "/employees/"
}
HTTP Status Codes

200 - Success
201 - Created
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
422 - Validation Error
500 - Internal Server Error

Rate Limiting

General API: 1000 requests per hour per user
File Upload: 50 uploads per hour per user
Authentication: 10 attempts per hour per IP

Data Validation
Employee Data

Email: Valid format, unique across system
National Insurance: UK format validation
Postcode: UK postcode format
Phone: UK mobile/landline format
Date of Birth: Must be 16+ years old
Salary: Minimum wage compliance check

Absence Rules

Annual Leave: Cannot exceed entitlement
Sick Leave: Follows statutory guidelines
Notice Period: Configurable by contract type
Overlap Check: Prevents conflicting absences

Security Features
Data Protection

All sensitive data encrypted at rest
PII data masked in logs
GDPR compliant data handling
Audit trail for all data changes

Access Control

Role-based permissions
API key authentication
Rate limiting by user/IP
Session management

File Security

Virus scanning on upload
File type validation
Secure file storage
Access logging

Performance Considerations
Caching

Employee data cached for 15 minutes
Dashboard stats cached for 5 minutes
Static reference data cached for 1 hour

Database Optimization

Indexed foreign keys
Composite indexes on common queries
Database connection pooling
Query optimization monitoring

Scalability

Horizontal scaling support
Load balancer ready
Database replication support
Microservice architecture ready

Monitoring & Logging
Metrics Tracked

API response times
Error rates by endpoint
User activity patterns
System resource usage

Audit Logging

All CRUD operations logged
User access tracking
Compliance event logging
Security event monitoring

Integration APIs
External Services

HMRC Integration: Real-time tax calculations
Pension Providers: Auto-enrollment APIs
Background Checks: DBS check status
Training Providers: Course completion tracking

Webhooks

Employee status changes
Document expiry alerts
Absence approval notifications
Performance review reminders


Development Notes
Environment Variables
bashDATABASE_URL=postgresql://user:pass@localhost:5432/hr_system
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FILE_UPLOAD_PATH=/uploads
MAX_FILE_SIZE=10485760  # 10MB
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
Database Migrations
bash# Create migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
Testing
bash# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_employees.py
This API documentation provides comprehensive coverage of all endpoints, UK compliance features, and development guidelines for the HR management system.