import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewContent } from "../../types/new-content";
import { TvProps } from "../../components/content/contentRows";

export interface MyListState {
  movies: NewContent[];
  tvShows: TvProps[];
}

const initialState: MyListState = {
  movies: [],
  tvShows: [],
};

export const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {
    setMyListContent: (state, action: PayloadAction<MyListState>) => {
      state.movies = action.payload.movies;
      state.tvShows = action.payload.tvShows;
    },
    addMovieToList: (state, action: PayloadAction<TvProps | NewContent>) => {
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
    removeMovieFromList: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      state.tvShows = state.tvShows.filter(
        (tvShow) => tvShow.id !== action.payload
      );
    },
  },
});

export const { addMovieToList, removeMovieFromList, setMyListContent } =
  myListSlice.actions;

export const selectIsMovieInList = (state: MyListState, contentId: number) =>
  state.movies.some((movie) => movie.id === contentId) ||
  state.tvShows.some((tvShow) => tvShow.id === contentId);

export default myListSlice.reducer;
