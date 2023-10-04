import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    session: {
      id: "",
      email: "",
    },
    profile: {},
    savedPosts: [],
    orders: [],
  },
  reducers: {
    saveSignData: (state, action) => {
      console.log(action.payload);
      const { session, profile, savedPosts, orders } = action.payload;

      return {
        ...state,
        session: session,
        profile: profile,
        savedPosts: savedPosts,
        //orders: orders,
      };
    },
  },
});

export const userRdr = user.reducer;
export const { saveSignData } = user.actions;
