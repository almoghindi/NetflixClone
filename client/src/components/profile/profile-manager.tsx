import React, { useState } from "react";
import EditProfile from "./edit-profile"; // Ensure this is the correct import path
import { Link, useNavigate } from "react-router-dom";
import { useProfiles } from "./profiles"; // Import useProfiles hook

export interface Profile {
  avatar: string;
  id: string;
  src: string;
  name: string;
  isKid: boolean;
  
}

const ProfileManager: React.FC = () => {
  const { profiles, loading, error } = useProfiles();
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsEditing(true);

  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setTimeout(() => setSelectedProfile(null), 300); // Delay hiding profile for transition
  };

  const handleAddProfileClick = () => {
    navigate("/profiles/add");
  };

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  if (error) {
    return <div>Error loading profiles: {error}</div>;
  }

  return (
    <div className="font-netflix min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
      {isEditing && selectedProfile ? (
        <EditProfile profile={selectedProfile} onClose={handleCloseEdit} />
      ) : (
        <>
          <h1 className="text-white sm:text-5xl mb-3 font-semi">
            Manage Profiles:
          </h1>
          <div className="flex justify-center mb-8">
            {profiles.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-400 mb-6 sm:mb-8 lg:mb-10">
                  No profiles available.
                </p>
                <button
                  onClick={handleAddProfileClick}
                  className="bg-red-600 text-white px-5 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5 rounded-lg shadow-lg transition duration-200 hover:bg-red-500"
                >
                  Add Profile
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10 mt-6">
                {profiles.map((profile, index) => (
                  <div
                    onClick={() => handleProfileClick(profile)}
                    key={profile.id || index} // Use profile.id if available
                    className="relative group"
                  >
                    <div className="relative text-center">
                      <img
                        // src={profile.avatar}
                        src={profile.src}
                        alt={profile.name}
                        className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-46 lg:h-46 xl:w-[190px] xl:h-[190px] object-cover rounded cursor-pointer transform transition-transform duration-100 group-hover:ring-2 group-hover:ring-gray-400"
                      />
                      {profile.isKid && (
                        <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs font-semibold px-1 py-0 sm:px-2 sm:py-1 rounded-tl-lg">
                          Kid
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-50">
                        <div className="absolute inset-0 flex items-center justify-center duration-200">
                          <div className="text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              role="img"
                              data-icon="PencilStandard"
                              aria-hidden="true"
                              className="svg-icon svg-icon-edit"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M19.1213 1.7071C17.9497 0.535532 16.0503 0.53553 14.8787 1.7071L13.2929 3.29289L12.5858 4L1.58579 15C1.21071 15.3751 1 15.8838 1 16.4142V21C1 22.1046 1.89543 23 3 23H7.58579C8.11622 23 8.62493 22.7893 9 22.4142L20 11.4142L20.7071 10.7071L22.2929 9.12132C23.4645 7.94975 23.4645 6.05025 22.2929 4.87868L19.1213 1.7071ZM15.5858 7L14 5.41421L3 16.4142L3 19C3.26264 19 3.52272 19.0517 3.76537 19.1522C4.00802 19.2527 4.2285 19.4001 4.41421 19.5858C4.59993 19.7715 4.74725 19.992 4.84776 20.2346C4.94827 20.4773 5 20.7374 5 21L7.58579 21L18.5858 10L17 8.41421L6.70711 18.7071L5.29289 17.2929L15.5858 7ZM16.2929 3.12132C16.6834 2.73079 17.3166 2.73079 17.7071 3.12132L20.8787 6.29289C21.2692 6.68341 21.2692 7.31658 20.8787 7.7071L20 8.58578L15.4142 4L16.2929 3.12132Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-center mt-2 sm:mt-4 text-base sm:text-2xl text-gray-400 transition-colors duration-0 group-hover:text-white">
                      {profile.name}
                    </p>
                  </div>
                ))}
                {/* Add Profile Option */}
                {profiles.length < 5 && (
                  <div
                    className="relative bg-black bg-opacity-50 w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-lg overflow-hidden group cursor-pointer border-4 border-transparent hover:border-opacity-40 hover:border-white transition duration-200 flex items-center justify-center"
                    onClick={handleAddProfileClick}
                  >
                    <span className="text-5xl text-white font-bold">+</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <Link to={"/profiles"}>
            <button className="bg-white grow-[2] tracking-[.15em] text-sm font-semi text-black px-6 py-2 shadow-lg transition duration-100 hover:bg-[#c00] hover:text-white font-medium rounded-none">
              Done
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ProfileManager;
