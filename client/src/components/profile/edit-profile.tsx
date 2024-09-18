import React, { useState } from "react";

import ProfilePicture from "./profile-settings/profile-picture";
import LanguageSelector from "./profile-settings/language-selector";
import GameHandle from "./profile-settings/game-handle";
import MaturitySettings from "./profile-settings/maturity-settings";
import AutoplayControls from "./profile-settings/autoplay-controls";
import ActionButtons from "./profile-settings/action-buttons";
import { Profile } from "./profile-manager";
import ProfileModal from "./profile-modal";
import IconSelector from "./modals/icon-selector-profile";

interface EditProfileProps {
  profile: Profile;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ profile, onClose }) => {

  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [language, setLanguage] = useState("");
  const [gameHandle, setGameHandle] = useState("");
  const [maturitySettings, setMaturitySettings] = useState({});
  const [autoplay, setAutoplay] = useState({});
  const [error, setError] = useState('');
  const [profileId, ] = useState(profile.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  



  const updatedProfileData = {
    name,
    avatar,
    isKid: profile.isKid,
    language,
    gameHandle,
    maturitySettings,
    autoplay,
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length > 9) {
      setError('Name cannot exceed 9 characters.');
    } else {
      setError('');
      setName(input);
    }
  };

  const handleIconSelect = (newIcon: string) => {
    setAvatar(newIcon);
    setIsModalOpen(false);
  };

  return (
    <div className="text-white">
      <div className="w-full max-w-lg sm:max-w-2xl p-4 rounded">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Edit Profile</h1>
        <div className="border-b border-gray-700 mb-2"></div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          {/* Column for Profile Picture */}
          <div onClick={() => setIsModalOpen(true)} className="flex-shrink-0 w-full sm:w-1/3 flex flex-col items-center mb-4 sm:mb-0">
            <ProfilePicture 
              src={avatar} 
              profileId={profileId}
            />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Change Avatar
            </button>
          </div>

          {/* Column for Other Settings */}
          <div className="flex-grow w-full sm:w-2/3">
            <div>
              <label htmlFor="text" className="block mb-2 text-sm sm:text-base">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="bg-zinc-700 p-2 rounded w-full text-sm sm:text-base mb-3"
                maxLength={9}
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>
            <LanguageSelector handleSelectLanguage={setLanguage} />
            <GameHandle handleGameHandle={setGameHandle} />
            <div className="border-b border-gray-700 mb-2 mt-6"></div>
            <MaturitySettings handleMaturitySettings={setMaturitySettings} />
            <div className="border-b border-gray-700 mb-2 mt-2"></div>
            <AutoplayControls handleAutoplayControls={setAutoplay} />
            <div className="border-b border-gray-700 mb-2 mt-2"></div>
            <ActionButtons
              onClose={onClose}
              profileId={profileId}
              profileData={updatedProfileData}
            />
          </div>
        </div>
      </div>

      {/* ProfileModal for icon selection */}
      {isModalOpen && (
        <ProfileModal onClose={() => setIsModalOpen(false)}>
          <IconSelector
            onIconSelect={handleIconSelect}
            onClose={() => setIsModalOpen(false)}
            profile={profile}
          />
        </ProfileModal>
      )}
    </div>
  );
};

export default EditProfile;