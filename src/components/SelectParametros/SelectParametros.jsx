import React, { useContext } from "react";
import SelectField from "../../components/select/SelectField";
import useOrders from "../../hooks/useOrders";

const SelectParametros = () => {
  const { posts, loading, handleChangeNegociacao } = useOrders();

  return (
    <div>
      {" "}
      <SelectField
        name="tipoVenda"
        label="Tipo de venda"
        defaultOption="Selecione uma opção"
        options={[
          { value: "pedido", label: "Pedido de venda" },
          { value: "orcamento", label: "Orçamento de venda" },
        ]}
      />
      <SelectField
        name="faturamento"
        label="Faturamento"
        defaultOption="Selecione uma opção"
        options={
          posts && posts.tiposFaturamento && posts.tiposFaturamento.length > 0
            ? posts.tiposFaturamento.map((tipo) => ({
                value: tipo.VALOR,
                label: tipo.OPCAO,
              }))
            : [{ value: "", label: "Carregando" }]
        }
      />
      <SelectField
        name="frete"
        label="Frete"
        defaultOption="Selecione uma opção"
        options={
          posts && Array.isArray(posts.tipoFrete) && posts.tipoFrete.length > 0
            ? posts.tipoFrete.map((tipo) => ({
                value: tipo.VALOR,
                label: tipo.OPCAO,
              }))
            : [{ value: "", label: "Carregando" }]
        }
      />
      <SelectField
        name="transportadora"
        label="Transportadora"
        defaultOption="Selecione uma opção"
        options={
          posts && posts.transportadoras && posts.transportadoras.length > 0
            ? posts.transportadoras.map((tipo) => ({
                value: tipo.VALOR,
                label: tipo.OPCAO,
              }))
            : [{ value: "", label: "Carregando" }]
        }
      />
      <SelectField
        name="negociacao"
        label="Tipos de negociação"
        defaultOption="Selecione uma opção"
        onChange={handleChangeNegociacao}
        options={
          posts && posts.tiposNegociacao && posts.tiposNegociacao.length > 0
            ? posts.tiposNegociacao.map((tipo) => ({
                value: tipo.CODTIPVENDA,
                label: tipo.DESCRTIPVENDA,
              }))
            : [{ value: "", label: "Carregando" }]
        }
      />
    </div>
  );
};

export default SelectParametros;
