import React from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'ready' | 'loading' | 'error';
  message?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  message 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'ready':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          message: message || 'Ready to launch'
        };
      case 'loading':
        return {
          icon: Loader2,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          message: message || 'Loading...'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          message: message || 'Error occurred'
        };
      default:
        return {
          icon: CheckCircle,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          message: message || 'Unknown status'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center space-x-2 text-sm px-3 py-1 rounded-full ${config.bgColor}`}>
      <Icon className={`w-4 h-4 ${config.color} ${status === 'loading' ? 'animate-spin' : ''}`} />
      <span className={config.color}>{config.message}</span>
    </div>
  );
};
