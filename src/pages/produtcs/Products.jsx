import React, { useContext, useEffect } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import "./Products.css";
import Button from "../../components/Button/Button";
import Summary from "../summary/Summary";
import Card from "../../components/Card/Card";
import formatCurrency from "../../utils/formatCurrency";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Products = () => {
  const {
    data,
    selectedCategory,
    selectedProduct,
    product,
    imagePath,
    cartItems,
    setCartItems,
    productPrice,
    quantity,
    discount,
    setDiscount,
    productName,
    finalPrice,
    minusQuantity,
    plusQuantity,
    calculateTotalPrice,
    minusDiscount,
    plusDiscount,
    orderTotal,
    totalDiscountLineProduct,
    totalPrice,
    setTotalValueByLine,
    generalDiscount,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct || !product) {
      navigate("/category");
    }
  }, [selectedProduct, product, navigate]);

  const productId = product ? product.CODPROD : null;

  const newItem = {
    productId: productId,
    category: selectedCategory,
    name: selectedProduct,
    price: productPrice,
    priceTotal: calculateTotalPrice(),
    quantity: quantity,
    discount: generalDiscount,
    image: imagePath,
    priceFinal: finalPrice,
    totalOrders: orderTotal,
    line: product ? product.AD_LINHAPRODUTOS : null,
  };

  console.log(orderTotal);
  console.log(`Criando item: ${newItem.name}, Discount: ${newItem.discount}`)
console.log(newItem)
  const handleFocus = (e) => {
    e.target.value = "";
  };

  const totalLineProductValue = (cartItems) => {
    return cartItems.reduce((acc, item) => {
      const { line, totalOrders } = item;
      if (!acc[line]) {
        acc[line] = totalOrders;
      } else {
        acc[line] += totalOrders;
      }
      return acc;
    }, {});
  };

  const handleAddCart = () => {
    const itemsExists = cartItems.some(
      (item) => item.productId === product.CODPROD
    );
    if (!itemsExists) {
      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);

      const totalValueByline = totalLineProductValue(updatedCartItems);
      setTotalValueByLine(totalValueByline);

      totalDiscountLineProduct(updatedCartItems);

      const string = () => {
        return;
      };
    } else {
      alert("Este item já foi adcionado ao carrinho");
    }
  };

  const totalValueLine = totalLineProductValue(cartItems);
  console.log("valor total", totalValueLine);

  // Informações dos cartões
  const infoCards = [
    { nome: "Linha Forro", image: "forro.jpeg", line: "LINHA DE FORRO PVC" },
    { nome: "Linha Predial", image: "predial.jpeg", line: "LINHA PREDIAL" },
    {
      nome: "Linha Eletrodutos",
      image: "corrugado.jpeg",
      line: "LINHA ELETRODUTOS",
    },
    {
      nome: "Linha Irrigação",
      image: "irrigacao.jpeg",
      line: "LINHA IRRIGACAO",
    },
    {
      nome: "Linha Reservatorios",
      image: "reservatorios.jpeg",
      line: "LINHA DE RESERVATORIOS",
    },
  ];

  return (
    <>
      <div className="container-main">
        <div className="cards">
          {infoCards.map((item) => {
            // const discount = totalDiscountLineProduct[item.line] || 0;
            return (
              <Card
                key={item.nome}
                title={item.nome}
                image={`/fotos/${item.image}`}
                // discount={discount}
              />
            );
          })}
        </div>
        <div className="oi">
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
                  <p>Vlr Total pedido com desconto: </p>{" "}
                  <span>{formatCurrency(orderTotal, "BRL")}</span>
                </div>

                <div className="infos-products">
                  <p>Desconto aplicado: </p>
                  <span>{generalDiscount.toFixed(2)} %</span>
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
