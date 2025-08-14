# HR Dashboard

A comprehensive HR Management System with a modern React frontend and FastAPI Python backend.

## 🚀 Features

### Frontend (React)
- **Dashboard**: Overview with key metrics and charts
- **Employee Management**: Add, edit, and manage employee information
- **Leave Management**: Absence tracking and approval system
- **Performance Reviews**: Performance tracking and ratings
- **Training Management**: Training records and certification tracking
- **Document Management**: Secure document storage and retrieval
- **Reports & Analytics**: Comprehensive reporting and data visualization
- **AI Assistant**: Intelligent HR support and document analysis

### Backend (FastAPI)
- **RESTful API**: Modern, fast API built with FastAPI
- **Database Models**: Comprehensive SQLAlchemy models for all HR entities
- **Authentication**: JWT-based authentication and authorization
- **File Management**: Secure document upload and storage
- **Data Validation**: Pydantic models for request/response validation
- **Database Migrations**: Alembic for database schema management

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion
- Recharts
- React Router
- React Hook Form

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- JWT Authentication
- Pydantic

## 📁 Project Structure

```
HR_Dash/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── index.js        # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Python FastAPI backend
│   ├── core/               # Core configuration
│   ├── models/             # Database models
│   ├── routers/            # API route handlers
│   ├── schemas/            # Pydantic schemas
│   ├── services/           # Business logic
│   └── main.py            # FastAPI application
├── requirements.txt         # Python dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nelcode-lee/HR_Dash.git
   cd HR_Dash
   ```

2. **Set up Python environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb hr_dashboard
   
   # Run migrations
   alembic upgrade head
   ```

5. **Start the backend server**
   ```bash
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📊 API Documentation

Once the backend is running, you can access:
- **Interactive API docs**: http://localhost:8000/docs
- **ReDoc documentation**: http://localhost:8000/redoc
- **Health check**: http://localhost:8000/health

## 🔐 Authentication

The system uses JWT tokens for authentication. Users can:
- Register and login
- Access role-based features
- Manage their profile and documents

## 📈 Database Schema

The system includes comprehensive models for:
- **Users**: Authentication and role management
- **Employees**: Personal and employment information
- **Departments**: Organizational structure
- **Absences**: Leave and absence tracking
- **Performance**: Performance reviews and ratings
- **Training**: Training records and certifications
- **Documents**: Secure document storage

## 🧪 Testing

```bash
# Backend tests
pytest

# Frontend tests
npm test
```

## 🚀 Deployment

### Backend Deployment
- Use Gunicorn with Uvicorn workers
- Set up environment variables
- Configure database connection
- Set up reverse proxy (Nginx)

### Frontend Deployment
- Build the production bundle
- Serve static files
- Configure API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API docs

## 🔄 Updates

Stay updated with the latest changes by:
- Watching the repository
- Checking the releases
- Following the changelog
