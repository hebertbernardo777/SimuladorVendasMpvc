import React from "react";
import Logo from "../../assets/fotos/maispvc-logo.svg";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import "./NavBar.css"

const NavBar = () => {
  return (
    <header className="heading">
      <Link to="/">
      <img src={Logo} alt="" />
      </Link>
      <ul>
         <Link to="/orders">
          <li>Novo Pedido</li>
        </Link>
        <Link to="/clients">
        <li>Clientes</li>
        </Link>
        <li>Rascunhos</li>
      
      </ul>
      <div className="container-image-contact">
          <span className="image-contact"><img src="#" alt="" /></span>
          <p>José Correia</p>
          <div className="go-out">
            <CiLogout className="icon"/>
            <p>Sair</p>
          </div>
      </div>
    </header>
  );
};

export default NavBar;
