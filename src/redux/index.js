import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartRdr, appRdr, userRdr, authRdr } from "./reducers";

const store = configureStore({
  reducer: {
    app: appRdr,
    user: userRdr,
    shoppingCart: shoppingCartRdr,
    auth: authRdr,
  },
});

export default store;
