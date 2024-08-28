// Modal.tsx
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ProfileModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-[#141414] rounded p-4 max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default ProfileModal;
