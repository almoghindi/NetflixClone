import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewContent } from "../../types/new-content";

export interface MyListState {  
  movies: NewContent[];
}

const initialState: MyListState = {
  movies: [],
};

export const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {
    addMovieToList: (state, action: PayloadAction<NewContent>) => {
      const movieExists = state.movies.find(
        (movie) => movie.id === action.payload.id
      );
      if (!movieExists) {
        state.movies.push(action.payload);
      }
    },
    removeMovieFromList: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addMovieToList, removeMovieFromList } = myListSlice.actions;

export const selectIsMovieInList = (state: MyListState, movieId: number) =>
    state.movies.some(movie => movie.id === movieId);
  
export default myListSlice.reducer;
