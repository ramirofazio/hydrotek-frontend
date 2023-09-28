import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    session: {},
    profile: {},
  },
  reducers: {
    saveSignData: (state, action) => {
      console.log(action.payload);
      const { session, profile } = action.payload;
      state.session = session;
      state.profile = profile;
    },
  },
});

export const userRdr = user.reducer;
export const { saveSignData } = user.actions;
