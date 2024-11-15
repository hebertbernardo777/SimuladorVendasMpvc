import React from "react";
import Summary from "../summary/Summary";
import Button from "../../components/Button/Button";
import "./CartOrders.css"
import { Link } from "react-router-dom";

const CartOrders = () => {
  return (
    <>
      <div className="container-cart-orders">
        <Summary />

        <Link to="/products">
        
        <Button
          className="btn"
          type="button"
          children={"Voltar aos Produtos"}
        />
        
        </Link>
      </div>
    </>
  );
};

export default CartOrders;
