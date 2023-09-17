import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    session: {
      id: "",
      email: "",
    },
    profile: {
      avatar: "",
      name: "",
      dni: 0,
      email: "",
      pass: "",
    },
  },
  reducers: {
    saveSignData: (state, action) => {
      const { session, profile } = action.payload;
      state.session = session;
      state.profile = profile;
    },
  },
});

export const userRdr = user.reducer;
export const { saveSignData } = user.actions;
