import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  Filter,
  Eye,
  Printer,
  Share2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const reportTypes = [
    {
      id: 'compliance',
      name: 'Compliance Report',
      description: 'UK employment law compliance and statutory requirements',
      icon: FileText,
      color: 'primary',
    },
    {
      id: 'workforce',
      name: 'Workforce Analytics',
      description: 'Employee demographics, turnover, and retention metrics',
      icon: Users,
      color: 'success',
    },
    {
      id: 'performance',
      name: 'Performance Summary',
      description: 'Performance review outcomes and goal achievement rates',
      icon: TrendingUp,
      color: 'warning',
    },
    {
      id: 'training',
      name: 'Training Compliance',
      description: 'Mandatory training completion and certification status',
      icon: BarChart3,
      color: 'danger',
    },
    {
      id: 'absence',
      name: 'Absence Analysis',
      description: 'Leave patterns, sickness trends, and absence costs',
      icon: Calendar,
      color: 'info',
    },
    {
      id: 'costs',
      name: 'Cost Analysis',
      description: 'Salary costs, benefits, and HR operational expenses',
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  const workforceData = [
    { month: 'Jan', hires: 12, terminations: 3, net: 9 },
    { month: 'Feb', hires: 8, terminations: 2, net: 6 },
    { month: 'Mar', hires: 15, terminations: 1, net: 14 },
    { month: 'Apr', hires: 10, terminations: 4, net: 6 },
    { month: 'May', hires: 18, terminations: 2, net: 16 },
    { month: 'Jun', hires: 22, terminations: 3, net: 19 },
    { month: 'Jul', hires: 14, terminations: 1, net: 13 },
    { month: 'Aug', hires: 16, terminations: 2, net: 14 },
  ];

  const departmentData = [
    { name: 'Engineering', count: 45, percentage: 30 },
    { name: 'Sales', count: 30, percentage: 20 },
    { name: 'Marketing', count: 25, percentage: 17 },
    { name: 'HR', count: 8, percentage: 5 },
    { name: 'Finance', count: 12, percentage: 8 },
    { name: 'Operations', count: 30, percentage: 20 },
  ];

  const performanceData = [
    { rating: '5 - Excellent', count: 25, percentage: 17 },
    { rating: '4 - Good', count: 65, percentage: 43 },
    { rating: '3 - Average', count: 45, percentage: 30 },
    { rating: '2 - Below Average', count: 12, percentage: 8 },
    { rating: '1 - Poor', count: 3, percentage: 2 },
  ];

  const getColorClass = (color) => {
    const colorMap = {
      primary: 'bg-primary-100 text-primary-800 border-primary-200',
      success: 'bg-success-100 text-success-800 border-success-200',
      warning: 'bg-warning-100 text-warning-800 border-warning-200',
      danger: 'bg-danger-100 text-danger-800 border-danger-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const generateReport = () => {
    if (!selectedReport) {
      alert('Please select a report type');
      return;
    }
    
    // In a real app, this would call the backend API
    console.log('Generating report:', {
      type: selectedReport,
      startDate,
      endDate,
      format: selectedFormat,
    });
    
    alert(`Generating ${selectedReport} report in ${selectedFormat.toUpperCase()} format...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive reports and analyse HR data insights.</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button className="btn-primary">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Report Generation */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="input-field"
            >
              <option value="">Select Report Type</option>
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="input-field"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={generateReport}
            disabled={!selectedReport}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`card border-l-4 ${getColorClass(report.color)} cursor-pointer hover:shadow-medium transition-shadow duration-200`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Icon className={`w-6 h-6 mr-2 ${
                      report.color === 'primary' ? 'text-primary-600' : 
                      report.color === 'success' ? 'text-success-600' : 
                      report.color === 'warning' ? 'text-warning-600' : 
                      report.color === 'danger' ? 'text-danger-600' : 
                      report.color === 'info' ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                    <h4 className="text-lg font-semibold text-gray-900">{report.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-success-600 transition-colors duration-200">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workforce Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workforce Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workforceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hires" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="terminations" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="count"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Performance Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Rating Distribution</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, 'Count']}
                labelFormatter={(label) => `Rating: ${label}`}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="space-y-3">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.rating}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;


