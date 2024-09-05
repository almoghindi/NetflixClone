import { ChevronDownIcon } from "@heroicons/react/20/solid";

const MoreButton: React.FC = () => {
  return (
    <button className="text-white cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex justify-center items-center transition hover:border-white ml-auto">
      <ChevronDownIcon className="w-5 h-5" />
    </button>
  );
};
export default MoreButton;
