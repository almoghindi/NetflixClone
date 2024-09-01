import React, { useState } from "react";
import ProfileModal from "./profile-modal"; // Import the ProfileModal component
import IconSelector from "./modals/icon-selector-profile"; // Import the new IconSelector component
import BlueIcon from "../../assets/img/blueIcon.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sendRequest } from "../../hooks/use-request";
import { useNavigate } from "react-router-dom";

const AddProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState("");
  const [isKid, setIsKid] = useState(false);
  const [icon, setIcon] = useState(BlueIcon);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleKidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsKid(event.target.checked);
  };

  const handleIconChange = (newIcon: string) => {
    setIcon(newIcon);
    setIsModalOpen(false); // Close the modal after selecting an icon
  };

  const handleContinue = async () => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
  
    const profileData = {
      user_id: user.userId, 
      name,
      avatar: icon,
      isKid,
    };
  
    try {
      const response = await sendRequest({
        port: 3002,
        url: "/api/profile/create",
        method: "POST",
        body: profileData,
      });
  
      if (response) {
        console.log("Profile created successfully:", response);
        navigate("/profiles"); // Navigate to the profiles page after creation
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
    setIcon(BlueIcon); // Reset to default icon
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="text-center w-full max-w-lg">
        <h1 className="text-white text-5xl mb-4">Add Profile</h1>
        <p className="text-gray-400 mb-8 text-lg">
          Add a profile for another person watching Netflix.
        </p>
        <div className="border-b border-gray-700 mb-6"></div>

        <div className="flex items-center mb-8">
          <div
            className="bg-blue-500 w-40 h-50 flex items-center justify-center cursor-pointer"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            <img
              src={icon}
              alt="Profile Icon"
              className="w-full h-full object-contain"
            />
          </div>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className="ml-4 w-full p-3 bg-gray-700 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center mb-8">
          <input
            type="checkbox"
            id="kid"
            checked={isKid}
            onChange={handleKidChange}
            className="form-checkbox h-5 w-5 text-red-600 bg-gray-800 border border-gray-600 focus:ring-0"
          />
          <label htmlFor="kid" className="ml-2 text-gray-400 text-lg">
            Kid?
          </label>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>
        <div className="flex justify-left space-x-4">
          <button
            onClick={handleContinue}
            className="py-2 px-8 bg-red-600 text-white text-md font-medium border border-red-500 hover:bg-red-700"
          >
            Continue
          </button>
          <button
            onClick={handleCancel}
            className="py-2 px-8 bg-gray-990 text-gray-300 text-md font-medium border border-gray-600 hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ProfileModal for icon selection */}
      {isModalOpen && (
        <ProfileModal onClose={() => setIsModalOpen(false)}>
          <IconSelector
            onIconSelect={handleIconChange} // Pass the handleIconChange function
            onClose={() => setIsModalOpen(false)} // Pass the close function
          />
        </ProfileModal>
      )}
    </div>
  );
};

export default AddProfile;
