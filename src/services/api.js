const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  // Set auth token in localStorage
  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  // Remove auth token from localStorage
  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  // Get headers for API requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized - clear token and redirect to login
          this.removeAuthToken();
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(email, password) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.access_token) {
      this.setAuthToken(response.access_token);
    }
    
    return response;
  }

  async register(userData) {
    return await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return await this.request('/api/auth/me');
  }

  // Employee endpoints
  async getEmployees() {
    return await this.request('/api/employees');
  }

  async getEmployee(id) {
    return await this.request(`/api/employees/${id}`);
  }

  async createEmployee(employeeData) {
    return await this.request('/api/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData),
    });
  }

  async updateEmployee(id, employeeData) {
    return await this.request(`/api/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData),
    });
  }

  async deleteEmployee(id) {
    return await this.request(`/api/employees/${id}`, {
      method: 'DELETE',
    });
  }

  // Department endpoints
  async getDepartments() {
    return await this.request('/api/departments');
  }

  async createDepartment(departmentData) {
    return await this.request('/api/departments', {
      method: 'POST',
      body: JSON.stringify(departmentData),
    });
  }

  // Absence endpoints
  async getAbsences() {
    return await this.request('/api/absences');
  }

  async createAbsence(absenceData) {
    return await this.request('/api/absences', {
      method: 'POST',
      body: JSON.stringify(absenceData),
    });
  }

  // Performance endpoints
  async getPerformances() {
    return await this.request('/api/performance');
  }

  async createPerformance(performanceData) {
    return await this.request('/api/performance', {
      method: 'POST',
      body: JSON.stringify(performanceData),
    });
  }

  // Training endpoints
  async getTrainings() {
    return await this.request('/api/training');
  }

  async createTraining(trainingData) {
    return await this.request('/api/training', {
      method: 'POST',
      body: JSON.stringify(trainingData),
    });
  }

  // Document endpoints
  async getDocuments() {
    return await this.request('/api/documents');
  }

  async createDocument(documentData) {
    return await this.request('/api/documents', {
      method: 'POST',
      body: JSON.stringify(documentData),
    });
  }

  // Dashboard statistics
  async getDashboardStats() {
    try {
      const [employees, departments, absences, performances] = await Promise.all([
        this.getEmployees(),
        this.getDepartments(),
        this.getAbsences(),
        this.getPerformances(),
      ]);

      // Calculate statistics
      const totalEmployees = employees.length;
      const activeEmployees = employees.filter(emp => emp.is_active).length;
      const pendingAbsences = absences.filter(abs => abs.status === 'pending').length;
      
      // Department distribution
      const departmentStats = departments.map(dept => {
        const deptEmployees = employees.filter(emp => emp.department_id === dept.id);
        return {
          name: dept.name,
          count: deptEmployees.length,
          percentage: totalEmployees > 0 ? Math.round((deptEmployees.length / totalEmployees) * 100) : 0,
        };
      });

      // Performance distribution
      const performanceStats = [
        { rating: '5 - Excellent', count: 0, percentage: 0 },
        { rating: '4 - Good', count: 0, percentage: 0 },
        { rating: '3 - Average', count: 0, percentage: 0 },
        { rating: '2 - Below Average', count: 0, percentage: 0 },
        { rating: '1 - Poor', count: 0, percentage: 0 },
      ];

      performances.forEach(perf => {
        const rating = perf.overall_rating;
        const stat = performanceStats.find(s => s.rating === rating);
        if (stat) {
          stat.count += 1;
        }
      });

      // Calculate percentages
      const totalReviews = performances.length;
      performanceStats.forEach(stat => {
        stat.percentage = totalReviews > 0 ? Math.round((stat.count / totalReviews) * 100) : 0;
      });

      return {
        total_employees: totalEmployees,
        active_employees: activeEmployees,
        pending_absences: pendingAbsences,
        department_distribution: departmentStats,
        performance_distribution: performanceStats,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        total_employees: 0,
        active_employees: 0,
        pending_absences: 0,
        department_distribution: [],
        performance_distribution: [],
      };
    }
  }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService;
