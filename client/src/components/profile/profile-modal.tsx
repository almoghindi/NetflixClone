import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ProfileModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#141414] overflow-y-auto">
      <div className="relative min-h-screen p-4 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 left-8 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;