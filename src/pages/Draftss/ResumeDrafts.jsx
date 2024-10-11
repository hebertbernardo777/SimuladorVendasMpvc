import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import formatCurrency from "../../utils/formatCurrency";
import "./ResumeDrafts.css";

const ResumeDrafts = () => {
  const { selectedClient, data, cartItems } = useContext(DataContext);

  return (
    <div className="container-resume-drafts">
      <h1>Resumo do Pedido</h1>
      <div className="infos-resume">
        <p>
          Cliente:
          <span> {selectedClient?.RAZAOSOCIAL || selectedClient }</span>
        </p>
        <p>
          Tipo de Pagamento: <span>{data.negociacao}</span>
        </p>
        <p>
          Tipo de faturamento: <span>{data.faturamento}</span>
        </p>
        <p>
          Tipo de frete:<span> {data.frete}</span>
        </p>
        <p>
          Transportadora: <span>{data.transportadora}</span>
        </p>
        <p>
          Observações: <span>{data.observacoes}</span>
        </p>
      </div>
      <div className="orders-cart">
        <h3>Itens do Pedido</h3>
        {cartItems.map((item) => (
          <div key={item.productId} className="contianer-orders-cart">
            <p>
              Produto: <span>{item.name}</span>
            </p>
            <div className="infos-orders-cart">
              <p>
                Valor do item: <span>{formatCurrency(item.price, "BRL")}</span>
              </p>
              <p>
                Quantidade: <span>{item.quantity}</span>
              </p>
              <p>
                Valor Total:
                <span> {formatCurrency(item.totalOrders, "BRL")}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeDrafts;
