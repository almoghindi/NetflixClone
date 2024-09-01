import { NewContent } from "./../../types/new-content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TvProps } from "../../components/content/contentRows";

export interface LikedState {
  movies: NewContent[];
  tvShows: TvProps[];
}

const initialState: LikedState = {
  movies: [],
  tvShows: [],
};

export const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    setLikedContent: (state, action: PayloadAction<LikedState>) => {
      state.movies = action.payload.movies;
      state.tvShows = action.payload.tvShows;
    },
    addContentToLiked: (state, action: PayloadAction<TvProps | NewContent>) => {
      let contentExists = false;
      if ("title" in action.payload) {
        // It's NewContent (assuming NewContent has a title property)
        contentExists = state.movies.some(
          (movie) => movie.id === action.payload.id
        );
      } else if ("name" in action.payload) {
        // It's TvProps (assuming TvProps has a name property)
        contentExists = state.tvShows.some(
          (tvShow) => tvShow.id === action.payload.id
        );
      }

      if (!contentExists) {
        if ("title" in action.payload) {
          state.movies.push(action.payload as NewContent);
        } else if ("name" in action.payload) {
          state.tvShows.push(action.payload as TvProps);
        }
      }
    },
    removeContentFromLiked: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      state.tvShows = state.tvShows.filter(
        (tvShow) => tvShow.id !== action.payload
      );
    },
  },
});

export const { addContentToLiked, removeContentFromLiked, setLikedContent } =
  likedSlice.actions;

export const selectIsLiked = (state: LikedState, contentId: number) =>
  state.movies.some((movie) => movie.id === contentId) ||
  state.tvShows.some((tvShow) => tvShow.id === contentId);

export default likedSlice.reducer;
