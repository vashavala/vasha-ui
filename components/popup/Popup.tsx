import React, { useEffect, useRef } from 'react';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div 
        ref={popupRef}
        className="bg-white p-5 rounded-lg min-w-[300px] max-w-[90%] max-h-[90vh] overflow-y-auto relative shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3 className="text-xl font-semibold m-0">{title}</h3>
          )}
          <button 
            onClick={onClose}
            className="bg-transparent border-none text-2xl cursor-pointer p-0 text-gray-600 hover:text-gray-800 leading-none"
          >
            ×
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}; 