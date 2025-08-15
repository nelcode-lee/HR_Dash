import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, FileText, Clock } from 'lucide-react';
import apiService from '../services/api';

const AbsenceForm = ({ absence = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    absence_type: 'annual_leave',
    start_date: '',
    end_date: '',
    total_days: '',
    reason: '',
    notes: ''
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (absence) {
      setFormData({
        employee_id: absence.employee_id || '',
        absence_type: absence.absence_type || 'annual_leave',
        start_date: absence.start_date ? new Date(absence.start_date).toISOString().split('T')[0] : '',
        end_date: absence.end_date ? new Date(absence.end_date).toISOString().split('T')[0] : '',
        total_days: absence.total_days || '',
        reason: absence.reason || '',
        notes: absence.notes || ''
      });
    }
    loadEmployees();
  }, [absence]);

  const loadEmployees = async () => {
    try {
      const emps = await apiService.getEmployees();
      setEmployees(emps.filter(emp => emp.is_active));
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate total days when dates change
    if (name === 'start_date' || name === 'end_date') {
      if (formData.start_date && formData.end_date) {
        const start = new Date(formData.start_date);
        const end = new Date(formData.end_date);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setFormData(prev => ({
          ...prev,
          total_days: diffDays
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        employee_id: parseInt(formData.employee_id),
        total_days: parseFloat(formData.total_days)
      };

      if (absence) {
        await apiService.updateAbsence(absence.id, submitData);
      } else {
        await apiService.createAbsence(submitData);
      }
      
      onSubmit();
    } catch (error) {
      setError(error.message || 'An error occurred while saving the absence');
    } finally {
      setLoading(false);
    }
  };

  const absenceTypes = [
    { value: 'annual_leave', label: 'Annual Leave' },
    { value: 'sick_leave', label: 'Sick Leave' },
    { value: 'personal_leave', label: 'Personal Leave' },
    { value: 'maternity_leave', label: 'Maternity Leave' },
    { value: 'paternity_leave', label: 'Paternity Leave' },
    { value: 'bereavement_leave', label: 'Bereavement Leave' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {absence ? 'Edit Absence' : 'Request Leave'}
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
        {/* Employee Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Employee *
          </label>
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="input-field w-full"
            required
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.first_name} {emp.last_name} ({emp.employee_id})
              </option>
            ))}
          </select>
        </div>

        {/* Absence Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline w-4 h-4 mr-2" />
            Leave Type *
          </label>
          <select
            name="absence_type"
            value={formData.absence_type}
            onChange={handleChange}
            className="input-field w-full"
            required
          >
            {absenceTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Start Date *
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              End Date *
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-2" />
              Total Days *
            </label>
            <input
              type="number"
              name="total_days"
              value={formData.total_days}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="5"
              step="0.5"
              min="0.5"
              required
            />
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Leave
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="input-field w-full"
            rows="3"
            placeholder="Please provide a brief reason for your leave request..."
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="input-field w-full"
            rows="3"
            placeholder="Any additional information or special requirements..."
          />
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
            {loading ? 'Saving...' : (absence ? 'Update Absence' : 'Submit Request')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AbsenceForm;
