import React, { useEffect, useRef } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Popup = ({ isOpen, onClose, children, title }: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-[fadeIn_0.2s_ease-in-out]"
      onClick={onClose}
    >
      <div 
        ref={popupRef}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-lg p-5 min-w-[300px] max-w-[90%] max-h-[90vh] overflow-y-auto relative animate-[slideIn_0.3s_ease-out] shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-gray-800 m-0">
              {title}
            </h2>
          )}
          <button 
            onClick={onClose}
            className="bg-transparent border-none text-2xl cursor-pointer text-gray-500 px-2 leading-none transition-colors hover:text-gray-800"
          >
            ×
          </button>
        </div>
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
