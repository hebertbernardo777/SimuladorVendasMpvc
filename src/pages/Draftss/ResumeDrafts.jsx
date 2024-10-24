import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import "./ResumeDrafts.css";
import Button from "../../components/Button/Button";

const ResumeDrafts = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("pedido") || "[]");

    // Certificar que o ID da URL e os IDs do localStorage estão sendo comparados como números
    const order = dataLocalStorage.find(
      (pedido) => parseInt(pedido.id) === parseInt(id)
    );

    if (order) {
      setSelectedOrder(order);
    } else {
      console.log(`Pedido com ID ${id} não encontrado`);
    }
  }, [id]);

  return (
    <div className="container-resume-drafts">
      <h1>Resumo do Pedido</h1>
      {selectedOrder ? (
        <>
          <div className="infos-resume">
            <p>
              Cliente:{" "}
              <span>
                {selectedOrder.client?.RAZAOSOCIAL || selectedOrder.client}
              </span>
            </p>
            <p>
              Tipo de Pagamento:{" "}
              <span>{selectedOrder.form?.faturamentoLabel || ""}</span>
            </p>
            <p>
              Tipo de Faturamento:{" "}
              <span>{selectedOrder.form?.faturamentoLabel || ""}</span>
            </p>
            <p>
              Tipo de Frete: <span>{selectedOrder.form?.freteLabel || ""}</span>
            </p>
            <p>
              Transportadora:{" "}
              <span>{selectedOrder.form?.transportadoraLabel || ""}</span>
            </p>
            <p>
              Observações: <span>{selectedOrder.form?.observacoes || ""}</span>
            </p>
          </div>

          <div className="orders-cart">
            <h3>Itens do Pedido</h3>
            {selectedOrder.cart && selectedOrder.cart.length > 0
              ? selectedOrder.cart.map((item, index) => (
                  <div key={index} className="contianer-orders-cart">
                    <p>
                      Produto: <span>{item.name || ""}</span>
                    </p>
                    <div className="infos-orders-cart">
                      <p>
                        Valor do item:{" "}
                        <span>{formatCurrency(item.price, "BRL")}</span>
                      </p>
                      <p>
                        Quantidade: <span>{item.quantity}</span>
                      </p>
                      <p>
                        Valor Total:{" "}
                        <span>{formatCurrency(item.totalOrders, "BRL")}</span>
                      </p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </>
      ) : (
        <p>Sem pedidos salvos.</p>
      )}

      <Link to="/drafts">
        <Button
          type="button"
          className="btn"
          children={"Voltar ao Rascunhos"}
        />
      </Link>
    </div>
  );
};

export default ResumeDrafts;
