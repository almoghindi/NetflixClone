import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TvProps } from "../../components/content/contentRows";
import { NewContent } from "../../types/new-content";

export interface CardState {
  hoverdCard: TvProps | NewContent | undefined;
}

const initialState: CardState = {
  hoverdCard: undefined,
};

export const CardSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    handleSetHoverd: (
      state,
      action: PayloadAction<TvProps | NewContent | undefined>
    ) => {
      state.hoverdCard = action.payload;
    },
  },
});

export const { handleSetHoverd } = CardSlice.actions;

export const selectIsLiked = (state: CardState) => state.hoverdCard;

export default CardSlice.reducer;
