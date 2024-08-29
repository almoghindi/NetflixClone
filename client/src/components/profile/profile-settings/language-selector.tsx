const LanguageSelector: React.FC = () => (
  <div className="mb-2">
    <label htmlFor="language" className="block mb-2 text-sm sm:text-base">
      Language:
    </label>
    <select
      id="language"
      className="bg-zinc-800 p-2 rounded w-full text-sm sm:text-base"
    >
      <option value="english">English</option>
      {/* Add more language options */}
    </select>
  </div>
);
export default LanguageSelector;
