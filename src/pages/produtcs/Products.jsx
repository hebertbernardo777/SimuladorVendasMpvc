import React, { useState, useContext } from "react";
import Card from "../../components/Card/Card";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import "./Products.css";
import Button from "../../components/Button/Button";
import Summary from "../../components/summary/Summary";
import formatCurrency from "../../utils/formatCurrency";
import { AuthContext } from "../../context/AuthContext";


const Products = (props) => {
 
  const { data, products } = useContext(AuthContext);
  const productName = data.product;
  const suframa = data.suframa;
  const { selectedProduct, setSelectedProduct } = useContext(AuthContext);
  const {product, imagePath} = useContext(AuthContext);
 
  const getProductPrice = () => {
    switch (suframa) {
      case "Não optante":
        return product.AD_VLRINTERESTADUAL;
      case "isento-todos":
        return product.AD_VLRISENTOTODOSIMP;
      case "isento-ICMSIPI":
        return product.AD_ISENTOICMSIPI;
      case "isento-IPI":
        return product.AD_VLRISENTOIPI;
      default:
        return product.VLRVENDA;
    }
  };
  const productPrice = getProductPrice();
console.log(product)
  const [quantity, setQuantity] = useState(product.AD_QTDPC);
  const [discount, setDiscount] = useState(0);

  const quantidadeMininia = product.AD_QTDPC;

  const minusQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - quantidadeMininia);
    }
  };
  const plusQuantity = () => {
    setQuantity(product["AD_QTDPC"] + quantity);
  };

  const plusDiscount = () => {
    const numericDiscount = parseFloat(discount);

    if (Number.isInteger(numericDiscount)) {
      setDiscount(numericDiscount + 1);
    } else {
      setDiscount((numericDiscount + 0.1).toFixed(1));
    }
  };
  const minusDiscount = () => {
    const numericDiscount = parseFloat(discount);

    if (Number.isInteger(numericDiscount)) {
      setDiscount(numericDiscount - 1);
    } else {
      setDiscount((numericDiscount - 0.1).toFixed(1));
    }
  };

  const discountPercent = discount / 100;
  const finalPrice = productPrice * (1 - discountPercent);
  const discountApplied = productPrice - finalPrice;

  const handleFocus = (e) => {
    e.target.value = "";
  };

  const handleBack = () => {
    const values = { product: productName };
    props.handlePrevStep(values);
  };

  return (
    <>
      {/* <Card /> */}
      <div className="container-main">
        <div className="container-product">
          <section className="section-products">
            <img src={imagePath} alt="imagem do produto" />
            <h4 className="product-title">{selectedProduct}</h4>
            {/* <h3 className="product-price">
              {formatCurrency(productPrice, "BRL")}
            </h3> */}

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
              <button>
                <FiMinusCircle className="icon-minus" onClick={minusDiscount} />
              </button>
              <input
                type="number"
                step="0.01"
                className="results"
                value={discount}
                onFocus={handleFocus}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              />
              <button>
                <FiPlusCircle className="icon-plus" onClick={plusDiscount} />
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
                <p>Vlr item: </p>{" "}
                <span>{formatCurrency(finalPrice, "BRL")}</span>
              </div>
              <div className="infos-products">
                <p>Vlr Total pedido: </p> <span></span>
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
