// AuthContex.jsx
import { createContext, useEffect, useState } from "react";
// import { api } from "../lib/login";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageNOMEUSU = localStorage.getItem("NOMEUSU");
      if (storageNOMEUSU) {
        setUser(storageNOMEUSU);
      }
      setLoading(false);
    };
    loadingStoreData();
  }, []);

  const signIn = async (username, password) => {
    try {
      const response = await axios.post("/login", { user: username, password });
      console.log("Resposta da API:", response.data);
      if (response.data.rows && response.data.rows.length > 0) {
        const { NOMEUSU, CODUSU } = response.data.rows[0];
        setUser(NOMEUSU);
        api.defaults.headers.common["Authorization"] =
          `Bearer ${(NOMEUSU, CODUSU)}`;
        localStorage.setItem("NOMEUSU", NOMEUSU);
        localStorage.setItem("CODUSU", CODUSU);
        return true;
      } else {
        alert("Usuário ou senha inválidos");
        return false;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
  };

  const siginOut = () => {
    localStorage.removeItem("NOMEUSU");
    setUser(null);
    return <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, siginOut }}>
      {loading ? <div>Carregando...</div> : children}
    </AuthContext.Provider>
  );
};
