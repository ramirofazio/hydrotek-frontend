import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    session: {
      email: ""
    },
    userProfile: {
      name: "",
      userName: "",
      adress: "",
      cellPhone: 0,
    }
  },
  reducers: {
    saveSignInData: (state, action) => {
      state.session = action.payload;
    },
  },
});

export const userRdr = user.reducer;
export const { saveSignInData } = user.actions;