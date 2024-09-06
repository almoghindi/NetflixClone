import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { sendRequest } from "../../hooks/use-request";
import { Profile } from "./profile-manager";
import BlueIcon from "../../assets/img/blueIcon.jpg"; // Import your default icon

export const useProfiles = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user) {
        setLoading(false);
        setError("User not logged in");
        return;
      }
      console.log(user.userId+"USERID")
      try {
        const response = await sendRequest({
          url: `/api/profile/all/${user.userId}`,
          method: "GET",
          port: 3002,
        });

        console.log("The Response:", response);
        if (response && Array.isArray(response)) {
          const profilesWithAvatars = (response as Profile[]).map((profiles) => ({
            ...profiles,
            src: getAvatarSrc(profiles.avatar),
          }));
          console.log("AFTER RES",profilesWithAvatars);
          setProfiles(profilesWithAvatars);
        } else {
          setError("Failed to load profiles");
        }
      } catch (err) {
        setError("Error fetching profiles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  // Helper function to get the correct avatar source
  const getAvatarSrc = (avatar: string) => {
    if (!avatar) {
      return BlueIcon; // Default icon if avatar is not set
    }
    return avatar; // If it's already a valid path or URL
  };

  return { profiles, loading, error };
};