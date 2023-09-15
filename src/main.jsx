import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./routes";
import { Provider } from "react-redux";
import AuthProvider from "./provider/authProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux";
import "atropos/css";
import "./i18n";
import "remixicon/fonts/remixicon.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
