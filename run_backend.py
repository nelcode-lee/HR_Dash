#!/usr/bin/env python3
"""
HR Dashboard Backend Server
Run this script to start the FastAPI backend server
"""

import uvicorn
from backend.main import app

if __name__ == "__main__":
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
