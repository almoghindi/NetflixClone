import { sendRequest } from "../hooks/use-request";
import { VideoResponse } from "../types/video";


export const getTrailer = async (movieId: string | number, type: string): Promise<string | null> => {
  try {
    console.log(movieId, "type ", type );
    const response = await sendRequest({
      url: `/redis/${type}/${movieId}/trailer`,
      method: "GET",
      port: 3003,
    });

    console.log("response treiler", response);
    
    if (response && response.content) {
      // const trailers = response.content.filter(
      //   (video: VideoResponse) => video.type === "Trailer" && video.site === "YouTube"
      // );

      // if (trailers.length > 0) {
      //   return `https://www.youtube.com/watch?v=${trailers[0].key}`;
      // }
      return `https://www.youtube.com/watch?v=${response.content.key}`;
    }

    console.error("No trailer data in response");
    return null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};