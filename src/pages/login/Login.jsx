import React from "react";
import { useState } from "react";
import Logo from "../../assets/fotos/maispvc-logo.svg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = ()=>{
   
    alert("teste")
  }

  return (
    <div className="container">
      <div className="container-login">
        <img src={Logo} alt="logo mais PVC" />
        <form className="container-form" onSubmit={handleSubmit}>
          <label>
            <input
              type="email"
              placeholder="Digite seu email"
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Acessar</button>
        </form>
        <p>
          <a href="#">Registre sua conta</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
