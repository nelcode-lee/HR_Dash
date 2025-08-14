import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  User,
  BookOpen,
  Calendar,
  Users,
  Settings,
  ArrowRight,
} from 'lucide-react';

const Onboarding = () => {
  const [currentStep] = useState(0);

  // Mock onboarding data - in real app this would come from your API
  const onboardingEmployees = [
    {
      id: 1,
      employee_name: 'Michael Brown',
      employee_email: 'michael.brown@company.com',
      department: 'Sales',
      start_date: '2025-09-01',
      position: 'Sales Representative',
      manager: 'Sarah Johnson',
      onboarding_progress: 35,
      current_stage: 'documentation',
      tasks: [
        {
          id: 1,
          category: 'pre_start',
          title: 'Send Welcome Email',
          description: 'Send welcome email with company information and first day details',
          status: 'completed',
          assigned_to: 'HR Team',
          due_date: '2025-08-25',
          completed_date: '2025-08-25',
          priority: 'high',
        },
        {
          id: 2,
          category: 'pre_start',
          title: 'Prepare Workstation',
          description: 'Set up desk, computer, and necessary equipment',
          status: 'completed',
          assigned_to: 'IT Team',
          due_date: '2025-08-30',
          completed_date: '2025-08-30',
          priority: 'high',
        },
        {
          id: 3,
          category: 'documentation',
          title: 'Right to Work Verification',
          description: 'Verify passport, visa, or other right to work documents',
          status: 'in_progress',
          assigned_to: 'HR Team',
          due_date: '2025-09-01',
          completed_date: null,
          priority: 'critical',
        },
        {
          id: 4,
          category: 'documentation',
          title: 'DBS Check',
          description: 'Complete Disclosure and Barring Service check',
          status: 'pending',
          assigned_to: 'HR Team',
          due_date: '2025-09-05',
          completed_date: null,
          priority: 'critical',
        },
        {
          id: 5,
          category: 'documentation',
          title: 'Employment Contract',
          description: 'Sign and return employment contract',
          status: 'pending',
          assigned_to: 'Employee',
          due_date: '2025-09-01',
          completed_date: null,
          priority: 'high',
        },
        {
          id: 6,
          category: 'training',
          title: 'Health & Safety Training',
          description: 'Complete mandatory health and safety training',
          status: 'pending',
          assigned_to: 'Employee',
          due_date: '2025-09-03',
          completed_date: null,
          priority: 'high',
        },
        {
          id: 7,
          category: 'training',
          title: 'Company Policies Training',
          description: 'Review and acknowledge company policies',
          status: 'pending',
          assigned_to: 'Employee',
          due_date: '2025-09-05',
          completed_date: null,
          priority: 'medium',
        },
        {
          id: 8,
          category: 'integration',
          title: 'Team Introduction',
          description: 'Meet team members and key stakeholders',
          status: 'pending',
          assigned_to: 'Manager',
          due_date: '2025-09-02',
          completed_date: null,
          priority: 'medium',
        },
        {
          id: 9,
          category: 'integration',
          title: 'Department Overview',
          description: 'Learn about department structure and processes',
          status: 'pending',
          assigned_to: 'Manager',
          due_date: '2025-09-04',
          completed_date: null,
          priority: 'medium',
        },
      ],
    },
    {
      id: 2,
      employee_name: 'Emma Davis',
      employee_email: 'emma.davis@company.com',
      department: 'Marketing',
      start_date: '2025-09-15',
      position: 'Marketing Coordinator',
      manager: 'David Taylor',
      onboarding_progress: 20,
      current_stage: 'pre_start',
      tasks: [
        {
          id: 10,
          category: 'pre_start',
          title: 'Send Welcome Email',
          description: 'Send welcome email with company information and first day details',
          status: 'completed',
          assigned_to: 'HR Team',
          due_date: '2025-09-10',
          completed_date: '2025-09-10',
          priority: 'high',
        },
        {
          id: 11,
          category: 'pre_start',
          title: 'Prepare Workstation',
          description: 'Set up desk, computer, and necessary equipment',
          status: 'in_progress',
          assigned_to: 'IT Team',
          due_date: '2025-09-14',
          completed_date: null,
          priority: 'high',
        },
      ],
    },
  ];

  const onboardingStages = [
    {
      id: 'pre_start',
      name: 'Pre-Start',
      description: 'Preparation before employee start date',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      order: 1,
    },
    {
      id: 'documentation',
      name: 'Documentation',
      description: 'Legal and compliance documentation',
      icon: FileText,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      order: 2,
    },
    {
      id: 'training',
      name: 'Training',
      description: 'Mandatory and role-specific training',
      icon: BookOpen,
      color: 'bg-green-100 text-green-800 border-green-200',
      order: 3,
    },
    {
      id: 'integration',
      name: 'Integration',
      description: 'Team integration and role setup',
      icon: Users,
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      order: 4,
    },
    {
      id: 'completion',
      name: 'Completion',
      description: 'Onboarding completion and handover',
      icon: CheckCircle,
      color: 'bg-success-100 text-success-800 border-success-200',
      order: 5,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-warning-600" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: 'bg-success-100 text-success-800 border-success-200',
      in_progress: 'bg-warning-100 text-warning-800 border-warning-200',
      pending: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
        statusConfig[status] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}>
        {status === 'completed' ? 'Completed' : 
         status === 'in_progress' ? 'In Progress' : 'Pending'}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      critical: 'bg-danger-100 text-danger-800 border-danger-200',
      high: 'bg-warning-100 text-warning-800 border-warning-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
        priorityConfig[priority] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'pre_start':
        return <Calendar className="w-4 h-4" />;
      case 'documentation':
        return <FileText className="w-4 h-4" />;
      case 'training':
        return <BookOpen className="w-4 h-4" />;
      case 'integration':
        return <Users className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getTasksByStage = (employee) => {
    const tasksByStage = {};
    onboardingStages.forEach(stage => {
      tasksByStage[stage.id] = employee.tasks.filter(task => task.category === stage.id);
    });
    return tasksByStage;
  };

  const calculateStageProgress = (tasks) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Onboarding</h1>
          <p className="text-gray-600">Track and manage the complete onboarding process for new employees.</p>
        </div>
        <button className="btn-primary">
          <User className="w-4 h-4 mr-2" />
          Start New Onboarding
        </button>
      </div>

      {/* Onboarding Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Onboarding</p>
              <p className="text-2xl font-bold text-gray-900">{onboardingEmployees.length}</p>
            </div>
            <div className="p-3 rounded-full bg-primary-100">
              <User className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {onboardingEmployees.filter(emp => emp.onboarding_progress < 100 && emp.onboarding_progress > 0).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-warning-100">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {onboardingEmployees.filter(emp => emp.onboarding_progress === 100).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-success-100">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Overdue Tasks</p>
              <p className="text-2xl font-bold text-gray-900">
                {onboardingEmployees.reduce((total, emp) => {
                  return total + emp.tasks.filter(task => 
                    task.status !== 'completed' && 
                    new Date(task.due_date) < new Date()
                  ).length;
                }, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-danger-100">
              <AlertTriangle className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Stages Progress */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Process Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {onboardingStages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                  isCompleted ? 'border-success-300 bg-success-50' :
                  isActive ? 'border-primary-300 bg-primary-50' :
                  'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-success-100' :
                    isActive ? 'bg-primary-100' :
                    'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isCompleted ? 'text-success-600' :
                      isActive ? 'text-primary-600' :
                      'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${
                      isCompleted ? 'text-success-800' :
                      isActive ? 'text-primary-800' :
                      'text-gray-600'
                    }`}>
                      {stage.name}
                    </h4>
                    <p className="text-xs text-gray-500">{stage.description}</p>
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-success-500' :
                        isActive ? 'bg-primary-500' :
                        'bg-gray-300'
                      }`}
                      style={{ width: isCompleted ? '100%' : isActive ? '60%' : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Arrow connector */}
                {index < onboardingStages.length - 1 && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className={`w-4 h-4 ${
                      isCompleted ? 'text-success-400' :
                      isActive ? 'text-primary-400' :
                      'text-gray-300'
                    }`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Employee Onboarding List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Onboarding</h3>
        <div className="space-y-4">
          {onboardingEmployees.map((employee) => {
            const tasksByStage = getTasksByStage(employee);
            
            return (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                {/* Employee Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-medium text-lg">
                        {employee.employee_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{employee.employee_name}</h4>
                      <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
                      <p className="text-xs text-gray-500">Start Date: {new Date(employee.start_date).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{employee.onboarding_progress}%</div>
                    <div className="text-sm text-gray-500">Complete</div>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        onboardingStages.find(s => s.id === employee.current_stage)?.color || 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {onboardingStages.find(s => s.id === employee.current_stage)?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Overall Progress</span>
                    <span>{employee.onboarding_progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${employee.onboarding_progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stage Progress */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
                  {onboardingStages.map(stage => {
                    const stageTasks = tasksByStage[stage.id] || [];
                    const stageProgress = calculateStageProgress(stageTasks);
                    
                    return (
                      <div key={stage.id} className="text-center">
                        <div className="text-xs font-medium text-gray-700 mb-1">{stage.name}</div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              stageProgress === 100 ? 'bg-success-500' : 'bg-primary-500'
                            }`}
                            style={{ width: `${stageProgress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{stageProgress}%</div>
                      </div>
                    );
                  })}
                </div>

                {/* Tasks by Stage */}
                <div className="space-y-3">
                  {onboardingStages.map(stage => {
                    const stageTasks = tasksByStage[stage.id] || [];
                    if (stageTasks.length === 0) return null;
                    
                    return (
                      <div key={stage.id} className="border-l-4 border-gray-200 pl-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {getCategoryIcon(stage.id)}
                          <h5 className="font-medium text-gray-900">{stage.name}</h5>
                          <span className="text-sm text-gray-500">
                            ({stageTasks.filter(t => t.status === 'completed').length}/{stageTasks.length})
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          {stageTasks.map(task => (
                            <div
                              key={task.id}
                              className={`flex items-center justify-between p-2 rounded-lg ${
                                task.status === 'completed' ? 'bg-success-50' :
                                task.status === 'in_progress' ? 'bg-warning-50' :
                                'bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                {getStatusIcon(task.status)}
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                  <div className="text-xs text-gray-500">{task.description}</div>
                                  <div className="text-xs text-gray-400">Assigned to: {task.assigned_to}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {getPriorityBadge(task.priority)}
                                {getStatusBadge(task.status)}
                                <div className="text-xs text-gray-500">
                                  Due: {new Date(task.due_date).toLocaleDateString('en-GB')}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
