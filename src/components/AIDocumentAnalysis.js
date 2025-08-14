import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Trash2,
  Sparkles,
  Bot,
  Clock,
  Shield,
  User,
  Calendar,
  Building,
  CreditCard,
  X,
} from 'lucide-react';

const AIDocumentAnalysis = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Mock AI analysis results - in a real app, this would come from an AI service
  const mockAIResults = {
    'employment-contract.pdf': {
      documentType: 'Employment Contract',
      confidence: 95,
      extractedData: {
        employeeName: 'John Smith',
        startDate: '2025-01-15',
        salary: '£45,000',
        position: 'Software Engineer',
        department: 'Engineering',
        contractType: 'Permanent',
        noticePeriod: '1 month',
        benefits: ['Pension', 'Health Insurance', '25 days holiday']
      },
      compliance: {
        ukEmploymentLaw: true,
        minimumWage: true,
        workingTimeDirective: true,
        dataProtection: true
      },
      recommendations: [
        'Contract complies with UK employment law',
        'Consider adding flexible working clause',
        'Include GDPR compliance statement'
      ],
      riskScore: 'Low',
      nextSteps: [
        'Employee signature required',
        'Send to legal team for final review',
        'Schedule onboarding meeting'
      ]
    },
    'right-to-work.pdf': {
      documentType: 'Right to Work Document',
      confidence: 98,
      extractedData: {
        documentType: 'British Passport',
        nationality: 'British',
        expiryDate: '2030-05-15',
        documentNumber: 'GB123456789',
        issuingCountry: 'United Kingdom'
      },
      compliance: {
        ukImmigrationLaw: true,
        documentValid: true,
        expiryCheck: 'Valid for 5+ years'
      },
      recommendations: [
        'Document is valid and compliant',
        'Set reminder for renewal in 2028',
        'Store securely in employee file'
      ],
      riskScore: 'Very Low',
      nextSteps: [
        'Document verified and approved',
        'Add to employee compliance file',
        'No further action required'
      ]
    },
    'cv-resume.pdf': {
      documentType: 'CV/Resume',
      confidence: 92,
      extractedData: {
        candidateName: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+44 7911 123456',
        experience: '8 years',
        skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
        education: 'BSc Computer Science, University of Manchester',
        certifications: ['AWS Certified Developer', 'Scrum Master'],
        languages: ['English (Native)', 'Spanish (Intermediate)']
      },
      analysis: {
        skillMatch: 85,
        experienceLevel: 'Senior',
        culturalFit: 'High',
        technicalSkills: 'Excellent',
        communicationSkills: 'Good'
      },
      recommendations: [
        'Strong technical background',
        'Good cultural fit for team',
        'Consider for senior role',
        'Schedule technical interview'
      ],
      riskScore: 'Low',
      nextSteps: [
        'Schedule initial screening call',
        'Prepare technical assessment',
        'Arrange team interview'
      ]
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      status: 'uploaded'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    event.target.value = '';
  };

  const analyzeDocument = async (file) => {
    setIsAnalyzing(true);
    setSelectedFile(file);

    // Simulate AI analysis delay
    setTimeout(() => {
      const result = mockAIResults[file.name] || {
        documentType: 'Unknown Document',
        confidence: 75,
        extractedData: {},
        compliance: {},
        recommendations: ['Document type not recognized', 'Manual review recommended'],
        riskScore: 'Medium',
        nextSteps: ['Manual review required', 'Contact HR team']
      };

      setAnalysisResults(prev => ({
        ...prev,
        [file.id]: result
      }));
      setIsAnalyzing(false);
    }, 3000);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setAnalysisResults(prev => {
      const newResults = { ...prev };
      delete newResults[fileId];
      return newResults;
    });
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getRiskScoreColor = (score) => {
    switch (score.toLowerCase()) {
      case 'very low': return 'text-success-600 bg-success-100';
      case 'low': return 'text-success-600 bg-success-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'high': return 'text-danger-600 bg-danger-100';
      case 'very high': return 'text-danger-600 bg-danger-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success-600';
    if (confidence >= 75) return 'text-warning-600';
    return 'text-danger-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Document Analysis</h1>
          <p className="text-gray-600">Upload documents and let AI extract information, check compliance, and provide insights.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-600" />
          </div>
          <span className="text-sm text-primary-600 font-medium">AI Powered</span>
        </div>
      </div>

      {/* Upload Section */}
      <div className="card">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents for AI Analysis</h3>
          <p className="text-gray-600 mb-4">
            Supported formats: PDF, DOC, DOCX, JPG, PNG. AI will extract information and check compliance.
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </button>
        </div>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => {
              const result = analysisResults[file.id];
              const isAnalyzing = !result && selectedFile?.id === file.id;
              
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)} • {file.type} • {file.uploadDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!result && !isAnalyzing && (
                        <button
                          onClick={() => analyzeDocument(file)}
                          className="btn-primary text-sm"
                        >
                          <Bot className="w-4 h-4 mr-2" />
                          Analyze with AI
                        </button>
                      )}
                      
                      {isAnalyzing && (
                        <div className="flex items-center space-x-2 text-primary-600">
                          <Clock className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI analyzing...</span>
                        </div>
                      )}
                      
                      {result && (
                        <button
                          onClick={() => setSelectedFile(file)}
                          className="btn-secondary text-sm"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Results
                        </button>
                      )}
                      
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Analysis Status */}
                  {result && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">
                            Type: <span className="font-medium">{result.documentType}</span>
                          </span>
                          <span className="text-sm text-gray-600">
                            Confidence: <span className={`font-medium ${getConfidenceColor(result.confidence)}`}>
                              {result.confidence}%
                            </span>
                          </span>
                          <span className={`text-sm px-2 py-1 rounded-full ${getRiskScoreColor(result.riskScore)}`}>
                            Risk: {result.riskScore}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-success-600" />
                          <span className="text-sm text-success-600">Analysis Complete</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {selectedFile && analysisResults[selectedFile.id] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              AI Analysis Results: {selectedFile.name}
            </h3>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {(() => {
            const result = analysisResults[selectedFile.id];
            
            return (
              <div className="space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <span className="font-medium text-primary-900">Document Type</span>
                    </div>
                    <p className="text-lg font-semibold text-primary-900">{result.documentType}</p>
                  </div>
                  
                  <div className="bg-success-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-success-600" />
                      <span className="font-medium text-success-900">Confidence</span>
                    </div>
                    <p className={`text-lg font-semibold ${getConfidenceColor(result.confidence)}`}>
                      {result.confidence}%
                    </p>
                  </div>
                  
                  <div className="bg-warning-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-warning-600" />
                      <span className="font-medium text-warning-900">Risk Score</span>
                    </div>
                    <span className={`text-lg font-semibold px-3 py-1 rounded-full ${getRiskScoreColor(result.riskScore)}`}>
                      {result.riskScore}
                    </span>
                  </div>
                </div>

                {/* Extracted Data */}
                {Object.keys(result.extractedData).length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Extracted Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(result.extractedData).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm font-medium text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <p className="text-sm text-gray-900 mt-1">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compliance Check */}
                {Object.keys(result.compliance).length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Compliance Check</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(result.compliance).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          {value === true ? (
                            <CheckCircle className="w-5 h-5 text-success-600" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-warning-600" />
                          )}
                          <div>
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <p className="text-xs text-gray-600">{String(value)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {result.recommendations && result.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">AI Recommendations</h4>
                    <div className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                          <p className="text-sm text-blue-900">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                {result.nextSteps && result.nextSteps.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Recommended Next Steps</h4>
                    <div className="space-y-2">
                      {result.nextSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
                          <div className="w-2 h-2 bg-success-600 rounded-full"></div>
                          <p className="text-sm text-success-900">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default AIDocumentAnalysis;


