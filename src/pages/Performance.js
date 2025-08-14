import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Plus,
  Search,
  Filter,
  Star,
  Target,
  Calendar,
  User,
} from 'lucide-react';

const Performance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const performanceReviews = [
    {
      id: 1,
      employee_name: 'John Smith',
      employee_email: 'john.smith@company.com',
      review_period_start: '2024-01-01',
      review_period_end: '2024-12-31',
      overall_rating: 4,
      goals_met: 'Successfully delivered 3 major projects on time',
      areas_for_improvement: 'Could improve time management skills',
      next_period_goals: 'Lead team on new product launch',
      reviewer_name: 'Sarah Johnson',
      review_date: '2025-01-15T14:00:00Z',
    },
    {
      id: 2,
      employee_name: 'Emma Wilson',
      employee_email: 'emma.wilson@company.com',
      review_period_start: '2024-01-01',
      review_period_end: '2024-12-31',
      overall_rating: 5,
      goals_met: 'Exceeded all KPIs and implemented new HR processes',
      areas_for_improvement: 'Continue developing leadership skills',
      next_period_goals: 'Take on team management responsibilities',
      reviewer_name: 'David Taylor',
      review_date: '2025-01-20T10:00:00Z',
    },
    {
      id: 3,
      employee_name: 'Michael Brown',
      employee_email: 'michael.brown@company.com',
      review_period_start: '2024-01-01',
      review_period_end: '2024-12-31',
      overall_rating: 3,
      goals_met: 'Met basic sales targets',
      areas_for_improvement: 'Needs to improve customer relationship skills',
      next_period_goals: 'Increase sales by 20% and improve customer satisfaction',
      reviewer_name: 'Sarah Johnson',
      review_date: '2025-01-18T16:00:00Z',
    },
    {
      id: 4,
      employee_name: 'David Taylor',
      employee_email: 'david.taylor@company.com',
      review_period_start: '2024-01-01',
      review_period_end: '2024-12-31',
      overall_rating: 4,
      goals_met: 'Successfully managed budget and improved financial reporting',
      areas_for_improvement: 'Could be more proactive in strategic planning',
      next_period_goals: 'Develop long-term financial strategy',
      reviewer_name: 'Emma Wilson',
      review_date: '2025-01-22T11:00:00Z',
    },
  ];

  const years = ['All', '2025', '2024', '2023'];

  const filteredReviews = performanceReviews.filter(review => {
    const matchesSearch = 
      review.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.employee_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = selectedYear === '' || selectedYear === 'All' || 
      review.review_period_start.startsWith(selectedYear);

    return matchesSearch && matchesYear;
  });

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-warning-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-900">{rating}/5</span>
      </div>
    );
  };

  const getRatingBadge = (rating) => {
    const ratingConfig = {
      1: 'bg-red-100 text-red-800 border-red-200',
      2: 'bg-orange-100 text-orange-800 border-orange-200',
      3: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      4: 'bg-blue-100 text-blue-800 border-blue-200',
      5: 'bg-green-100 text-green-800 border-green-200',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        ratingConfig[rating] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}>
        {rating === 1 ? 'Poor' : 
         rating === 2 ? 'Below Average' : 
         rating === 3 ? 'Average' : 
         rating === 4 ? 'Good' : 'Excellent'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600">Track employee performance reviews and development goals.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Review
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
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-field min-w-[150px]"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Performance Reviews Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Goals & Achievements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reviewer
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <motion.tr
                  key={review.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-sm">
                          {review.employee_name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {review.employee_name}
                        </div>
                        <div className="text-sm text-gray-500">{review.employee_email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(review.review_period_start).toLocaleDateString('en-GB')} - {new Date(review.review_period_end).toLocaleDateString('en-GB')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(review.review_date).toLocaleDateString('en-GB')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      {getRatingStars(review.overall_rating)}
                      <div className="mt-1">{getRatingBadge(review.overall_rating)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                          <Target className="w-4 h-4 text-success-600 mr-2" />
                          Goals Met
                        </div>
                        <div className="text-sm text-gray-600 ml-6">{review.goals_met}</div>
                      </div>
                      <div>
                        <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                          <TrendingUp className="w-4 h-4 text-warning-600 mr-2" />
                          Areas for Improvement
                        </div>
                        <div className="text-sm text-gray-600 ml-6">{review.areas_for_improvement}</div>
                      </div>
                      <div>
                        <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                          <Target className="w-4 h-4 text-primary-600 mr-2" />
                          Next Period Goals
                        </div>
                        <div className="text-sm text-gray-600 ml-6">{review.next_period_goals}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900">{review.reviewer_name}</div>
                        <div className="text-xs text-gray-500">Reviewer</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-warning-600 transition-colors duration-200">
                        <Target className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredReviews.length}</span> of{' '}
                <span className="font-medium">{performanceReviews.length}</span> results
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

export default Performance;


