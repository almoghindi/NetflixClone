import React from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../../hooks/use-request";

interface ActionButtonsProps {
  onClose: () => void;
  profileId: string; // Pass the profile ID to identify which profile to delete or update
  profileData: { name: string; avatar: string; isKid: boolean }; // Include the updated profile data
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onClose,
  profileId,
  profileData,
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await sendRequest({
        url: "/api/profile/delete",
        method: "POST",
        port: 3002,
        body: { id: profileId  },
      });

      if (response) {
        console.log("Profile deleted successfully:", response);
        navigate("/profiles"); // Redirect to profiles list after deletion
      } else {
        console.error("Failed to delete profile.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleSave = async () => {
    try {
      console.log(profileData, profileId);
      const response = await sendRequest({
        url: `/api/profile/${profileId }/update`, // Assuming this is the route for updating
        method: "PUT",
        port: 3002,
        body: profileData,
      });

      console.log(response," Hewew");
      
      if (response) {
        console.log("Profile updated successfully:", response);
        navigate("/profiles"); // Redirect to profiles list after update
      } else {
        console.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
      <button
        onClick={handleSave}
        className="bg-white text-black px-6 py-2 text-sm sm:text-base font-bold"
      >
        Save
      </button>
      <button
        onClick={onClose}
        className="bg-transparent text-gray-400 px-6 py-2 border border-gray-700 text-sm sm:text-base"
      >
        Cancel
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-6 py-2 text-sm sm:text-base"
      >
        Delete Profile
      </button>
    </div>
  );
};

export default ActionButtons;
