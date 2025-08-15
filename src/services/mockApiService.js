// Mock API Service - Provides sample data while backend is being set up
class MockApiService {
  constructor() {
    this.baseURL = 'http://localhost:8000';
    this.token = null;
  }

  // Mock authentication
  async login(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email === 'admin@company.com' && password === 'admin123') {
      const mockToken = 'mock_jwt_token_' + Date.now();
      this.token = mockToken;
      localStorage.setItem('token', mockToken);
      return { access_token: mockToken };
    } else if (email === 'hr@company.com' && password === 'hr123') {
      const mockToken = 'mock_jwt_token_hr_' + Date.now();
      this.token = mockToken;
      localStorage.setItem('token', mockToken);
      return { access_token: mockToken };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  async register(email, username, fullName, password) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockToken = 'mock_jwt_token_new_' + Date.now();
    this.token = mockToken;
    localStorage.setItem('token', mockToken);
    return { access_token: mockToken };
  }

  async getCurrentUser() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id: 1,
      email: 'admin@company.com',
      username: 'admin',
      full_name: 'System Administrator',
      role: 'admin',
      is_active: true
    };
  }

  // Mock dashboard statistics
  async getDashboardStats() {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      total_employees: 156,
      active_employees: 148,
      pending_absences: 12,
      department_distribution: [
        { name: 'Engineering', count: 47, color: '#3b82f6' },
        { name: 'Sales', count: 32, color: '#10b981' },
        { name: 'Marketing', count: 28, color: '#f59e0b' },
        { name: 'HR', count: 9, color: '#ef4444' },
        { name: 'Finance', count: 15, color: '#8b5cf6' },
        { name: 'Operations', count: 25, color: '#06b6d4' }
      ],
      performance_ratings: [
        { rating: 'Outstanding', count: 15 },
        { rating: 'Exceeds Expectations', count: 42 },
        { rating: 'Meets Expectations', count: 78 },
        { rating: 'Needs Improvement', count: 18 },
        { rating: 'Unsatisfactory', count: 3 }
      ]
    };
  }

  // Mock employee data
  async getEmployees() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        id: 1,
        employee_id: 'EMP001',
        first_name: 'Sarah',
        last_name: 'Johnson',
        position: 'HR Manager',
        department: 'HR',
        hire_date: '2023-01-15',
        salary: 65000,
        employment_type: 'Full-time',
        is_active: true
      },
      {
        id: 2,
        employee_id: 'EMP002',
        first_name: 'John',
        last_name: 'Smith',
        position: 'Senior Software Engineer',
        department: 'Engineering',
        hire_date: '2023-02-01',
        salary: 75000,
        employment_type: 'Full-time',
        is_active: true
      },
      {
        id: 3,
        employee_id: 'EMP003',
        first_name: 'Emma',
        last_name: 'Davis',
        position: 'Sales Representative',
        department: 'Sales',
        hire_date: '2023-03-10',
        salary: 45000,
        employment_type: 'Full-time',
        is_active: true
      }
    ];
  }

  async createEmployee(employeeData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...employeeData, id: Date.now(), created_at: new Date().toISOString() };
  }

  async updateEmployee(id, employeeData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...employeeData, id, updated_at: new Date().toISOString() };
  }

  async deleteEmployee(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'Employee deleted successfully' };
  }

  // Mock department data
  async getDepartments() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, name: 'Engineering', description: 'Software development and technical teams' },
      { id: 2, name: 'Sales', description: 'Sales and business development' },
      { id: 3, name: 'Marketing', description: 'Marketing and communications' },
      { id: 4, name: 'HR', description: 'Human resources and people operations' },
      { id: 5, name: 'Finance', description: 'Finance and accounting' },
      { id: 6, name: 'Operations', description: 'Business operations and support' }
    ];
  }

  async createDepartment(departmentData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return { ...departmentData, id: Date.now(), created_at: new Date().toISOString() };
  }

  // Mock absence data
  async getAbsences() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        id: 1,
        employee_name: 'Sarah Johnson',
        absence_type: 'annual_leave',
        start_date: '2024-01-15',
        end_date: '2024-01-19',
        total_days: 5,
        status: 'approved',
        reason: 'Family vacation'
      },
      {
        id: 2,
        employee_name: 'John Smith',
        absence_type: 'sick_leave',
        start_date: '2024-01-20',
        end_date: '2024-01-22',
        total_days: 3,
        status: 'pending',
        reason: 'Medical appointment'
      }
    ];
  }

  async createAbsence(absenceData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...absenceData, id: Date.now(), created_at: new Date().toISOString() };
  }

  // Mock performance data
  async getPerformances() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        id: 1,
        employee_name: 'Sarah Johnson',
        review_date: '2024-01-15',
        overall_rating: 'Exceeds Expectations',
        performance_score: 4.2,
        reviewer: 'HR Director'
      },
      {
        id: 2,
        employee_name: 'John Smith',
        review_date: '2024-01-10',
        overall_rating: 'Outstanding',
        performance_score: 4.8,
        reviewer: 'Engineering Manager'
      }
    ];
  }

  async createPerformance(performanceData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...performanceData, id: Date.now(), created_at: new Date().toISOString() };
  }

  // Mock training data
  async getTrainings() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        id: 1,
        employee_name: 'Emma Davis',
        title: 'Advanced Sales Techniques',
        training_type: 'external',
        start_date: '2024-01-15',
        end_date: '2024-01-17',
        status: 'completed',
        score: 92
      },
      {
        id: 2,
        employee_name: 'John Smith',
        title: 'React Development',
        training_type: 'online',
        start_date: '2024-01-20',
        end_date: '2024-02-20',
        status: 'in_progress',
        progress: 65
      }
    ];
  }

  async createTraining(trainingData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...trainingData, id: Date.now(), created_at: new Date().toISOString() };
  }

  // Mock document data
  async getDocuments() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        id: 1,
        employee_name: 'Sarah Johnson',
        title: 'Employment Contract',
        document_type: 'contract',
        status: 'active',
        expiry_date: '2025-01-15',
        file_size: '2.5 MB'
      },
      {
        id: 2,
        employee_name: 'John Smith',
        title: 'Performance Review',
        document_type: 'review',
        status: 'active',
        created_date: '2024-01-10',
        file_size: '1.2 MB'
      }
    ];
  }

  async createDocument(documentData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...documentData, id: Date.now(), created_at: new Date().toISOString() };
  }

  // Helper methods
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

const mockApiService = new MockApiService();
export default mockApiService;
