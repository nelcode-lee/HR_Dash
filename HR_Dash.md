UK HR Management System - Cursor AI Development Guide
Project Overview
A comprehensive HR management system built specifically for UK businesses, ensuring legal compliance with UK employment law. The system handles employee onboarding, performance tracking, absence management, and training certifications.
Technology Stack
Backend

Python FastAPI - Modern, fast web framework
SQLAlchemy - ORM for database operations
PostgreSQL - Primary database
Pydantic - Data validation and serialization
JWT - Authentication
Alembic - Database migrations

Frontend

React.js - Component-based UI framework
Tailwind CSS - Utility-first CSS framework
Lucide React - Icon library
Axios - HTTP client

Project Structure
uk-hr-system/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── employee.py      # Employee model
│   │   │   ├── absence.py       # Absence model
│   │   │   ├── document.py      # Document model
│   │   │   ├── performance.py   # Performance review model
│   │   │   └── training.py      # Training record model
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── employee.py      # Pydantic schemas
│   │   │   ├── absence.py
│   │   │   └── common.py
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── employees.py     # Employee endpoints
│   │   │   ├── absences.py      # Absence endpoints
│   │   │   ├── performance.py   # Performance endpoints
│   │   │   └── training.py      # Training endpoints
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py        # App configuration
│   │   │   ├── database.py      # Database setup
│   │   │   └── security.py      # Auth utilities
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── uk_compliance.py # UK-specific validations
│   │       └── file_handler.py  # Document upload handling
│   ├── alembic/                 # Database migrations
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Modal.jsx
│   │   │   ├── employees/
│   │   │   │   ├── EmployeeList.jsx
│   │   │   │   ├── EmployeeDetail.jsx
│   │   │   │   └── AddEmployeeForm.jsx
│   │   │   ├── onboarding/
│   │   │   │   ├── OnboardingDashboard.jsx
│   │   │   │   └── OnboardingChecklist.jsx
│   │   │   ├── absences/
│   │   │   │   ├── AbsenceCalendar.jsx
│   │   │   │   └── AbsenceForm.jsx
│   │   │   ├── performance/
│   │   │   │   └── PerformanceReviews.jsx
│   │   │   └── training/
│   │   │       └── TrainingRecords.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Absences.jsx
│   │   │   ├── Performance.jsx
│   │   │   └── Training.jsx
│   │   ├── services/
│   │   │   ├── api.js           # API service layer
│   │   │   └── auth.js          # Authentication service
│   │   ├── hooks/
│   │   │   ├── useEmployees.js
│   │   │   └── useAuth.js
│   │   ├── utils/
│   │   │   ├── formatters.js    # Data formatting utilities
│   │   │   └── validators.js    # Form validation
│   │   └── App.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── docs/
│   ├── API.md                   # API documentation
│   ├── UK_COMPLIANCE.md         # UK employment law compliance
│   └── DEPLOYMENT.md            # Deployment guide
├── docker-compose.yml           # Local development setup
├── README.md
└── .gitignore
Setup Instructions for Cursor AI
1. Initialize the Project
bash# Create project directory
mkdir uk-hr-system
cd uk-hr-system

# Initialize git repository
git init
2. Backend Setup
bash# Create backend directory and virtual environment
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic pydantic[email] python-jose[cryptography] passlib[bcrypt] python-multipart

# Create requirements.txt
pip freeze > requirements.txt

# Initialize Alembic for database migrations
alembic init alembic
3. Frontend Setup
bash# Navigate to project root and create React app
cd ..
npm create react-app frontend
cd frontend

# Install additional dependencies
npm install axios lucide-react @headlessui/react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configure Tailwind CSS in tailwind.config.js
4. Database Setup
bash# Install PostgreSQL locally or use Docker
docker run --name hr-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=hr_system -p 5432:5432 -d postgres:13

# Create .env file in backend directory
cat > backend/.env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/hr_system
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOF
5. Cursor AI Configuration
Create a .cursorrules file in the project root:
# UK HR System - Cursor AI Rules

## Project Context
This is a UK HR management system built with Python FastAPI backend and React frontend. The system must comply with UK employment law and GDPR.

## Backend Standards
- Use FastAPI with SQLAlchemy ORM
- Follow RESTful API design principles
- Implement proper error handling and validation
- Use Pydantic for data validation
- Follow UK employment law requirements
- Implement proper security measures (JWT, password hashing)

## Frontend Standards
- Use React functional components with hooks
- Implement proper state management
- Use Tailwind CSS for styling
- Follow accessibility best practices
- Implement responsive design
- Use TypeScript for better type safety (future enhancement)

## UK Compliance Requirements
- Right to Work verification
- DBS checks where applicable
- Statutory holiday entitlements (28 days minimum)
- National Insurance number validation
- P45/P46 form handling
- GDPR compliance for data handling
- Auto-enrollment pension schemes

## Code Style
- Use clear, descriptive variable names
- Implement proper error handling
- Add comments for complex business logic
- Follow PEP 8 for Python code
- Use ES6+ features for JavaScript
- Implement proper logging

## Testing
- Write unit tests for business logic
- Test API endpoints
- Test React components
- Test UK-specific validation logic

## Security
- Validate all inputs
- Implement proper authentication
- Secure file uploads
- Protect against common vulnerabilities
- Implement rate limiting
UK Employment Law Compliance Features
Core Compliance Requirements

Right to Work Checks

Document verification system
Expiry date tracking
Automated reminders for renewals


Employment Contracts

Contract type management (permanent, fixed-term, casual, zero-hours)
Statutory terms and conditions
Digital signature capability


Holiday Entitlements

Minimum 28 days (including bank holidays)
Pro-rata calculations for part-time staff
Carry-over rules implementation


Absence Management

Statutory sick pay calculations
Maternity/paternity leave tracking
Compassionate leave handling


Performance Management

Regular review cycles
Capability procedures
Documentation requirements



Data Protection (GDPR)

Consent management
Data retention policies
Right to be forgotten
Data portability
Privacy impact assessments

Development Workflow with Cursor AI
1. Feature Development Process
bash# Create feature branch
git checkout -b feature/absence-management

# Use Cursor AI to:
# 1. Generate API endpoints
# 2. Create database models
# 3. Build React components
# 4. Write tests
# 5. Update documentation
2. Cursor AI Prompts for Common Tasks
Backend Development
Create a FastAPI endpoint for managing employee absences that:
- Accepts absence requests with validation
- Calculates statutory pay entitlements
- Checks against UK employment law
- Returns proper error messages
- Includes comprehensive documentation
Frontend Development
Create a React component for absence management that:
- Shows a calendar view of absences
- Allows filtering by absence type
- Displays UK statutory entitlements
- Implements proper form validation
- Follows accessibility guidelines
- Uses Tailwind CSS for styling
Testing
Generate comprehensive tests for the absence management feature including:
- Unit tests for business logic
- API endpoint tests
- React component tests
- UK compliance validation tests
- Edge case scenarios
3. Common Development Tasks
Adding a New Feature

Define Requirements

Use Cursor AI to research UK employment law requirements
Create user stories and acceptance criteria


Backend Implementation

Create database models
Implement API endpoints
Add validation logic
Write tests


Frontend Implementation

Create React components
Implement state management
Add form validation
Style with Tailwind CSS


Testing & Documentation

Write comprehensive tests
Update API documentation
Create user guides



Advanced Features for Future Development
1. Payroll Integration

PAYE calculations
National Insurance contributions
Pension auto-enrollment
P60/P11D generation

2. Reporting & Analytics

Employment law compliance reports
Performance analytics
Absence trend analysis
Training effectiveness metrics

3. Third-Party Integrations

HMRC API integration
Pension provider APIs
Background check services
Learning management systems

4. Mobile Application

React Native mobile app
Offline capability
Push notifications
Employee self-service

Deployment Considerations
1. Infrastructure

AWS/Azure/GCP hosting
Docker containerization
Load balancing
Database clustering

2. Security

SSL/TLS encryption
Web Application Firewall
DDoS protection
Regular security audits

3. Compliance

Data residency (UK-based hosting)
Backup and disaster recovery
Audit logging
Compliance monitoring

Getting Started with Cursor AI

Initial Setup

Clone the base code provided
Set up development environment
Configure Cursor AI with project context


First Development Session

Use Cursor AI to understand the codebase
Identify areas for enhancement
Plan feature development roadmap


Iterative Development

Use AI-assisted code generation
Implement UK compliance features
Build comprehensive test suites
Maintain documentation



Support & Resources

UK Employment Law: GOV.UK Employment Law
GDPR Guidance: ICO GDPR Guide
FastAPI Documentation: FastAPI Docs
React Documentation: React Docs

Contributing
When using Cursor AI for development:

Follow the coding standards outlined above
Ensure all new features include comprehensive tests
Update documentation for any new features
Verify UK employment law compliance
Test accessibility requirements

This system is designed to grow with your business needs while maintaining strict compliance with UK employment law and data protection requirements.