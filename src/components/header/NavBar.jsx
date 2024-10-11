import React, { useContext } from "react";
import Logo from "../../assets/fotos/maispvc-logo.svg";
import formatFirstLetter from "../../utils/FormatFirstLetter";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContex";
import "./NavBar.css";

const NavBar = () => {
  const { cartItems, resetForm } = useContext(DataContext);
  const { user, siginOut } = useContext(AuthContext);

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
        <p>Olá, {formatFirstLetter(user)}</p>
        <abbr title="Sair">
          <MdOutlineLogout className="icon" onClick={siginOut} />
        </abbr>
      </div>
    </header>
  );
};

export default NavBar;
