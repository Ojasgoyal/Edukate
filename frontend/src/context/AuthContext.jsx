import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const apibase = import.meta.env.VITE_API_BASE_URL ?? "";

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${apibase}/api/auth/me`, {
        withCredentials: true,
      });
      localStorage.setItem("userData", JSON.stringify(res.data));
      setUserData(res.data);
    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${apibase}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      setUserData(null); // State updates perfectly in sync with the API
      localStorage.removeItem("userData");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
