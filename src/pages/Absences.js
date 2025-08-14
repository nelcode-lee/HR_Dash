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
  Activity,
  Heart,
  Shield,
} from 'lucide-react';
import LeaveCalendar from '../components/LeaveCalendar';

const Absences = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'

  const absences = [
    {
      id: 1,
      employee_name: 'Emma Wilson',
      employee_email: 'emma.wilson@company.com',
      department: 'HR',
      absence_type: 'sick_leave',
      start_date: '2025-08-15',
      end_date: '2025-08-16',
      days_count: 2.0,
      reason: 'Not feeling well - flu symptoms',
      medical_note: 'Self-certified',
      approved: true,
      approved_by: 'HR System',
      approved_at: '2025-08-15T09:00:00Z',
      return_to_work_date: '2025-08-17',
      absence_category: 'illness',
    },
    {
      id: 2,
      employee_name: 'Michael Brown',
      employee_email: 'michael.brown@company.com',
      department: 'Sales',
      absence_type: 'sick_leave',
      start_date: '2025-08-20',
      end_date: '2025-08-25',
      days_count: 6.0,
      reason: 'Back injury - requires medical attention',
      medical_note: 'Doctor\'s note provided',
      approved: true,
      approved_by: 'Sarah Johnson',
      approved_at: '2025-08-20T10:00:00Z',
      return_to_work_date: '2025-08-26',
      absence_category: 'injury',
    },
    {
      id: 3,
      employee_name: 'David Taylor',
      employee_email: 'david.taylor@company.com',
      department: 'Finance',
      absence_type: 'compassionate',
      start_date: '2025-08-10',
      end_date: '2025-08-10',
      days_count: 1.0,
      reason: 'Family emergency - bereavement',
      medical_note: 'Compassionate leave',
      approved: true,
      approved_by: 'Emma Wilson',
      approved_at: '2025-08-09T16:00:00Z',
      return_to_work_date: '2025-08-11',
      absence_category: 'bereavement',
    },
    {
      id: 4,
      employee_name: 'Sarah Johnson',
      employee_email: 'sarah.johnson@company.com',
      department: 'Marketing',
      absence_type: 'maternity',
      start_date: '2025-08-01',
      end_date: '2025-11-30',
      days_count: 90,
      reason: 'Maternity leave',
      medical_note: 'MatB1 certificate provided',
      approved: true,
      approved_by: 'HR System',
      approved_at: '2025-07-15T14:00:00Z',
      return_to_work_date: '2025-12-01',
      absence_category: 'maternity',
    },
    {
      id: 5,
      employee_name: 'John Smith',
      employee_email: 'john.smith@company.com',
      department: 'Engineering',
      absence_type: 'medical_appointment',
      start_date: '2025-08-22',
      end_date: '2025-08-22',
      days_count: 0.5,
      reason: 'Dental appointment',
      medical_note: 'Medical appointment',
      approved: true,
      approved_by: 'Manager',
      approved_at: '2025-08-21T09:00:00Z',
      return_to_work_date: '2025-08-22',
      absence_category: 'appointment',
    },
  ];

  const absenceTypes = ['All', 'sick_leave', 'medical_appointment', 'maternity', 'paternity', 'compassionate', 'bereavement'];
  const statuses = ['All', 'approved', 'pending', 'rejected'];
  const absenceCategories = ['All', 'illness', 'injury', 'maternity', 'appointment', 'bereavement'];

  const filteredAbsences = absences.filter(absence => {
    const matchesSearch = 
      absence.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      absence.employee_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      absence.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || selectedType === 'All' || 
      absence.absence_type === selectedType;
    
    const matchesStatus = selectedStatus === '' || selectedStatus === 'All' || 
      (selectedStatus === 'approved' && absence.approved) ||
      (selectedStatus === 'pending' && !absence.approved);

    return matchesSearch && matchesType && matchesStatus;
  });

  const getAbsenceTypeBadge = (type) => {
    const typeConfig = {
      sick_leave: 'bg-red-100 text-red-800 border-red-200',
      medical_appointment: 'bg-blue-100 text-blue-800 border-blue-200',
      maternity: 'bg-pink-100 text-pink-800 border-pink-200',
      paternity: 'bg-purple-100 text-purple-800 border-purple-200',
      compassionate: 'bg-orange-100 text-orange-800 border-orange-200',
      bereavement: 'bg-gray-100 text-gray-800 border-gray-200',
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

  const getAbsenceTypeIcon = (type) => {
    switch (type) {
      case 'sick_leave':
        return <Activity className="w-4 h-4 text-red-600" />;
      case 'medical_appointment':
        return <Heart className="w-4 h-4 text-blue-600" />;
      case 'maternity':
        return <Heart className="w-4 h-4 text-pink-600" />;
      case 'paternity':
        return <Shield className="w-4 h-4 text-purple-600" />;
      case 'compassionate':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'bereavement':
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAbsenceCategoryBadge = (category) => {
    const categoryConfig = {
      illness: 'bg-red-50 text-red-700 border-red-200',
      injury: 'bg-orange-50 text-orange-700 border-orange-200',
      maternity: 'bg-pink-50 text-pink-700 border-pink-200',
      appointment: 'bg-blue-50 text-blue-700 border-blue-200',
      bereavement: 'bg-gray-50 text-gray-700 border-gray-200',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
        categoryConfig[category] || 'bg-gray-50 text-gray-700 border-gray-200'
      }`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Absences</h1>
          <p className="text-gray-600">Manage sick leave, medical appointments, and other non-holiday absences.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Report Absence
        </button>
      </div>

      {/* Absence Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card danger">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Absences</p>
              <p className="text-2xl font-bold text-gray-900">{absences.length}</p>
            </div>
            <div className="p-3 rounded-full bg-danger-100">
              <Activity className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Sick Leave</p>
              <p className="text-2xl font-bold text-gray-900">
                {absences.filter(a => a.absence_type === 'sick_leave').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-warning-100">
              <Activity className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Medical Appointments</p>
              <p className="text-2xl font-bold text-gray-900">
                {absences.filter(a => a.absence_type === 'medical_appointment').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">
                {absences.reduce((total, a) => total + a.days_count, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-success-100">
              <Calendar className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'table'
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'calendar'
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar View</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <>
          {/* Filters and Search */}
          <div className="card">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees, reasons..."
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
                  {absenceTypes.slice(1).map(type => (
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
              </div>
            </div>
          </div>

          {/* Absences Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Absence Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medical Info
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
                  {filteredAbsences.map((absence) => (
                    <motion.tr
                      key={absence.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-medium text-sm">
                              {absence.employee_name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {absence.employee_name}
                            </div>
                            <div className="text-sm text-gray-500">{absence.employee_email}</div>
                            <div className="text-xs text-gray-400">{absence.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(absence.start_date).toLocaleDateString('en-GB')} - {new Date(absence.end_date).toLocaleDateString('en-GB')}
                          </div>
                          <div className="text-sm text-gray-500">{absence.days_count} days</div>
                          <div className="text-xs text-gray-400">{absence.reason}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Return: {new Date(absence.return_to_work_date).toLocaleDateString('en-GB')}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getAbsenceTypeIcon(absence.absence_type)}
                          <span className="ml-2">{getAbsenceTypeBadge(absence.absence_type)}</span>
                        </div>
                        <div className="mt-1">
                          {getAbsenceCategoryBadge(absence.absence_category)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{absence.medical_note}</div>
                          {absence.absence_type === 'sick_leave' && absence.days_count > 7 && (
                            <div className="text-xs text-warning-600 mt-1">
                              Requires doctor's note
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(absence.approved)}
                        {absence.approved && (
                          <div className="text-xs text-gray-500 mt-1">
                            Approved by {absence.approved_by}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {!absence.approved && (
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
                  ))}
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
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAbsences.length}</span> of{' '}
                    <span className="font-medium">{absences.length}</span> results
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
        </>
      ) : (
        <LeaveCalendar />
      )}
    </div>
  );
};

export default Absences;
