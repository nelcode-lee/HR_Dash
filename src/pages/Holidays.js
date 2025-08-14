import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Table,
  MapPin,
  Users,
  TrendingUp,
  FileText,
} from 'lucide-react';

const Holidays = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');

  const holidays = [
    {
      id: 1,
      employee_name: 'John Smith',
      employee_email: 'john.smith@company.com',
      department: 'Engineering',
      holiday_type: 'annual_leave',
      start_date: '2025-08-20',
      end_date: '2025-08-24',
      days_count: 5.0,
      reason: 'Summer holiday',
      destination: 'Spain',
      approved: true,
      approved_by: 'Sarah Johnson',
      approved_at: '2025-08-01T10:00:00Z',
      remaining_annual_leave: 18,
      total_annual_leave: 25,
    },
    {
      id: 2,
      employee_name: 'Emma Wilson',
      employee_email: 'emma.wilson@company.com',
      department: 'HR',
      holiday_type: 'annual_leave',
      start_date: '2025-09-15',
      end_date: '2025-09-19',
      days_count: 5.0,
      reason: 'Family holiday',
      destination: 'Scotland',
      approved: true,
      approved_by: 'HR System',
      approved_at: '2025-09-01T09:00:00Z',
      remaining_annual_leave: 20,
      total_annual_leave: 25,
    },
    {
      id: 3,
      employee_name: 'Michael Brown',
      employee_email: 'michael.brown@company.com',
      department: 'Sales',
      holiday_type: 'annual_leave',
      start_date: '2025-10-15',
      end_date: '2025-10-17',
      days_count: 3.0,
      reason: 'Long weekend break',
      destination: 'London',
      approved: false,
      approved_by: null,
      approved_at: null,
      remaining_annual_leave: 22,
      total_annual_leave: 25,
    },
    {
      id: 4,
      employee_name: 'Sarah Johnson',
      employee_email: 'sarah.johnson@company.com',
      department: 'Marketing',
      holiday_type: 'bank_holiday',
      start_date: '2025-05-05',
      end_date: '2025-05-05',
      days_count: 1.0,
      reason: 'Early May Bank Holiday',
      destination: null,
      approved: true,
      approved_by: 'System',
      approved_at: '2025-01-01T00:00:00Z',
      remaining_annual_leave: 25,
      total_annual_leave: 25,
    },
    {
      id: 5,
      employee_name: 'David Taylor',
      employee_email: 'david.taylor@company.com',
      department: 'Finance',
      holiday_type: 'annual_leave',
      start_date: '2025-12-23',
      end_date: '2025-12-31',
      days_count: 7.0,
      reason: 'Christmas and New Year',
      destination: 'Home',
      approved: true,
      approved_by: 'Emma Wilson',
      approved_at: '2025-11-01T14:00:00Z',
      remaining_annual_leave: 18,
      total_annual_leave: 25,
    },
  ];

  const holidayTypes = ['All', 'annual_leave', 'bank_holiday', 'compassionate', 'study_leave', 'sabbatical'];
  const statuses = ['All', 'approved', 'pending', 'rejected'];
  const years = ['2024', '2025', '2026'];

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = 
      holiday.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.employee_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (holiday.destination && holiday.destination.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === '' || selectedType === 'All' || 
      holiday.holiday_type === selectedType;
    
    const matchesStatus = selectedStatus === '' || selectedStatus === 'All' || 
      (selectedStatus === 'approved' && holiday.approved) ||
      (selectedStatus === 'pending' && !holiday.approved);

    const matchesYear = selectedYear === '' || 
      new Date(holiday.start_date).getFullYear().toString() === selectedYear;

    return matchesSearch && matchesType && matchesStatus && matchesYear;
  });

  const getHolidayTypeBadge = (type) => {
    const typeConfig = {
      annual_leave: 'bg-blue-100 text-blue-800 border-blue-200',
      bank_holiday: 'bg-purple-100 text-purple-800 border-purple-200',
      compassionate: 'bg-orange-100 text-orange-800 border-orange-200',
      study_leave: 'bg-green-100 text-green-800 border-green-200',
      sabbatical: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        typeConfig[type] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}>
        {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const getStatusBadge = (approved) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
      approved 
        ? 'bg-success-100 text-success-800 border-success-200' 
        : 'bg-warning-100 text-warning-800 border-warning-200'
    }`}>
      {approved ? 'Approved' : 'Pending'}
    </span>
  );

  const getHolidayTypeIcon = (type) => {
    switch (type) {
      case 'annual_leave':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'bank_holiday':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'compassionate':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'study_leave':
        return <FileText className="w-4 h-4 text-green-600" />;
      case 'sabbatical':
        return <TrendingUp className="w-4 h-4 text-indigo-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAnnualLeaveProgress = (remaining, total) => {
    const used = total - remaining;
    const percentage = (used / total) * 100;
    return { used, total, percentage };
  };

  const getAnnualLeaveProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-danger-500';
    if (percentage >= 60) return 'bg-warning-500';
    return 'bg-success-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Holidays</h1>
          <p className="text-gray-600">Manage annual leave, bank holidays, and planned time off.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Request Holiday
        </button>
      </div>

      {/* Holiday Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Holidays</p>
              <p className="text-2xl font-bold text-gray-900">{holidays.length}</p>
            </div>
            <div className="p-3 rounded-full bg-primary-100">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {holidays.filter(h => h.approved).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-success-100">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {holidays.filter(h => !h.approved).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-warning-100">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">
                {holidays.reduce((total, h) => total + h.days_count, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees, destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field min-w-[150px]"
            >
              <option value="">All Types</option>
              {holidayTypes.slice(1).map(type => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field min-w-[150px]"
            >
              <option value="">All Statuses</option>
              {statuses.slice(1).map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-field min-w-[120px]"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Holidays Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holiday Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Leave
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHolidays.map((holiday) => {
                const leaveProgress = getAnnualLeaveProgress(holiday.remaining_annual_leave, holiday.total_annual_leave);
                
                return (
                  <motion.tr
                    key={holiday.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {holiday.employee_name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {holiday.employee_name}
                          </div>
                          <div className="text-sm text-gray-500">{holiday.employee_email}</div>
                          <div className="text-xs text-gray-400">{holiday.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(holiday.start_date).toLocaleDateString('en-GB')} - {new Date(holiday.end_date).toLocaleDateString('en-GB')}
                        </div>
                        <div className="text-sm text-gray-500">{holiday.days_count} days</div>
                        <div className="text-xs text-gray-400">{holiday.reason}</div>
                        {holiday.destination && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {holiday.destination}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getHolidayTypeIcon(holiday.holiday_type)}
                        <span className="ml-2">{getHolidayTypeBadge(holiday.holiday_type)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {holiday.holiday_type === 'annual_leave' ? (
                        <div>
                          <div className="text-sm text-gray-900">
                            {leaveProgress.used}/{leaveProgress.total} days used
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getAnnualLeaveProgressColor(leaveProgress.percentage)}`}
                              style={{ width: `${leaveProgress.percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {holiday.remaining_annual_leave} days remaining
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">N/A</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(holiday.approved)}
                      {holiday.approved && (
                        <div className="text-xs text-gray-500 mt-1">
                          Approved by {holiday.approved_by}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {!holiday.approved && (
                          <>
                            <button className="p-1 text-gray-400 hover:text-success-600 transition-colors duration-200">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-danger-600 transition-colors duration-200">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="btn-secondary">Previous</button>
            <button className="btn-secondary">Next</button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredHolidays.length}</span> of{' '}
                <span className="font-medium">{holidays.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="btn-secondary rounded-l-md">Previous</button>
                <button className="btn-secondary rounded-r-md">Next</button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holidays;


