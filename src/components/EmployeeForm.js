import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Building, Calendar, Phone, MapPin, Pound, Briefcase } from 'lucide-react';
import apiService from '../services/api';

const EmployeeForm = ({ employee = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    address: '',
    hire_date: '',
    position: '',
    salary: '',
    employment_type: 'Full-time',
    department_id: '',
    manager_id: ''
  });

  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (employee) {
      setFormData({
        employee_id: employee.employee_id || '',
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        date_of_birth: employee.date_of_birth ? new Date(employee.date_of_birth).toISOString().split('T')[0] : '',
        gender: employee.gender || '',
        phone: employee.phone || '',
        address: employee.address || '',
        hire_date: employee.hire_date ? new Date(employee.hire_date).toISOString().split('T')[0] : '',
        position: employee.position || '',
        salary: employee.salary || '',
        employment_type: employee.employment_type || 'Full-time',
        department_id: employee.department_id || '',
        manager_id: employee.manager_id || ''
      });
    }
    loadDepartments();
    loadManagers();
  }, [employee]);

  const loadDepartments = async () => {
    try {
      const depts = await apiService.getDepartments();
      setDepartments(depts);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  };

  const loadManagers = async () => {
    try {
      const employees = await apiService.getEmployees();
      const managers = employees.filter(emp => emp.is_active);
      setManagers(managers);
    } catch (error) {
      console.error('Error loading managers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        salary: formData.salary ? parseFloat(formData.salary) : null,
        department_id: formData.department_id ? parseInt(formData.department_id) : null,
        manager_id: formData.manager_id ? parseInt(formData.manager_id) : null
      };

      if (employee) {
        await apiService.updateEmployee(employee.id, submitData);
      } else {
        await apiService.createEmployee(submitData);
      }
      
      onSubmit();
    } catch (error) {
      setError(error.message || 'An error occurred while saving the employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee ID and Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Employee ID *
            </label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="EMP001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type *
            </label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              className="input-field w-full"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="John"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-field w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-2" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="+44 20 7123 4567"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field w-full"
            rows="3"
            placeholder="123 Business Street, London, UK"
          />
        </div>

        {/* Employment Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Hire Date *
            </label>
            <input
              type="date"
              name="hire_date"
              value={formData.hire_date}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline w-4 h-4 mr-2" />
              Position *
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="Software Engineer"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Pound className="inline w-4 h-4 mr-2" />
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="45000"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        {/* Department and Manager */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="inline w-4 h-4 mr-2" />
              Department
            </label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="input-field w-full"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Manager
            </label>
            <select
              name="manager_id"
              value={formData.manager_id}
              onChange={handleChange}
              className="input-field w-full"
            >
              <option value="">Select Manager</option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {manager.first_name} {manager.last_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Saving...' : (employee ? 'Update Employee' : 'Add Employee')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmployeeForm;
