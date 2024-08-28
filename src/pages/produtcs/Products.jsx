import React, { useState, useContext, useEffect } from "react";
import Card from "../../components/Card/Card";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import "./Products.css";
import Button from "../../components/Button/Button";
import Summary from "../../components/summary/Summary";
import formatCurrency from "../../utils/formatCurrency";
import { AuthContext } from "../../context/AuthContext";

const Products = (props) => {
  const {
    data,
    selectedProduct,
    product,
    imagePath,
    cartItems,
    setCartItems,
    productPrice,
    setProductPrice,
    quantity,
    setQuantity,
    discount,
    setDiscount,
    productName,
    finalPrice,
    discountApplied,
    minusQuantity,
    plusQuantity,
    calculateTotalPrice,
    minusDiscount,
    plusDiscount,
    orderTotal
  } = useContext(AuthContext);

  const handleFocus = (e) => {
    e.target.value = "";
  };

  const handleBack = () => {
    const values = { product: productName };
    props.handlePrevStep(values);
  };

  const newItem = {
    productId: product.CODPROD,
    name: selectedProduct,
    price: productPrice,
    quantity: quantity,
    discount: discount,
    image: imagePath,
    priceFinal: finalPrice,
    appliedDiscount: discountApplied,
    totalOrders: orderTotal
   
  };

  // useEffect(() => {
  //   localStorage.setItem("carrinho", JSON.stringify(newItem));
  // }, []);

  const handleAddCart = () => {
    const itemsExists = cartItems.some(
      (item) => item.productId === product.CODPROD
    );
    if (!itemsExists) {
      setCartItems([...cartItems, newItem]);
    } else {
      alert("Este item já foi adcionado ao carrinho");
    }
  };

  return (
    <>
      {/* <Card /> */}
      <div className="container-main">
        <div className="container-product">
          <section className="section-products">
            <img src={imagePath} alt="imagem do produto" />
            <h4 className="product-title">{selectedProduct}</h4>
            <div className="btn-product">
              <p>Qtd:</p>
              <button onClick={minusQuantity}>
                <FiMinusCircle className="icon-minus" />
              </button>
              <span className="results">{quantity} </span>
              <button onClick={plusQuantity}>
                <FiPlusCircle className="icon-plus" />
              </button>
              <p>Un</p>
            </div>
            <div className="btn-product">
              <p>Vlr Unit:</p>
              <button type="button">
                <FiMinusCircle className="icon-minus" />
              </button>
              <span className="results">{productPrice}</span>
              <button>
                <FiPlusCircle className="icon-plus" />
              </button>
              <p>R$</p>
            </div>
            <div className="btn-product">
              <p>Desc: </p>
              <button onClick={minusDiscount}>
                <FiMinusCircle className="icon-minus" />
              </button>
              <input
                type="number"
                step="0.01"
                className="results"
                value={discount}
                onFocus={handleFocus}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              />
              <button onClick={plusDiscount}>
                <FiPlusCircle className="icon-plus" />
              </button>
              <p>%</p>
            </div>

            <div className="infos">
              <h3>Total</h3>
              <div className="infos-products">
                <p>Vlr Tabela: </p>{" "}
                <span>{formatCurrency(productPrice, "BRL")}</span>
              </div>
              <div className="infos-products">
                <p>Vlr total item: </p>{" "}
                <span>{formatCurrency(calculateTotalPrice(), "BRL")}</span>
              </div>
              <div className="infos-products">
                <p>Vlr Total pedido: </p>{" "}
                <span>{formatCurrency( orderTotal, "BRL")}</span>
              </div>
              <div className="infos-products">
                <p>Desconto aplicado: </p>
                <span>{formatCurrency(discountApplied, "BRL")}</span>
              </div>
            </div>
          </section>
          <div className="btn-steps">
            <Button
              className="btn"
              type="Button"
              children={"Voltar"}
              onClick={handleBack}
            />

            <Button
              className="btn"
              type="Submit"
              children={"Adicionar Produtos"}
              onClick={handleAddCart}
            />
          </div>
        </div>
        <div>
          <Summary />
        </div>
      </div>
    </>
  );
};

export default Products;
