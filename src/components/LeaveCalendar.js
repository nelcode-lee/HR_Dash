import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Users, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const LeaveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLeaveType, setSelectedLeaveType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data - in real app this would come from your API
  const leaveData = [
    {
      id: 1,
      employee_name: 'John Smith',
      employee_email: 'john.smith@company.com',
      department: 'Engineering',
      leave_type: 'annual_leave',
      start_date: '2025-08-20',
      end_date: '2025-08-24',
      days_count: 5,
      status: 'approved',
      color: 'bg-blue-500',
      text_color: 'text-blue-600',
      bg_color: 'bg-blue-50',
      border_color: 'border-blue-200',
    },
    {
      id: 2,
      employee_name: 'Emma Wilson',
      employee_email: 'emma.wilson@company.com',
      department: 'HR',
      leave_type: 'sick_leave',
      start_date: '2025-08-15',
      end_date: '2025-08-16',
      days_count: 2,
      status: 'approved',
      color: 'bg-red-500',
      text_color: 'text-red-600',
      bg_color: 'bg-red-50',
      border_color: 'border-red-200',
    },
    {
      id: 3,
      employee_name: 'Michael Brown',
      employee_email: 'michael.brown@company.com',
      department: 'Sales',
      leave_type: 'annual_leave',
      start_date: '2025-09-15',
      end_date: '2025-09-19',
      days_count: 5,
      status: 'pending',
      color: 'bg-yellow-500',
      text_color: 'text-yellow-600',
      bg_color: 'bg-yellow-50',
      border_color: 'border-yellow-200',
    },
    {
      id: 4,
      employee_name: 'Sarah Johnson',
      employee_email: 'sarah.johnson@company.com',
      department: 'Marketing',
      leave_type: 'maternity',
      start_date: '2025-08-01',
      end_date: '2025-11-30',
      days_count: 90,
      status: 'approved',
      color: 'bg-pink-500',
      text_color: 'text-pink-600',
      bg_color: 'bg-pink-50',
      border_color: 'border-pink-200',
    },
    {
      id: 5,
      employee_name: 'David Taylor',
      employee_email: 'david.taylor@company.com',
      department: 'Finance',
      leave_type: 'compassionate',
      start_date: '2025-08-10',
      end_date: '2025-08-10',
      days_count: 1,
      status: 'approved',
      color: 'bg-orange-500',
      text_color: 'text-orange-600',
      bg_color: 'bg-orange-50',
      border_color: 'border-orange-200',
    },
  ];

  const departments = ['all', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance'];
  const leaveTypes = [
    { value: 'all', label: 'All Leave Types', color: 'bg-gray-500' },
    { value: 'annual_leave', label: 'Annual Leave', color: 'bg-blue-500' },
    { value: 'sick_leave', label: 'Sick Leave', color: 'bg-red-500' },
    { value: 'maternity', label: 'Maternity', color: 'bg-pink-500' },
    { value: 'paternity', label: 'Paternity', color: 'bg-purple-500' },
    { value: 'compassionate', label: 'Compassionate', color: 'bg-orange-500' },
    { value: 'unpaid', label: 'Unpaid Leave', color: 'bg-gray-500' },
  ];

  const filteredLeave = useMemo(() => {
    return leaveData.filter(leave => {
      const matchesType = selectedLeaveType === 'all' || leave.leave_type === selectedLeaveType;
      const matchesDepartment = selectedDepartment === 'all' || leave.department === selectedDepartment;
      return matchesType && matchesDepartment;
    });
  }, [selectedLeaveType, selectedDepartment, leaveData]);

  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const getLeaveForDate = (date) => {
    return filteredLeave.filter(leave => {
      const leaveStart = new Date(leave.start_date);
      const leaveEnd = new Date(leave.end_date);
      return date >= leaveStart && date <= leaveEnd;
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: 'bg-success-100 text-success-800 border-success-200',
      pending: 'bg-warning-100 text-warning-800 border-warning-200',
      rejected: 'bg-danger-100 text-danger-800 border-danger-200',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
        statusConfig[status] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Calendar className="w-8 h-8 text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leave Calendar</h2>
            <p className="text-gray-600">Track all employee absences and leave patterns</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="text-lg font-semibold text-gray-900 min-w-[140px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Leave Type
            </label>
            <select
              value={selectedLeaveType}
              onChange={(e) => setSelectedLeaveType(e.target.value)}
              className="input-field"
            >
              {leaveTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input-field"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="card">
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Calendar Header */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{day}</span>
            </div>
          ))}
          
          {/* Calendar Days */}
          {calendarDays.map((day, index) => {
            const leaves = getLeaveForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div
                key={index}
                className={`min-h-[120px] bg-white p-2 ${
                  !isCurrentMonth ? 'bg-gray-50' : ''
                } ${isToday ? 'ring-2 ring-primary-500' : ''}`}
              >
                <div className="text-right mb-1">
                  <span className={`text-sm font-medium ${
                    !isCurrentMonth ? 'text-gray-400' : 
                    isToday ? 'text-primary-600' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </span>
                </div>
                
                {/* Leave Events */}
                <div className="space-y-1">
                  {leaves.map(leave => (
                    <motion.div
                      key={leave.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-1 rounded text-xs cursor-pointer transition-all duration-200 hover:scale-105 ${
                        leave.bg_color
                      } ${leave.border_color} border`}
                      title={`${leave.employee_name} - ${leave.leave_type.replace('_', ' ')}`}
                    >
                      <div className="font-medium text-gray-900 truncate">
                        {leave.employee_name}
                      </div>
                      <div className={`text-xs ${leave.text_color} capitalize`}>
                        {leave.leave_type.replace('_', ' ')}
                      </div>
                      {leave.status === 'pending' && (
                        <div className="mt-1">
                          {getStatusBadge(leave.status)}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Leave Type Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {leaveTypes.slice(1).map(type => (
            <div key={type.value} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${type.color}`}></div>
              <span className="text-sm text-gray-700 capitalize">
                {type.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Month Summary</h4>
          <div className="space-y-3">
            {leaveTypes.slice(1).map(type => {
              const count = filteredLeave.filter(leave => 
                leave.leave_type === type.value && 
                isSameMonth(new Date(leave.start_date), currentDate)
              ).length;
              
              if (count === 0) return null;
              
              return (
                <div key={type.value} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${type.color}`}></div>
                    <span className="text-sm text-gray-700 capitalize">
                      {type.label.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Leave</h4>
          <div className="space-y-3">
            {filteredLeave
              .filter(leave => new Date(leave.start_date) > new Date())
              .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
              .slice(0, 5)
              .map(leave => (
                <div key={leave.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{leave.employee_name}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {leave.leave_type.replace('_', ' ')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(leave.start_date), 'MMM d')} - {format(new Date(leave.end_date), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(leave.status)}
                    <div className="text-xs text-gray-500 mt-1">
                      {leave.days_count} day{leave.days_count !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
