import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  Award,
  Calendar,
} from 'lucide-react';

const Training = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMandatory, setSelectedMandatory] = useState('');
  const [selectedExpiring, setSelectedExpiring] = useState('');

  const trainingRecords = [
    {
      id: 1,
      employee_name: 'John Smith',
      employee_email: 'john.smith@company.com',
      training_name: 'Health & Safety Awareness',
      provider: 'SafetyFirst Training Ltd',
      completion_date: '2025-01-15',
      expiry_date: '2026-01-15',
      certificate_number: 'HS2025001',
      mandatory: true,
      status: 'valid',
    },
    {
      id: 2,
      employee_name: 'Emma Wilson',
      employee_email: 'emma.wilson@company.com',
      training_name: 'GDPR Compliance',
      provider: 'Legal Training Solutions',
      completion_date: '2024-11-20',
      expiry_date: '2025-11-20',
      certificate_number: 'GDPR2024001',
      mandatory: true,
      status: 'expiring_soon',
    },
    {
      id: 3,
      employee_name: 'Michael Brown',
      employee_email: 'michael.brown@company.com',
      training_name: 'Advanced Excel',
      provider: 'TechSkills Academy',
      completion_date: '2025-08-10',
      expiry_date: null,
      certificate_number: 'EXC2025789',
      mandatory: false,
      status: 'valid',
    },
    {
      id: 4,
      employee_name: 'David Taylor',
      employee_email: 'david.taylor@company.com',
      training_name: 'First Aid at Work',
      provider: 'St John Ambulance',
      completion_date: '2024-06-15',
      expiry_date: '2025-06-15',
      certificate_number: 'FA2024001',
      mandatory: true,
      status: 'expired',
    },
    {
      id: 5,
      employee_name: 'Sarah Johnson',
      employee_email: 'sarah.johnson@company.com',
      training_name: 'Leadership Skills',
      provider: 'Management Development Institute',
      completion_date: '2025-03-01',
      expiry_date: null,
      certificate_number: 'LS2025001',
      mandatory: false,
      status: 'valid',
    },
  ];

  const mandatoryOptions = ['All', 'true', 'false'];
  const expiringOptions = ['All', 'true', 'false'];

  const filteredTraining = trainingRecords.filter(record => {
    const matchesSearch = 
      record.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.training_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMandatory = selectedMandatory === '' || selectedMandatory === 'All' || 
      record.mandatory.toString() === selectedMandatory;
    
    const matchesExpiring = selectedExpiring === '' || selectedExpiring === 'All' || 
      (selectedExpiring === 'true' && record.status === 'expiring_soon') ||
      (selectedExpiring === 'false' && record.status !== 'expiring_soon');

    return matchesSearch && matchesMandatory && matchesExpiring;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      valid: 'bg-success-100 text-success-800 border-success-200',
      expiring_soon: 'bg-warning-100 text-warning-800 border-warning-200',
      expired: 'bg-danger-100 text-danger-800 border-danger-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        statusConfig[status] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}>
        {status === 'valid' ? 'Valid' : 
         status === 'expiring_soon' ? 'Expiring Soon' : 'Expired'}
      </span>
    );
  };

  const getMandatoryBadge = (mandatory) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      mandatory 
        ? 'bg-primary-100 text-primary-800 border border-primary-200' 
        : 'bg-gray-100 text-gray-800 border border-gray-200'
    }`}>
      {mandatory ? 'Mandatory' : 'Optional'}
    </span>
  );

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryIcon = (status) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'expiring_soon':
        return <Clock className="w-4 h-4 text-warning-600" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4 text-danger-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training & Certifications</h1>
          <p className="text-gray-600">Manage employee training records and track mandatory training compliance.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Training Record
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search training records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedMandatory}
              onChange={(e) => setSelectedMandatory(e.target.value)}
              className="input-field min-w-[150px]"
            >
              {mandatoryOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All Training' : 
                   option === 'true' ? 'Mandatory Only' : 'Optional Only'}
                </option>
              ))}
            </select>
            
            <select
              value={selectedExpiring}
              onChange={(e) => setSelectedExpiring(e.target.value)}
              className="input-field min-w-[150px]"
            >
              {expiringOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All Statuses' : 
                   option === 'true' ? 'Expiring Soon' : 'Valid'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Training Records Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTraining.map((record) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-sm">
                          {record.employee_name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.employee_name}
                        </div>
                        <div className="text-sm text-gray-500">{record.employee_email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.training_name}</div>
                      <div className="text-sm text-gray-500">{record.provider}</div>
                      <div className="text-xs text-gray-400">Cert: {record.certificate_number}</div>
                      <div className="text-xs text-gray-400">
                        Completed: {new Date(record.completion_date).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getMandatoryBadge(record.mandatory)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getExpiryIcon(record.status)}
                      <span className="ml-2">{getStatusBadge(record.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.expiry_date ? (
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(record.expiry_date).toLocaleDateString('en-GB')}
                        </div>
                        {record.status === 'expiring_soon' && (
                          <div className="text-xs text-warning-600 font-medium">
                            {getDaysUntilExpiry(record.expiry_date)} days left
                          </div>
                        )}
                        {record.status === 'expired' && (
                          <div className="text-xs text-danger-600 font-medium">
                            Expired {Math.abs(getDaysUntilExpiry(record.expiry_date))} days ago
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No expiry</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                        <BookOpen className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-warning-600 transition-colors duration-200">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-success-600 transition-colors duration-200">
                        <Award className="w-4 h-4" />
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTraining.length}</span> of{' '}
                <span className="font-medium">{trainingRecords.length}</span> results
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

export default Training;


