"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const router = useRouter();

  // Simula leer token de localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, setRedirectTo, redirectTo, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
