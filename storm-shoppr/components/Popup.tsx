import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-gray-900/60 text-white p-8 rounded-lg shadow-lg max-w-sm text-center">
            <p>Hurricane Incoming.</p>
            <p>Your supplies have been ordered.</p>
            
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
