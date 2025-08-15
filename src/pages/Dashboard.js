import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BookOpen,
  UserPlus,
  Plane,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import apiService from '../services/mockApiService';
import EmployeeForm from '../components/EmployeeForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_employees: 0,
    pending_onboarding: 0,
    active_employees: 0,
    pending_absences: 0,
    expiring_documents: 0,
    expiring_training: 0,
  });

  const [alerts, setAlerts] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardStats = await apiService.getDashboardStats();
      
      setStats({
        total_employees: dashboardStats.total_employees,
        pending_onboarding: 0, // Will be calculated from onboarding data
        active_employees: dashboardStats.active_employees,
        pending_absences: dashboardStats.pending_absences,
        expiring_documents: 0, // Will be calculated from document data
        expiring_training: 0, // Will be calculated from training data
      });

      setDepartmentData(dashboardStats.department_distribution);

      // Generate alerts based on real data
      const newAlerts = [];
      
      if (dashboardStats.pending_absences > 0) {
        newAlerts.push({
          id: 1,
          type: 'info',
          title: 'Pending Absence Approvals',
          message: `${dashboardStats.pending_absences} absence requests require approval`,
          time: 'Just now',
        });
      }

      if (dashboardStats.total_employees > 0) {
        newAlerts.push({
          id: 2,
          type: 'success',
          title: 'System Active',
          message: `${dashboardStats.active_employees} active employees in the system`,
          time: 'Just now',
        });
      }

      // Add more realistic alerts
      newAlerts.push({
        id: 3,
        type: 'warning',
        title: 'Documents Expiring Soon',
        message: '3 employee documents expire within 30 days',
        time: '2 hours ago',
      });

      newAlerts.push({
        id: 4,
        type: 'info',
        title: 'Training Completion',
        message: 'Emma Davis completed React Development course',
        time: '4 hours ago',
      });

      setAlerts(newAlerts);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to mock data if API fails
      setStats({
        total_employees: 150,
        pending_onboarding: 5,
        active_employees: 140,
        pending_absences: 8,
        expiring_documents: 3,
        expiring_training: 12,
      });
      setDepartmentData([
        { name: 'Engineering', count: 45, color: '#3b82f6' },
        { name: 'Sales', count: 30, color: '#10b981' },
        { name: 'Marketing', count: 25, color: '#f59e0b' },
        { name: 'HR', count: 8, color: '#ef4444' },
        { name: 'Finance', count: 12, color: '#8b5cf6' },
        { name: 'Operations', count: 30, color: '#06b6d4' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = () => {
    setShowEmployeeForm(true);
  };

  const handleEmployeeFormSubmit = async () => {
    setShowEmployeeForm(false);
    // Refresh dashboard data to show new employee
    await loadDashboardData();
    // Show success message
    alert('Employee added successfully! Dashboard has been updated.');
  };

  const handleEmployeeFormCancel = () => {
    setShowEmployeeForm(false);
  };

  const monthlyHires = [
    { month: 'Jan', hires: 12 },
    { month: 'Feb', hires: 8 },
    { month: 'Mar', hires: 15 },
    { month: 'Apr', hires: 10 },
    { month: 'May', hires: 18 },
    { month: 'Jun', hires: 22 },
    { month: 'Jul', hires: 14 },
    { month: 'Aug', hires: 16 },
  ];

  const StatCard = ({ title, value, icon: Icon, color, change, changeType }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`stat-card ${color} group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm font-medium ${
              changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
            }`}>
              {changeType === 'positive' ? '+' : ''}{change}
            </p>
          )}
        </div>
        <div className={`p-2 lg:p-3 rounded-full ${color === 'primary' ? 'bg-primary-100' : 
          color === 'success' ? 'bg-success-100' : 
          color === 'warning' ? 'bg-warning-100' : 'bg-danger-100'}`}>
          <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${
            color === 'primary' ? 'text-primary-600' : 
            color === 'success' ? 'text-success-600' : 
            color === 'warning' ? 'text-warning-600' : 'text-danger-600'
          }`} />
        </div>
      </div>
    </motion.div>
  );

  const AlertCard = ({ alert }) => {
    const getIcon = (type) => {
      switch (type) {
        case 'warning':
          return <AlertTriangle className="w-4 h-4 text-warning-600" />;
        case 'success':
          return <CheckCircle className="w-4 h-4 text-success-600" />;
        case 'info':
          return <Clock className="w-4 h-4 text-primary-600" />;
        default:
          return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      }
    };

    const getBgColor = (type) => {
      switch (type) {
        case 'warning':
          return 'bg-warning-50 border-warning-200';
        case 'success':
          return 'bg-success-50 border-success-200';
        case 'info':
          return 'bg-primary-50 border-primary-200';
        default:
          return 'bg-gray-50 border-gray-200';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-3 lg:p-4 rounded-lg border ${getBgColor(alert.type)}`}
      >
        <div className="flex items-start space-x-3">
          {getIcon(alert.type)}
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 mb-1">{alert.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
            <p className="text-xs text-gray-500">{alert.time}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your HR system.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-secondary text-sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={handleAddEmployee}
            className="btn-primary text-sm"
          >
            <Users className="w-4 h-4 mr-2" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Total Employees"
          value={stats.total_employees}
          icon={Users}
          color="primary"
          change="+12"
          changeType="positive"
        />
        <StatCard
          title="Active Employees"
          value={stats.active_employees}
          icon={CheckCircle}
          color="success"
          change="+5"
          changeType="positive"
        />
        <StatCard
          title="Pending Onboarding"
          value={stats.pending_onboarding}
          icon={Clock}
          color="warning"
          change="-2"
          changeType="positive"
        />
        <StatCard
          title="Expiring Documents"
          value={stats.expiring_documents}
          icon={AlertTriangle}
          color="danger"
          change="+1"
          changeType="negative"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                innerRadius={35}
                fill="#8884d8"
                dataKey="count"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Hires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Hires</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyHires}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hires" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Alerts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleAddEmployee}
              className="p-3 lg:p-4 bg-primary-50 hover:bg-primary-100 rounded-lg border border-primary-200 transition-colors duration-200"
            >
              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-primary-700">Add Employee</span>
            </button>
            <button 
              onClick={() => navigate('/holidays')}
              className="p-3 lg:p-4 bg-success-50 hover:bg-success-100 rounded-lg border border-success-200 transition-colors duration-200"
            >
              <Plane className="w-5 h-5 lg:w-6 lg:h-6 text-success-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-success-700">Request Holiday</span>
            </button>
            <button 
              onClick={() => navigate('/onboarding')}
              className="p-3 lg:p-4 bg-warning-50 hover:bg-warning-100 rounded-lg border border-warning-200 transition-colors duration-200"
            >
              <UserPlus className="w-5 h-5 lg:w-6 lg:h-6 text-warning-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-warning-700">Manage Onboarding</span>
            </button>
            <button 
              onClick={() => navigate('/absences')}
              className="p-3 lg:p-4 bg-danger-50 hover:bg-danger-100 rounded-lg border border-danger-200 transition-colors duration-200"
            >
              <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-danger-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-danger-700">Report Absence</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Employee Form Modal */}
      {showEmployeeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <EmployeeForm
              onSubmit={handleEmployeeFormSubmit}
              onCancel={handleEmployeeFormCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
