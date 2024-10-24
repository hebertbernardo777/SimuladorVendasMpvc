import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Summary from "../summary/Summary";
import InfosCard from "../../components/Card/InfosCard/InfosCard";
import formatCurrency from "../../utils/formatCurrency";
import useCartProducts from "../../hooks/useCartProducts";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import "./Products.css";
import useCalcProducts from "../../hooks/useCalcProducts";
import { ProductContext } from "../../context/ProductContext";
import useSummary from "../../hooks/useSummary";

const Products = () => {
  const { selectedProduct } = useContext(DataContext);
  const { imagePath, discount, setDiscount } = useContext(ProductContext);
  const { calcDiscountTotalOrders } = useSummary();
  const {
    quantity,
    minusQuantity,
    productPrice,
    plusQuantity,
    minusDiscount,
    plusDiscount,
    totalValueItem,
    orderTotal,
  } = useCalcProducts();

  const { handleFocus, handleAddCart } = useCartProducts();

  return (
    <>
      <div className="container-main">
        <InfosCard />
        <div className="container-total">
          <div className="container-product">
            <section className="section-products">
              <img src={imagePath} alt="imagem do produto" />
              <h4 className="product-title">{selectedProduct}</h4>
              <div className="btn-product">
                <p>Qtd:</p>
                <button onClick={minusQuantity}>
                  <FiMinusCircle className="icon-minus" />
                </button>
                <span className="results">{quantity.toFixed(0)} </span>
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
                <span className="results">
                  {" "}
                  {typeof productPrice === "number"
                    ? productPrice.toFixed(2)
                    : "0.00"}
                </span>
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
                <span>%</span>
              </div>
              <div className="infos">
                <h3>Total</h3>
                <div className="infos-products">
                  <p>Vlr Tabela: </p>{" "}
                  <span>{formatCurrency(productPrice, "BRL")}</span>
                </div>
                <div className="infos-products">
                  <p>Vlr total item: </p>{" "}
                  <span>{formatCurrency(totalValueItem, "BRL")}</span>
                </div>
                <div className="infos-products">
                  <p>Vlr Total pedido com desconto: </p>{" "}
                  <span>{formatCurrency(orderTotal, "BRL")}</span>
                </div>
                <div className="infos-products">
                  <p>Desconto total do pedido: </p>
                  <span>{calcDiscountTotalOrders.toFixed(2)}%</span>
                </div>
              </div>
            </section>
            <div className="btn-steps">
              <Link to="/category">
                <Button className="btn" type="Button" children={"Voltar"} />
              </Link>
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
      </div>
    </>
  );
};

export default Products;
