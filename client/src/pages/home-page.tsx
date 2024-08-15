import { useEffect, useState } from "react";
import { sendRequest } from "../hooks/use-request";
import { Content } from "../types/content";
import ReactPlayer from "react-player";
export const HomePage = () => {
  const [content, setContent] = useState<Content[]>([]);
  const getTop10Content = async (): Promise<void> => {
    try {
      const contents: Content[] = await sendRequest({
        url: "/api/Top10",
        method: "GET",
      });
      console.log(contents);
      setContent(contents);
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    getTop10Content();
  }, []);

  const videoStyle = {
    maskImage: "linear-gradient(black, transparent)",
    WebkitMaskImage: "linear-gradient(black, transparent)",
  };
  return (
    <>
      <div className="order:2">
        <ReactPlayer
          className="top1video"
          muted
          playing
          loop
          controls={false}
          url={content[0]?.trailer}
          disablePictureInPicture
          style={videoStyle}
        />
      </div>
    </>
  );
};
//hey
