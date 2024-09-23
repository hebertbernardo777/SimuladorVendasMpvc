import React, { useContext } from "react";
import Logo from "../../assets/fotos/maispvc-logo.svg";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import "./NavBar.css";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { cartItems, resetForm } = useContext(AuthContext);

  return (
    <header className="heading">
      <Link to="/">
        <img src={Logo} alt="" />
      </Link>
      <ul>
        <Link to="/orders" onClick={resetForm}>
          <li>Novo Pedido</li>
        </Link>
        <Link to="/clients">
          <li>Clientes</li>
        </Link>
        <Link to="/drafts">
          <li>Rascunhos</li>
        </Link>
      </ul>
      <div className="container-contact">
        <div className="cart-link">
          <Link to="/cart">
            <FiShoppingCart className="icon-Cart" />
            <span className="cart-status">{cartItems.length}</span>
          </Link>
        </div>
        <p>José Correia</p>

        <div className="go-out">
          <CiLogout className="icon" />
          <p>Sair</p>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
