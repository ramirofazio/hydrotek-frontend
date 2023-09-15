import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getOfStorage, saveInStorage, deleteOfStorage } from "src/utils/localStorage";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken_] = useState(getOfStorage("accessToken"));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      saveInStorage("accessToken", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      deleteOfStorage("accessToken");
    }
  }, [token]);

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
