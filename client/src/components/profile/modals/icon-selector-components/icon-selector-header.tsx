const IconSelectorHeader: React.FC = () => (
  <div className="flex justify-between items-center">
    <div className="flex items-center">
      <button className="mr-4">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <div>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm text-gray-400">Choose a profile icon.</p>
      </div>
    </div>
    <div className="flex items-center">
      <span className="mr-2">Doron&alon␣</span>
      <img
        src="/path-to-current-profile-image.jpg"
        alt="Current profile"
        className="w-10 h-10 rounded"
      />
    </div>
  </div>
);

export default IconSelectorHeader;
