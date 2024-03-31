import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const redirectToSignIn = () => {
    navigate("/");
  };
  const redirectToDashboard = () => {
    navigate("/Home");
  };

  const checkLoggedIn = async () => {
    try {
      const response = await AuthService.refreshToken();
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        redirectToSignIn();
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        redirectToSignIn,
        redirectToDashboard,
        setIsLoggedIn,
      }}
    >
      {children}
      {/* <Outlet /> */}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
