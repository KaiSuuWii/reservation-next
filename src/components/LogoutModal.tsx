import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;