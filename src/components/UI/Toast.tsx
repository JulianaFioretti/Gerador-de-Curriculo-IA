import React from 'react';


interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

const colorMap = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  warning: 'bg-yellow-100 text-yellow-800',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info' }) => (
  <div
    className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded shadow-lg z-50 ${colorMap[type]}`}
    style={{ minWidth: 240, textAlign: 'center' }}
  >
    {message}
  </div>
);

export default Toast;
