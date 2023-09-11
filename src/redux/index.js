import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartRdr, appRdr, userRdr } from './reducers';

const store = configureStore({
  reducer: {
    app: appRdr,
    user: userRdr,
    shoppingCart: shoppingCartRdr,
  },
});

export default store;