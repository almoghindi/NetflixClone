const Footer: React.FC = () => (
  <footer className="bg-white py-4 border-t border-gray-200">
    <div className="container mx-auto px-4">
      <p className="text-gray-500 mb-4">Questions? Contact us.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
        <a href="#" className="hover:underline">FAQ</a>
        <a href="#" className="hover:underline">Help Center</a>
        <a href="#" className="hover:underline">Netflix Shop</a>
        <a href="#" className="hover:underline">Terms of Use</a>
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Cookie Preferences</a>
        <a href="#" className="hover:underline">Corporate Information</a>
      </div>
      <div className="mt-4">
        <select className="bg-white border border-gray-300 text-gray-500 py-1 px-2 rounded">
          <option value="en">English</option>
          {/* Add more language options as needed */}
        </select>
      </div>
    </div>
  </footer>
);

export default Footer;