import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    session: {
      id: "",
      email: "",
    },
    userProfile: {
      userName: "",
      cellPhone: 0,
      adress: "",
      avatar: "",
    },
  },
  reducers: {
    saveSignData: (state, action) => {
      const { session, profile } = action.payload;
      state.session = session;
      state.userProfile = profile;
    },
  },
});

export const userRdr = user.reducer;
export const { saveSignData } = user.actions;
