"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [registros, setRegistros] = useState([]);
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const [registroActual, setRegistroActual] = useState({subestacion:"",materiales:[]})
  const router = useRouter();

  // Simula leer token de localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    window.localStorage.setItem("loggedUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
    router.push("/");
  };

    // Cargar desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("registroActual");
    if (saved) setRegistroActual(JSON.parse(saved));
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    if (registroActual) {
      localStorage.setItem("registroActual", JSON.stringify(registroActual));
    }
  }, [registroActual]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      setRedirectTo, 
      redirectTo, 
      logout, 
      setUser, 
      login, 
      registroActual, 
      setRegistroActual,
      registros, 
      setRegistros }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
