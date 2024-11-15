import { createContext, useEffect, useState } from "react";
import { api } from "../lib/login";
import { Link } from "react-router-dom";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [codVend, setCodVend] = useState(0);
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
      const response = await api.post("/login", { user: username, password });
      console.log("Resposta da API:", response.data);
      if (response.data.rows && response.data.rows.length > 0) {
        const { NOMEUSU, CODVEND } = response.data.rows[0];
        setUser(NOMEUSU);
        setCodVend(CODVEND)
        api.defaults.headers.common["Authorization"] =
          `Bearer ${(NOMEUSU, CODVEND)}`;
        localStorage.setItem("NOMEUSU", NOMEUSU);
        localStorage.setItem("CODVEND", CODVEND);
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
    return <Link to="/login" />;
  };

  return (
    <AuthContext.Provider value={{ user, codVend, signed: !!user, signIn, siginOut }}>
      {loading ? <div>Carregando...</div> : children}
    </AuthContext.Provider>
  );
};
