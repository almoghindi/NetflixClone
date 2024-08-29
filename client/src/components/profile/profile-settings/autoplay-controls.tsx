const AutoplayControls: React.FC = () => (
  <div>
    <h2 className="text-sm sm:text-base mb-4">Autoplay controls</h2>
    <div className="space-y-2">
      <label className="flex items-center text-sm sm:text-base">
        <input type="checkbox" className="mr-3 w-4 h-4" defaultChecked />
        <span>Autoplay next episode in a series on all devices.</span>
      </label>
      <label className="flex items-center text-sm sm:text-base">
        <input type="checkbox" className="mr-3 w-4 h-4" defaultChecked />
        <span>Autoplay previews while browsing on all devices.</span>
      </label>
    </div>
  </div>
);
export default AutoplayControls;
