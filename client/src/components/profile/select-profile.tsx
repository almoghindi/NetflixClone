import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "./profiles";
import { setUser } from "../../store/slices/authSlice"; // Adjust the path to your Redux slice
import { encryptObject } from "../../utils/encription"; // Assuming you have encryption utilities
import { RootState } from "../../store/store";
import { AuthResponse } from "../../types/auth";

const ProfileSelector = () => {
  const { profiles, loading, error } = useProfiles();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleManageProfiles = () => {
    navigate("/profiles/manage");
  };

  const handleProfileSelection = async (profileId: string, avatar: string) => {
    try {

      
      // Get the current user from the Redux store and add profileId
      const currentUser: AuthResponse["user"] = {
        ...user!,
        profileId,
        avatar,
        
      };
      
      dispatch(setUser(currentUser));

      // Encrypt the updated user object
      const encryptedResponse: string | null = encryptObject(currentUser);
      if (encryptedResponse) {
        // Store the encrypted user object in localStorage
        localStorage.setItem("user", encryptedResponse);
      }

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  if (error) {
    return <div>Error loading profiles: {error}</div>;
  }

  return (
    <div className="font-netflix flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <h1 className="text-white text-4xl sm:text-6xl mb-6 sm:mb-8">
        Who's watching?
      </h1>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10 mt-6">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="relative text-center group"
            onClick={() => handleProfileSelection(profile.id, profile.avatar)} // Pass profile ID
          >
            <div className="relative">
              <img
                src={ profile.avatar }
                alt={profile.name}
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-46 lg:h-46 xl:w-[190px] xl:h-[190px] rounded cursor-pointer transform transition-transform duration-300 group-hover:ring-4 group-hover:ring-white"
              />
              {profile.isKid && (
                <span className="absolute bottom-0 sm:bottom-0 right-0 bg-blue-500 text-white text-xs font-semibold px-1 py-0 sm:px-2 sm:py-1 rounded-tl-lg">
                  Kid
                </span>
              )}
            </div>
            <p className="mt-2 sm:mt-4 text-base sm:text-xl text-gray-400 transition-colors duration-300 group-hover:text-white">
              {profile.name}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={handleManageProfiles}
        className="bg-transparent font font-semi mt-6 bold border border-gray-500 text-gray-400 px-4 py-2 sm:px-6 md:px-8 lg:px-10 sm:text-lg md:text-xl lg:text-2xl hover:text-white hover:border-white transition-colors duration-300"
      >
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelector;
