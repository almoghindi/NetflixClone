import ContentRows from "../components/content/contentRows";
import { PlayIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import Video from "../components/content/video";
import Navbar from "../layouts/nav";
import { useNavigate } from "react-router-dom";
import Top10Videos from "../components/content/top10-videos";
import RecommendedRow from "../components/content/recommended-Row";
import { useEffect } from "react";
import { sendRequest } from "../hooks/use-request";
import { setLikedContent } from "../store/slices/liked-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setMyListContent } from "../store/slices/myListSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  function handlePlayMainVideoClick(): void {
    navigate(`/main-movie/play`);
  }
  useEffect(() => {
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
      <div className="z-60 -mt-36 bg-gradient-to-t from-black to-gray-900">
        <div
          style={{
            transform: "scale(1.5)", //TODO: FIX THE SIZING TO FIT THE WINDOW.
            transformOrigin: "center",
            width: "100%",
            height: "80vh",
            overflow: "hidden",
            opacity: "0.7",
          }}
          className="z-60 -mt-36 sm:-mt-50  "
        >
          {<Video movieId={"1241674"} type={"movie"} />} // TODO: This is The
          Last Breath Movie
        </div>
        <div className="absolute top-[50%] ml-4 md:ml-16">
          <p className=" text-white text-1xl md:text-3xl h-full lg:text-8xl font-black drop-shadow-xl">
            The Last Breath
          </p>
          <div className="flex gap-3 flex-row items-center mt-3 md:mt-4">
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
          <ContentRows
            filter={{ url: "trending/all", title: "Trending Now" }}
          />
          <Top10Videos
            filter={{
              url: "top_rated/movie",
              title: "Top 10 Movies in Israel Today",
            }}
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
