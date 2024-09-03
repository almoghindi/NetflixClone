import ContentRows from "../components/content/contentRows";
import { PlayIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import Video from "../components/content/video";
import { useNavigate } from "react-router-dom";
import Top10Videos from "../components/content/top10-videos";
import RecommendedRow from "../components/content/recommended-Row";
import { useEffect } from "react";
import { sendRequest } from "../hooks/use-request";
import { setLikedContent } from "../store/slices/liked-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setMyListContent } from "../store/slices/myListSlice";
import ReactPlayer from "react-player";

const mainTreiler = import.meta.env.VITE_LAST_BREATH_TREILER;

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  function handlePlayMainVideoClick(): void {
    navigate(`/main-movie/play`);
  }
  useEffect(() => {
    if (!user?.profileId) {
      navigate("/profiles");
      return;
    }

    const LoadLikedContent = async () => {
      const LikedContentResponse = await sendRequest({
        port: 3006,
        url: `/api/get-liked-content/${user?.userId}`,
        method: "GET",
      });
      if (LikedContentResponse) {
        console.log(LikedContentResponse);
        dispatch(setLikedContent(LikedContentResponse));
      } else console.log("not found likedContent");
    };
    const LoadMyListContent = async () => {
      const MyListContentResponse = await sendRequest({
        url: `/api/profile/${user?.profileId}/items`,
        method: "GET",
        port: 3002,
      });
      if (MyListContentResponse) {
        console.log(MyListContentResponse);
        dispatch(setMyListContent(MyListContentResponse));
      } else console.log("not found myListContent");
    };
    LoadLikedContent();
    LoadMyListContent();
  }, [dispatch, user]);

  return (
    <>
      <div className="z-60 relative -mt-36 bg-gradient-to-t from-gray-900 to-black">
        <div
          className="
          relative
          w-full
          h-[30vh] sm:h-[60vh] md:h-[60vh] lg:h-[70vh]  xl:h-[80vh] 
          overflow-hidden
        "
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <ReactPlayer
            url={mainTreiler}
            playing={true}
            loop
            muted
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              objectFit: "cover",
            }}
            controls={false}
          />
          <div className="z-60 absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black to-transparent"></div>
          {/* {<Video movieId={"1241674"} type={"movie"} />} // TODO: Use when switching to real unlimited Cloud storage*/}
          Last Breath Movie
        </div>
        <div className="absolute top-[17%] ml-4 md:ml-16 lg:ml-24 lg:top-[24%]">
          <p className=" text-white text-1xl md:text-3xl h-full lg:text-8xl font-black drop-shadow-xl">
            The Last Breath
          </p>
          <div className="flex gap-3 flex-row items-center mt-3 md:mt-4 ">
            <button
              onClick={handlePlayMainVideoClick}
              className="bg-white flex text-black sm:w-[100px] lg:w-[140px] py-1 md:py-2 px-2 md:px-4 font-bold text-sm lg:text-xl rounded-lg hover:bg-[#e6e6e6]"
            >
              <PlayIcon width={25} height={25} className="mr-2" />
              Play
            </button>
            <button className="bg-white bg-opacity-30 flex text-white lg:w-auto py-1 md:py-2 px-2 md:px-4 text-sm lg:text-xl rounded-lg hover:bg-[#b7b1b1] hover:bg-opacity-20">
              <InformationCircleIcon width={25} height={25} className="me-2 " />
              More Info
            </button>
          </div>
        </div>
        <div className="pb-40 mt-15">
          <Top10Videos
            filter={{
              url: "top_rated/movie",
              title: "Top 10 Movies in Israel Today",
            }}
          />
          <ContentRows
            filter={{ url: "trending/all", title: "Trending Now" }}
          />
          <ContentRows filter={{ url: "popular/movie", title: "Popular" }} />
          <ContentRows filter={{ url: "upcoming/movie", title: "Upcoming" }} />
          <RecommendedRow />
        </div>
      </div>
    </>
  );
};

export default HomePage;
