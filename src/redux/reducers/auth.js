import { createSlice } from "@reduxjs/toolkit";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { addAuthWithToken } from "src/api";

const auth = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      const localToken = getOfStorage("accessToken");

      if (localToken) {state.token = localToken;}
      if (action.payload) {state.token = action.payload;}

      if (state.token) {
        addAuthWithToken(state.token);
        saveInStorage("accessToken", state.token);
      }
    },
  },
});

export const authRdr = auth.reducer;
export const { setToken } = auth.actions;
