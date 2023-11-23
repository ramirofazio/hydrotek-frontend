import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./routes";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import store from "./redux";
import "atropos/css";
import "./index.css";
import "./i18n";
import "remixicon/fonts/remixicon.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <Routes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            backgroundColor: "#031834",
            borderWidth: "2px",
            borderColor: "#B8912D",
            color: "white",
            textAlign: "center",
            textTransform: "uppercase",
          },
        }}
      />
    </Provider>
  </GoogleOAuthProvider>
);
