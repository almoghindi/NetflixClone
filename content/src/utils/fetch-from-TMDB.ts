import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fetchFromTMDB = async (endpoint: string) => {
  console.log("fetching from TMDB", process.env.BASE_URL, process.env.TMDB_API_KEY);
  try {
    const response = await axios.get(`${process.env.BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching from TMDB: ${error.response?.status} - ${error.response?.statusText}`);
      console.error(error.response?.data);
    } else {
      console.error("Error fetching from TMDB:", error);
    }
    throw error;
  }
};

export const fetch = fetchFromTMDB;