import React, { useContext } from "react";
import "./Summary.css";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/AuthContext";
import CartItems from "../../components/Cart/CartItems";
import formatCurrency from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import formatFirstLetter from "../../utils/FormatFirstLetter";

const Summary = () => {
  const {
    data,
    currentStep,
    cartItems,
    setCartItems,
    selectedClient,
    totalDiscountLineProduct,
    totalValueByLine,
    infosGroups,
    totalPrice,
    totalValorTabela,
    generalDiscount,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(cartItems);

  const TotalDiscount = cartItems.reduce(
    (acc, item) => item.appliedDiscount + acc,
    0
  );

  const handleSaveToLocalStorage = () => {
    const currentDate = new Date().toLocaleDateString();
    const uniqueId = Date.now(); // Gerando um ID único baseado no timestamp
  
    const combinedData = {
      id: uniqueId, // Usando um identificador único
      client: selectedClient,
      form: data,
      cart: cartItems,
      dateSaved: currentDate,
      currentStep,
    };
  
    const savedData = JSON.parse(localStorage.getItem("pedido")) || [];
  
    // Adiciona o novo pedido ao array
    const updatedData = [...savedData, combinedData];
  
    // Salva o array atualizado no localStorage
    localStorage.setItem("pedido", JSON.stringify(updatedData));
    setCartItems([]);
    navigate("/");
  };

  return (
    <div className="container-summary">
      <h3>Resumo da compra</h3>
      <div className="items-cart">
        {cartItems.map((cartItem) => (
          <CartItems key={cartItem.CODPROD} newItem={cartItem} />
        ))}
      </div>
      <div className="summary-discount">
        <div className="infos-summary">
          <p>Frete</p> <span>5</span>
        </div>
        <div className="infos-summary">
          <p>Desconto realizado no pedido</p>
          <span>{generalDiscount.toFixed(2)} %</span>
        </div>
        <div className="infos-summary">
          <p>Total</p>
          <span>{formatCurrency(totalPrice, "BRL")}</span>
        </div>

        <div className="infos-line">
          <div className="infos-summary">
            {/* {Object.entries(totalValueByLine).map(([line, total]) => (
              <div id="total-lineproducts">
                <h4>Linha de produtos</h4>
                <h4>{line}</h4>
                <p>
                  Valor Total da Linha : {formatCurrency(total, "BRL")}
                </p>
              </div>
            ))} */}
            {/* <div>
              {Object.entries(totalDiscountLineProduct).map(([line, discount]) => (
                <div>
                  <p> Desconto total da Linha -{discount}%</p>
                </div>
              ))}
            </div>   */}
            <div>
              {/* {Object.entries(infosGroups).map(([line, total]) => (
                <div>
                  <p> Desconto total da Linha{total}%</p>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>

      <div className="summary-btn">
        <Button className="btn" children={"Finalizar Compra"} />
      </div>

      <div className="drafts-link">
        <a href="#" onClick={handleSaveToLocalStorage}>
          <p>Salvar Rascunho</p>
        </a>
      </div>
    </div>
  );
};

export default Summary;
