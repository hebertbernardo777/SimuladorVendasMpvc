import React, { forwardRef, useContext } from "react";
import Logo from "../../assets/fotos/maispvc-logo.svg";
import formatCurrency from "../../utils/formatCurrency";
import useSummary from "../../hooks/useSummary";
import { DataContext } from "../../context/DataContext";
import { ResumeContext } from "../../context/ResumeContext";
import "./Print.css";

const Print = forwardRef((props, ref) => {
  const {
    selectedClient,
    cartItems,
    data,
    freteTotal,
    clientNoRegister,
    printDate,
  } = useContext(DataContext);
  const { totalComFrete } = useContext(ResumeContext);
  const { totalOrders } = useSummary();

  return (
    <div ref={ref} className="container-print">
      <div className="containe-header">
        <img src={Logo} alt="logo da loja" />
        <p>
          MAIS PVC INDUSTRIA E COMERCIO LTDA <br /> CNPJ: 09.289.573/0001-51 I.E
          : XXXXX <br />
          RUA AMELIA ROSA QD CHA LT 15 SITIO DE RECREIO IPE <br />
          GOIANIA-GO CEP: 74.681-420 <br />
          (62) 3604-7666
        </p>
      </div>
      <div className="summary-print">
        <h1>Pedido de Venda</h1>
        <p id="text-value-orders">
          Valor Total desta: {formatCurrency(totalOrders, "BRL")}{" "}
        </p>
        <p id="title-client">Dados do Cliente</p>
        <div className="client-data">
          <div>
            <p>
              Cliente:
              <span>{selectedClient?.RAZAOSOCIAL || clientNoRegister}</span>
            </p>
            <p>
              Endereço:
              <span>
                {selectedClient?.TIPO} {selectedClient?.NOMEEND}
              </span>
            </p>
            <p>
              Município: <span>{selectedClient?.NOMECID}</span>
            </p>
            <p>
              Vendendor: <span></span>
            </p>
          </div>
          <div>
            <p>
              CNPJ/CPF: <span>{selectedClient?.CGC_CPF}</span>
            </p>
          </div>
          <div>
            <p>
              Operação: <span>{data.tipoVenda}</span>
            </p>
            <p>
              Data de Emissão: <span>{printDate}</span>
            </p>
          </div>
        </div>
        <h3>Itens do orçamento de vendas</h3>
        <div className="table">
          <table>
            <tr>
              <th>Cód. Item</th>
              <th>Descrição</th>
              <th>Vol.</th>
              <th>Qtd.</th>
              <th>Vlr. Unit.</th>
              <th>Vlr Total</th>
            </tr>
            {cartItems.map((item) => (
              <tr key={item.productCod}>
                <td>{item.productId}</td>
                <td>{item.product.DESCRPROD}</td>
                <td>{item.product.CODVOL}</td>
                <td>{item.quantity.toFixed(1)}</td>
                <td>{formatCurrency(item.price, "BRL")}</td>
                <td>{formatCurrency(item.totalOrders, "BRL")}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="summary-final">
          <div className="list-infos">
            <p id="infos-pay">
              Condição de Pagamento : {data.negociacaoLabel} <br />
              Modalidade do Frete : {data.freteLabel} <br />
              OBS: ** OUTRAS FORMAS DE PAGAMENTO ESTÃO SUJEITAS A AVALIAÇÂO DE
              CRÉDITO.
            </p>
            <ol>
              <li>1º) Orçamento sujeito à aprovação e liberação de crédito.</li>
              <li>
                2º) Preços e prazos podem sofrer alteração na data do pedido até
                sua efetiva entrega ou retira.
              </li>
              <li>
                3º) Pedidos de retira disponível por 7 dias, após essa data
                poderá ser cancelado.
              </li>
              <li>
                4º) Pedidos na condição a vista deverá ser pago em 2 dias úteis,
                após essa data poderá ser cancelado.
              </li>
              <li>
                5º) Envio dos produtos pode ocorrer em cargas fracionadas e
                datas distintas de acordo com sua disponibilidade em estoque.
              </li>
              <li>6º) Imposto: ST não destacado em nota fiscal.</li>
            </ol>
          </div>

          <div className="value-final">
            <h4>Total do pedido</h4>
            <p>
              Valor dos produtos:{" "}
              <span>{formatCurrency(totalOrders, "BRL")}</span>
            </p>
            <p>
              Valor Frete Negociado: <span>{freteTotal}</span>{" "}
            </p>
            <p>
              Peso Aproximado: <span></span>{" "}
            </p>
            <p id="final-price">
              Total do pedido:{" "}
              <span>{formatCurrency(totalComFrete, "BRL")}</span>{" "}
            </p>
          </div>
        </div>
        <div className="signature">
          <hr />
          <p>Carimbo e Assinatura de Aceite da Proposta</p>
        </div>
      </div>
    </div>
  );
});

export default Print;
