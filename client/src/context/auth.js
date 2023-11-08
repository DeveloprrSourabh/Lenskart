import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    let data = localStorage.getItem("auth");
    if (data) {
      let parseData = JSON.parse(data);

      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, [setAuth]);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
