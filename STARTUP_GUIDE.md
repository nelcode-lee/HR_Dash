# HR Dashboard Startup Guide

This guide will help you get the HR Dashboard running with both frontend and backend.

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to project directory
cd HR_Dash

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp env.example .env
# Edit .env with your database credentials

# Initialize database with sample data
cd backend
python init_db.py

# Start the backend server
python run_backend.py
# Or: uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend Setup

```bash
# In a new terminal, navigate to project directory
cd HR_Dash

# Install Node.js dependencies
npm install

# Start the React development server
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🔐 Default Login Credentials

- **Admin User**: admin@company.com / admin123
- **HR Manager**: hr@company.com / hr123

## 📊 Sample Data

The system comes with:
- 6 departments (Engineering, Sales, Marketing, HR, Finance, Operations)
- 3 sample employees
- Sample performance and training data

## 🛠️ Troubleshooting

### Backend Issues
- Ensure PostgreSQL is running
- Check database connection in `.env`
- Verify all Python dependencies are installed

### Frontend Issues
- Clear browser cache
- Check console for API errors
- Ensure backend is running on port 8000

### Database Issues
- Run `python init_db.py` to recreate sample data
- Check PostgreSQL logs for connection issues

## 🔧 Development

### Adding New Features
1. Create models in `backend/models/`
2. Create schemas in `backend/schemas/`
3. Create routers in `backend/routers/`
4. Update frontend components to use new APIs

### API Testing
- Use the interactive docs at http://localhost:8000/docs
- Test endpoints with tools like Postman or curl

## 📝 Environment Variables

Key variables in `.env`:
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT encryption key
- `ALLOWED_ORIGINS`: CORS origins for frontend

## 🚀 Production Deployment

For production:
1. Set `ENVIRONMENT=production` in `.env`
2. Use strong `SECRET_KEY`
3. Configure proper database credentials
4. Set up reverse proxy (Nginx)
5. Use Gunicorn with Uvicorn workers

## 📞 Support

If you encounter issues:
1. Check the console logs
2. Verify all services are running
3. Check the API documentation
4. Review the error messages

Happy HR Management! 🎉
