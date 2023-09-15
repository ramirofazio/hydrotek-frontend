import { createSlice } from "@reduxjs/toolkit";
import { getOfStorage, saveInStorage, deleteOfStorage } from "src/utils/localStorage";
import { addAuthWithToken } from "src/api";

const auth = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    useAuth: (state) => {
      const token = getOfStorage("accessToken");
      if (token) {
        state.token = token;
        addAuthWithToken(token);
        saveInStorage("accessToken", token);
      } else {
        state.token = null;
        deleteOfStorage("accessToken");
      }
    },
  },
});

export const authRdr = auth.reducer;
export const { useAuth } = auth.actions;
