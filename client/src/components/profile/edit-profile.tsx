import React from "react";
import ProfilePicture from "./profile-settings/profile-picture"; // Fixed typo in import path
import LanguageSelector from "./profile-settings/language-selector";
import GameHandle from "./profile-settings/game-handle";
import MaturitySettings from "./profile-settings/maturity-settings";
import AutoplayControls from "./profile-settings/autoplay-controls";
import ActionButtons from "./profile-settings/action-buttons";
import { Profile } from "./profile-manager";

interface EditProfile {
  profile: Profile;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfile> = ({ profile, onClose }) => {
  return (
    <div className="text-white ">
      <div className="w-full max-w-lg sm:max-w-2xl p-4 rounded">
        {/* Added background color and padding */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Edit Profile</h1>
        <div className="border-b border-gray-700 mb-2"></div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          {/* Column for Profile Picture */}
          <div className="flex-shrink-0 w-full sm:w-1/3 flex flex-col items-center mb-4 sm:mb-0">
            <ProfilePicture src={profile.src} />
          </div>

          {/* Column for Other Settings */}
          <div className="flex-grow w-full sm:w-2/3">
            <input
              type="text"
              defaultValue={profile.name}
              className="bg-zinc-700 p-2 rounded w-full text-sm sm:text-base mb-3"
            />
            <LanguageSelector />
            <GameHandle />
            <div className="border-b border-gray-700 mb-2 mt-6"></div>
            <MaturitySettings />
            <div className="border-b border-gray-700 mb-2 mt-2"></div>
            <AutoplayControls />
            <div className="border-b border-gray-700 mb-2 mt-2"></div>
            <ActionButtons onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
