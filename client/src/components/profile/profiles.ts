import { useEffect, useState } from "react";
import { icons } from "./modals/icon-selector-components/icons";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { sendRequest } from "../../hooks/use-request";

export const useProfiles = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user) {
        setLoading(false);
        setError("User not logged in");
        return;
      }

      try {
        const response = await sendRequest({
          url: '/api/profile/all',
          method: 'GET',
          port: 3002,
        });

        if (response && Array.isArray(response)) {
          const profilesWithIcons = response.map((profile, index) => ({
            ...profile,
            src: icons[index % icons.length]?.src || icons[0].src,
          }));
          setProfiles(profilesWithIcons);
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

  return { profiles, loading, error };
};
