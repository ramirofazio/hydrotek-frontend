import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    sessionData: {},
  },
  reducers: {
    saveSessionData: (state, action) => {
      state.sessionData = action.payload;
    },
  },
});

export const userRdr = user.reducer;
export const { saveSessionData } = user.actions;