import React, { useState } from "react";
import ProfilePicture from "./profile-settings/profile-picture";
import LanguageSelector from "./profile-settings/language-selector";
import GameHandle from "./profile-settings/game-handle";
import MaturitySettings from "./profile-settings/maturity-settings";
import AutoplayControls from "./profile-settings/autoplay-controls";
import ActionButtons from "./profile-settings/action-buttons";
import { Profile } from "./profile-manager";

interface EditProfileProps {
  profile: Profile;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ profile, onClose }) => {
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.src);
  const [language, setLanguage] = useState(""); // Assuming LanguageSelector provides this
  const [gameHandle, setGameHandle] = useState(""); // Assuming GameHandle provides this
  const [maturitySettings, setMaturitySettings] = useState({}); // Assuming MaturitySettings provides this
  const [autoplay, setAutoplay] = useState({}); // Assuming AutoplayControls provides this
  // This data will be passed to the ActionButtons for the save operation
  const updatedProfileData = {
    name,
    avatar,
    isKid: profile.isKid,
    language,
    gameHandle,
    maturitySettings,
    autoplay,
  };

  return (
    <div className="text-white ">
      <div className="w-full max-w-lg sm:max-w-2xl p-4 rounded ">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Edit Profile</h1>
        <div className="border-b border-gray-700 mb-2"></div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          {/* Column for Profile Picture */}
          <div className="flex-shrink-0 w-full sm:w-1/3 flex flex-col items-center mb-4 sm:mb-0">
            <ProfilePicture src={avatar} handleChangeAvatar={setAvatar} />
          </div>

          {/* Column for Other Settings */}
          <div className="flex-grow w-full sm:w-2/3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-700 p-2 rounded w-full text-sm sm:text-base mb-3"
            />
            <LanguageSelector handleSelectLanguage={setLanguage} />
            <GameHandle handleGameHandle={setGameHandle} />
            <div className="border-b border-gray-700 mb-2 mt-6"></div>
            <MaturitySettings handleMaturitySettings={setMaturitySettings} />
            <div className="border-b border-gray-700 mb-2 mt-2"></div>
            <AutoplayControls handleAutoplayControls={setAutoplay} />
            <div className="border-b border-gray-700 mb-2 mt-2"></div>
            <ActionButtons
              onClose={onClose}
              profileId={profile.id}
              profileData={updatedProfileData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
