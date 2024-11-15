import React, { useContext } from "react";
import SelectField from "../../components/select/SelectField";
import useOrders from "../../hooks/useOrders";
import { DataContext } from "../../context/DataContext";
import useRotas from "../../hooks/useRotas";

const SelectParametros = ({ setFieldValue }) => {
  const { posts, handleChangeNegociacao } = useOrders();
  const { setFreteSelected } = useContext(DataContext);

  return (
    <div>
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
        onChange={(e) => {
          const selectedValue = e.target.value;
          const selectedTipo = posts.tiposFaturamento.find(
            (tipo) => tipo.VALOR === selectedValue
          );
          const opcao = selectedTipo.OPCAO;
          setFieldValue("faturamentoLabel", opcao);
        }}
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
        onChange={(e) => {
          const selectedValue = e.target.value;
          const selectedTipo = posts.tipoFrete.find(
            (tipo) => tipo.VALOR === selectedValue
          );
          const opcao = selectedTipo.OPCAO;

          setFieldValue("freteLabel", opcao);

       
        }}
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
        onChange={(e) => {
          const selectedValue = e.target.value;
          const selectedTipo = posts.transportadoras.find(
            (tipo) => tipo.VALOR === selectedValue
          );
          const opcao = selectedTipo.OPCAO;
          setFieldValue("transportadoraLabel", opcao);
             // Limpa valores dos Checkboxes para evitar conflitos
             setFieldValue("valorFinal", false);
             setFieldValue("textValorFinal", "");
             setFieldValue("freteNegociado", false);
             setFieldValue("textSomarFrete", "");
             setFreteSelected("");
        }}
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
        onChange={(e) => handleChangeNegociacao(e, setFieldValue)} // Corrigido aqui
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
