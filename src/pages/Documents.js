import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  Plus,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import AIDocumentAnalysis from '../components/AIDocumentAnalysis';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  const documents = [
    {
      id: 1,
      name: 'Employment Contract - John Smith.pdf',
      type: 'employment_contract',
      status: 'verified',
      employee: 'John Smith',
      upload_date: '2025-01-15',
      expiry_date: null,
      size: '245 KB',
      verified_by: 'HR Team',
      verified_at: '2025-01-16T10:00:00Z',
    },
    {
      id: 2,
      name: 'Right to Work - Emma Wilson.pdf',
      type: 'right_to_work',
      status: 'verified',
      employee: 'Emma Wilson',
      upload_date: '2025-01-10',
      expiry_date: '2030-05-15',
      size: '156 KB',
      verified_by: 'HR Team',
      verified_at: '2025-01-11T14:00:00Z',
    },
    {
      id: 3,
      name: 'DBS Certificate - Michael Brown.pdf',
      type: 'dbs_certificate',
      status: 'verified',
      employee: 'Michael Brown',
      upload_date: '2025-01-08',
      expiry_date: '2028-01-08',
      size: '189 KB',
      verified_by: 'HR Team',
      verified_at: '2025-01-09T09:00:00Z',
    },
    {
      id: 4,
      name: 'P45 - Sarah Johnson.pdf',
      type: 'p45',
      status: 'pending',
      employee: 'Sarah Johnson',
      upload_date: '2025-01-20',
      expiry_date: null,
      size: '98 KB',
      verified_by: null,
      verified_at: null,
    },
    {
      id: 5,
      name: 'Bank Details - David Taylor.pdf',
      type: 'bank_details',
      status: 'verified',
      employee: 'David Taylor',
      upload_date: '2025-01-12',
      expiry_date: null,
      size: '67 KB',
      verified_by: 'HR Team',
      verified_at: '2025-01-13T11:00:00Z',
    },
  ];

  const documentTypes = ['All', 'employment_contract', 'right_to_work', 'dbs_certificate', 'p45', 'bank_details', 'other'];
  const statuses = ['All', 'verified', 'pending', 'expired', 'rejected'];

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = 
      document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.employee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || selectedType === 'All' || 
      document.type === selectedType;
    
    const matchesStatus = selectedStatus === '' || selectedStatus === 'All' || 
      document.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getDocumentTypeBadge = (type) => {
    const typeConfig = {
      employment_contract: 'bg-blue-100 text-blue-800 border-blue-200',
      right_to_work: 'bg-green-100 text-green-800 border-green-200',
      dbs_certificate: 'bg-purple-100 text-purple-800 border-purple-200',
      p45: 'bg-orange-100 text-orange-800 border-orange-200',
      bank_details: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        typeConfig[type] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}>
        {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: 'bg-success-100 text-success-800 border-success-200',
      pending: 'bg-warning-100 text-warning-800 border-warning-200',
      expired: 'bg-danger-100 text-danger-800 border-danger-200',
      rejected: 'bg-danger-100 text-danger-800 border-danger-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        statusConfig[status] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getDocumentTypeIcon = (type) => {
    switch (type) {
      case 'employment_contract':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'right_to_work':
        return <FileText className="w-4 h-4 text-green-600" />;
      case 'dbs_certificate':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'p45':
        return <FileText className="w-4 h-4 text-orange-600" />;
      case 'bank_details':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage employee documents, certificates, and compliance records.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAIAnalysis(!showAIAnalysis)}
            className="btn-secondary"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {showAIAnalysis ? 'Hide AI Analysis' : 'Show AI Analysis'}
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Upload Document
          </button>
        </div>
      </div>

      {/* AI Document Analysis Section */}
      {showAIAnalysis && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <AIDocumentAnalysis />
        </motion.div>
      )}

      {/* Document Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="p-3 rounded-full bg-primary-100">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Verified</p>
              <p className="text-2xl font-bold text-gray-900">
                {documents.filter(d => d.status === 'verified').length}
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
                {documents.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-warning-100">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">
                {documents.filter(d => d.expiry_date && new Date(d.expiry_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-danger-100">
              <AlertTriangle className="w-6 h-6 text-danger-600" />
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
                placeholder="Search documents, employees..."
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
              {documentTypes.slice(1).map(type => (
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

      {/* Documents Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((document) => (
                <motion.tr
                  key={document.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{document.name}</div>
                        <div className="text-sm text-gray-500">{document.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.employee}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDocumentTypeIcon(document.type)}
                      <span className="ml-2">{getDocumentTypeBadge(document.type)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(document.status)}
                    {document.verified_by && (
                      <div className="text-xs text-gray-500 mt-1">
                        Verified by {document.verified_by}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(document.upload_date).toLocaleDateString('en-GB')}
                    </div>
                    {document.expiry_date && (
                      <div className="text-xs text-gray-500">
                        Expires: {new Date(document.expiry_date).toLocaleDateString('en-GB')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-success-600 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-danger-600 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDocuments.length}</span> of{' '}
                <span className="font-medium">{documents.length}</span> results
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

export default Documents;
