import React, { useContext } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import formatCurrency from "../../utils/formatCurrency";
import "./CartItems.css";
import { DataContext } from "../../context/DataContext";

const CartItems = ({ newItem }) => {
  if (!newItem) {
    return null;
  }
  const { productId, name, quantity, image, totalOrders} = newItem;
  const { cartItems, setCartItems } = useContext(DataContext);

  const handleRemoveItem = () => {
    const updatesItems = cartItems.filter(
      (item) => item.productId != productId
    );
    setCartItems(updatesItems);
  };

  return (
    <div className="products-summary">
      <div id="image-cart">
        <img src={image} alt="imagem do produto" />
      </div>
      <div id="infos-cart">
        <h4>{name}</h4>
        <div className="summary-buy">
          <p>Quantidade:</p> <span>{quantity}</span>
        </div>
        <div className="summary-buy">
          <p>Preço:</p>
          <span>{formatCurrency(totalOrders, "BRL")}</span>
        </div>
        <FaRegTrashCan className="delete-product" onClick={handleRemoveItem} />
      </div>
    </div>
  );
};

export default CartItems;
