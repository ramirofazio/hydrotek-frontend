import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    session: {
      id: "",
      email: "",
    },
    profile: {
      avatar: "https://res.cloudinary.com/djdtbqhxm/image/upload/v1693605622/HYD/others/postExample.png",
      name: "Ramiro Fazio Dattoli",
      dni: 42809069,
      email: "ramifazio@gmail.com",
      pass: "123456789",
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
