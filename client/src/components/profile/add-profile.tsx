import React, { useState } from "react";
import BlueIcon from "../../assets/img/blueIcon.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sendRequest } from "../../hooks/use-request";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/authSlice";
import ProfileModal from "./profile-modal";
import IconSelector from "./modals/icon-selector-profile";
import { Profile } from "./profile-manager";

const AddProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [isKid, setIsKid] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>(BlueIcon);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    if (input.length > 9) {
      setError("Name cannot exceed 9 characters.");
    } else {
      setError("");
      setName(input);
    }
  };

  const handleIconSelect = (newIcon: string) => {
    setAvatar(newIcon);
    setIsModalOpen(false);
  };

  const handleKidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsKid(event.target.checked);
  };

  const handleContinue = async () => {
    if (!user) {
      console.error("User is not logged in.");
      setError("You must be logged in to create a profile.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter a name for the profile.");
      return;
    }

    if (name.length > 9) {
      setError("Name cannot exceed 9 characters.");
      return;
    }
    const profileData: Omit<Profile, "id"> & { user_id: string } = {
      user_id: user.userId,
      name,
      avatar,
      src: avatar, // Using avatar for src as well
      isKid,
    };
    dispatch(setUser({ ...user, avatar }));

    try {
      const response = await sendRequest({
        port: 3002,
        url: "/api/profile/create",
        method: "POST",
        body: profileData,
      });

      if (response) {
        console.log("Profile created successfully:", response);
        navigate("/profiles");
      } else {
        console.error("Failed to create profile.");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const handleCancel = () => {
    setName("");
    setIsKid(false);
    navigate("/profiles");
  };

  const currentProfile: Profile = {
    id: "",
    name,
    avatar,
    src: avatar, // Using avatar for src as well
    isKid,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="text-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 md:mb-4">Add Profile</h1>
        <p className="text-gray-400 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
          Add a profile for another person watching Netflix.
        </p>
        <div className="border-b border-gray-700 mb-4 sm:mb-6"></div>

        <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8">
          <div
            className="bg-blue-500 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center cursor-pointer mb-4 sm:mb-0"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={avatar}
              alt="Profile Icon"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-grow sm:ml-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 sm:p-3 bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-red-500"
              maxLength={9}
              minLength={2}
            />
            <div className="mt-2">
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>

        <div className="flex items-center mb-6 sm:mb-8 justify-center sm:justify-start">
          <input
            type="checkbox"
            id="kid"
            checked={isKid}
            onChange={handleKidChange}
            className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-red-600 bg-gray-800 border border-gray-600 focus:ring-0"
          />
          <label htmlFor="kid" className="ml-2 text-gray-400 text-base sm:text-lg">
            Kid?
          </label>
        </div>

        <div className="border-b border-gray-700 mb-4 sm:mb-6"></div>
        <div className="flex justify-center sm:justify-start space-x-4">
          <button
            onClick={handleContinue}
            className="py-2 px-6 sm:px-8 bg-red-600 text-white text-sm sm:text-base font-medium border border-red-500 hover:bg-red-700"
          >
            Continue
          </button>
          <button
            onClick={handleCancel}
            className="py-2 px-6 sm:px-8 bg-gray-900 text-gray-300 text-sm sm:text-base font-medium border border-gray-600 hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ProfileModal onClose={() => setIsModalOpen(false)}>
          <IconSelector
            onIconSelect={handleIconSelect}
            onClose={() => setIsModalOpen(false)}
            profile={currentProfile}
          />
        </ProfileModal>
      )}
    </div>
  );
};

export default AddProfile;