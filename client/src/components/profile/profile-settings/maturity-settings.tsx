const MaturitySettings: React.FC = () => (
  <div>
    <h2 className="text-sm sm:text-base mb-2">Maturity Settings:</h2>
    <p className="bg-zinc-800 p-2 rounded mb-3 text-sm sm:text-base">
      All Maturity Ratings
    </p>
    <p className="text-xs sm:text-sm text-gray-400 mb-3">
      Show titles of all maturity ratings for this profile.
    </p>
    <button className="bg-transparent border border-zinc-600 text-gray-400 px-4 py-2 rounded text-xs sm:text-sm">
      Edit
    </button>
  </div>
);
export default MaturitySettings;
