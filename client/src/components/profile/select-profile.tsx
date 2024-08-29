import { useNavigate } from "react-router-dom";
import { icons } from "./modals/icon-selector-components/icons";

export const profiles = [
  { name: "alon", src: icons[0].src, isKid: false },
  { name: "almog", src: icons[1].src, isKid: false },
  { name: "dor", src: icons[2].src, isKid: false },
  { name: "elior", src: icons[3].src, isKid: false },
  { name: "danilol", src: icons[4].src, isKid: true },
];

const ProfileSelector = () => {
  const navigate = useNavigate();
  const handleManageProfiles = () => {
    navigate("/profiles/manage");
  };
  return (
    <div className="font-netflix flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <h1 className="text-white text-4xl sm:text-6xl mb-6 sm:mb-8 ">
        Who's watching?
      </h1>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10 mt-6">
        {profiles.map((profile, index) => (
          <div key={index} className="relative text-center group">
            <div className="relative">
              <img
                src={profile.src}
                alt={profile.name}
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-46 lg:h-46 xl:w-[190px] xl:h-[190px] rounded cursor-pointer transform transition-transform duration-300  group-hover:ring-4 group-hover:ring-white"
              />
              {profile.isKid && (
                <span className="absolute bottom-0 sm:bottom-0 right-0 bg-blue-500 text-white text-xs font-semibold px-1 py-0 sm:px-2 sm:py-1 rounded-tl-lg">
                  Kid
                </span>
              )}
            </div>
            <p className="mt-2 sm:mt-4 text-base sm:text-2xl text-gray-400 transition-colors duration-300 group-hover:text-white">
              {profile.name}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={handleManageProfiles}
        className="bg-transparent font font-semi mt-6  bold border border-gray-500 text-gray-400 px-4 py-2  sm:px-6 md:px-8 lg:px-10 sm:text-lg md:text-xl lg:text-2xl hover:text-white  hover:border-white  transition-colors duration-300"
      >
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelector;
