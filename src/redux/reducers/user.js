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
    updateDataFromProfile: (state, action) => {
      console.log(action.payload);
      const { dni, email, id, name, profile } = action.payload;

      //! Chequear si funciona bien esto, tira error en consola que no peude actualizar el componente bla bla

      return {
        ...state,
        profile: profile,
        session: { dni, email, id, name },
      };
    },
    saveSignData: (state, action) => {
      const { session, profile, savedPosts /*orders*/ } = action.payload;
      const rawSavedPosts = savedPosts.map((p) => p.postId);
      return {
        ...state,
        session: session,
        profile: profile,
        savedPosts: rawSavedPosts,
        //orders: orders,
      };
    },
    updateSavedPosts: (state, action) => {
      return {
        ...state,
        savedPosts: action.payload,
      };
    },
  },
});

export const userRdr = user.reducer;
export const { saveSignData, updateDataFromProfile, updateSavedPosts } = user.actions;
