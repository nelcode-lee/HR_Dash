import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  User,
  Sparkles,
  FileText,
  Calendar,
  Users,
  Settings,
  X,
  Minimize2,
  Maximize2,
  MessageCircle,
} from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI HR Assistant. I can help you with:\n\n• Leave requests and policies\n• Document uploads and requirements\n• Onboarding questions\n• Performance review guidance\n• General HR queries\n\nHow can I help you today?",
      timestamp: new Date(),
      suggestions: [
        "How do I request annual leave?",
        "What documents do I need for onboarding?",
        "How do I report sick leave?",
        "When is my next performance review?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Knowledge Base - In a real app, this would connect to an AI service
  const aiKnowledgeBase = {
    leave: {
      keywords: ['leave', 'holiday', 'annual', 'sick', 'absence', 'time off'],
      response: "I can help you with leave requests! Here are the main types:\n\n• **Annual Leave**: Submit through the Holidays page\n• **Sick Leave**: Report through the Absences page\n• **Medical Appointments**: Use the Absences page for short appointments\n\nWould you like me to guide you through requesting specific types of leave?",
      actions: ['Open Holidays page', 'Open Absences page', 'Show leave policy']
    },
    onboarding: {
      keywords: ['onboarding', 'new employee', 'first day', 'start', 'induction'],
      response: "Welcome to the team! Here's what you need to know about onboarding:\n\n• **Documents Required**: Passport/ID, P45, bank details\n• **First Day**: 9 AM start, meet your manager\n• **Training**: Complete mandatory modules within first week\n• **Equipment**: IT will set up your workstation\n\nNeed help with any specific part of onboarding?",
      actions: ['Show onboarding checklist', 'Open Documents page', 'Contact HR']
    },
    documents: {
      keywords: ['document', 'upload', 'certificate', 'contract', 'form'],
      response: "I can help you with document management:\n\n• **Upload Documents**: Use the Documents page\n• **Required Documents**: Employment contract, right to work proof\n• **Expiring Soon**: Check the Dashboard for alerts\n• **Format**: PDF, JPG, PNG accepted\n\nWould you like me to show you the Documents page or help with specific document requirements?",
      actions: ['Open Documents page', 'Show required documents', 'Check document status']
    },
    performance: {
      keywords: ['performance', 'review', 'appraisal', 'goals', 'feedback'],
      response: "Performance management is important for your growth:\n\n• **Reviews**: Quarterly performance discussions\n• **Goals**: Set and track SMART objectives\n• **Feedback**: Regular 1:1 meetings with manager\n• **Development**: Training and career planning\n\nI can help you access your performance dashboard or set new goals.",
      actions: ['Open Performance page', 'Set new goals', 'Schedule review meeting']
    },
    policies: {
      keywords: ['policy', 'rule', 'guideline', 'procedure', 'handbook'],
      response: "Company policies ensure fair and consistent practices:\n\n• **Leave Policy**: 25 days annual leave + bank holidays\n• **Sick Leave**: Self-certification for 7 days or less\n• **Dress Code**: Smart casual, appropriate for client meetings\n• **Working Hours**: 9 AM - 5:30 PM, flexible arrangements available\n\nNeed specific policy details or have questions about any policy?",
      actions: ['Show full policy handbook', 'Contact HR for clarification', 'Request policy review']
    }
  };

  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for exact matches first
    for (const [category, data] of Object.entries(aiKnowledgeBase)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        return {
          response: data.response,
          actions: data.actions,
          category: category
        };
      }
    }

    // Fallback responses for common queries
    if (input.includes('hello') || input.includes('hi')) {
      return {
        response: "Hello! How can I assist you with HR matters today?",
        actions: ['Show main menu', 'Recent queries', 'Contact human HR']
      };
    }

    if (input.includes('help')) {
      return {
        response: "I'm here to help! I can assist with:\n\n• Leave and absence management\n• Document requirements and uploads\n• Onboarding and training\n• Performance and development\n• Company policies and procedures\n\nWhat would you like to know more about?",
        actions: ['Leave management', 'Document help', 'Onboarding support', 'Policy questions']
      };
    }

    // Default response for unrecognized queries
    return {
      response: "I understand you're asking about '" + userInput + "'. While I don't have specific information about that, I can help you with:\n\n• Leave requests and policies\n• Document management\n• Onboarding processes\n• Performance reviews\n• General HR queries\n\nOr you can contact our HR team directly for personalized assistance.",
      actions: ['Contact HR team', 'Show main menu', 'Browse help topics']
    };
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = findBestResponse(message);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse.response,
        timestamp: new Date(),
        suggestions: aiResponse.actions || [],
        category: aiResponse.category
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Update conversation context
      setConversationContext(prev => ({
        ...prev,
        lastTopic: aiResponse.category,
        messageCount: (prev.messageCount || 0) + 1
      }));
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage(suggestion);
  };

  const handleActionClick = (action) => {
    // In a real app, these would trigger actual actions
    const actionMessage = {
      id: Date.now(),
      type: 'bot',
      content: `I'll help you with: **${action}**\n\nThis would typically open the relevant page or trigger the requested action in a real system.`,
      timestamp: new Date(),
      isAction: true
    };
    
    setMessages(prev => [...prev, actionMessage]);
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-200 z-50 flex items-center justify-center"
        >
          <MessageCircle className="w-8 h-8" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 ${
              isMinimized ? 'h-16' : 'h-[500px]'
            }`}
          >
            {/* Chat Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI HR Assistant</h3>
                  <p className="text-xs text-primary-100">Powered by AI</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={minimizeChat}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto h-80">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${
                          message.type === 'user' 
                            ? 'bg-primary-600 text-white rounded-l-lg rounded-tr-lg' 
                            : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                        } p-3`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          
                          {/* Action Buttons */}
                          {message.actions && message.actions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.actions.map((action, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleActionClick(action)}
                                  className="block w-full text-left text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-2 py-1 transition-colors duration-200"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {/* Suggestion Chips */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full px-3 py-1 transition-colors duration-200"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg p-3">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                      placeholder="Ask me anything about HR..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    />
                    <button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim()}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;


