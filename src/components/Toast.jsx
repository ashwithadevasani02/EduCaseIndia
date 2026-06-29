import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ message, show, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[340px] bg-white border-l-4 border-green-500 shadow-xl rounded-r-lg p-3.5 flex items-center justify-between gap-3 animate-fade-in select-none border border-gray-100">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
        <p className="text-xs font-semibold text-gray-800 leading-tight">{message}</p>
      </div>
      <button 
        type="button" 
        onClick={onClose} 
        className="text-gray-400 hover:text-gray-600 focus:outline-none p-0.5 rounded hover:bg-gray-100 cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
