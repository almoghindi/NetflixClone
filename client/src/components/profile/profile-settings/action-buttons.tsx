const ActionButtons: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
    <button
      onClick={onClose}
      className="bg-white text-black px-6 py-2 text-sm sm:text-base font-bold"
    >
      Save
    </button>
    <button
      onClick={onClose}
      className="bg-transparent text-gray-400 px-6 py-2 border border-gray-700 text-sm sm:text-base"
    >
      Cancel
    </button>
    <button
      onClick={onClose}
      className="bg-transparent text-gray-400 px-6 py-2 border border-gray-700 text-sm sm:text-base"
    >
      Delete Profile
    </button>
  </div>
);
export default ActionButtons;
