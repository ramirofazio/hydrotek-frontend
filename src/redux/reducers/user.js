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
      savedPosts: [
        {
          date: "",
          title: "",
          id: "",
        },
      ],
      orders: [
        {
          id: "821831",
          user: "Ramiro",
          userId: "12345102",
          trackingCode: "0001",
          state: "active",
          address: "calle falsa 1234",
          clientName: "Ramiro Fazio dattoli",
          city: "Buenos Aires",
          date: new Date().toLocaleDateString(),
          img: "https://res.cloudinary.com/djdtbqhxm/image/upload/v1693605622/HYD/others/postExample.png",
          products: [
            {
              img: "https://res.cloudinary.com/djdtbqhxm/image/upload/v1693948929/HYD/others/defaultProduct.png",
              productName: "NOMBRE DEL PRODUCTO",
              qty: 2,
              unitPrice: 40000,
            },
            {
              img: "https://res.cloudinary.com/djdtbqhxm/image/upload/v1693948929/HYD/others/defaultProduct.png",
              productName: "NOMBRE DEL PRODUCTO",
              qty: 2,
              unitPrice: 40000,
            },
            {
              img: "https://res.cloudinary.com/djdtbqhxm/image/upload/v1693948929/HYD/others/defaultProduct.png",
              productName: "NOMBRE DEL PRODUCTO",
              qty: 2,
              unitPrice: 40000,
            },
            {
              img: "https://res.cloudinary.com/djdtbqhxm/image/upload/v1693948929/HYD/others/defaultProduct.png",
              productName: "NOMBRE DEL PRODUCTO",
              qty: 2,
              unitPrice: 40000,
            },
          ],
        },
      ],
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
