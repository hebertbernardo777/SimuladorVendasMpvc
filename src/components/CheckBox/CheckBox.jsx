import { ErrorMessage, Field } from "formik";
import React, { useContext, useEffect } from "react";
import formatCurrency from "../../utils/formatCurrency";
import "./CheckBox.css";
import CurrencyInput from "react-currency-input-field";
import { DataContext } from "../../context/DataContext";

const CheckBox = ({ setFieldValue, values }) => {
  const { setFrete } = useContext(DataContext); // Obtém setFrete do contexto

  const handleCheckboxChange = (name) => {
    const newValue = !values[name];
    setFieldValue(name, newValue);

    if (name === "valorFinal" && newValue) {
      setFieldValue("freteNegociado", false);
      setFieldValue("textSomarFrete", "");
    } else if (name === "freteNegociado" && newValue) {
      setFieldValue("valorFinal", false);
      setFieldValue("textValorFinal", "");
    }

    calcularFrete({ ...values, [name]: newValue });
  };

  const calcularFrete = (values) => {
    let valueFretecalc = 0;
    let unidade = ""; // Para armazenar o tipo de unidade (R$ ou %)

    if (values.valorFinal) {
      valueFretecalc =
        parseFloat(
          values.textValorFinal
            .replace("R$ ", "")
            .replace(".", "")
            .replace(",", ".")
        ) || 0;
      unidade = "R$";
    } else if (values.freteNegociado) {
      valueFretecalc = parseFloat(values.textSomarFrete) || 0;
      unidade = "%";
    }

    // Formatação
    if (unidade === "R$") {
      valueFretecalc = formatCurrency(valueFretecalc, "BRL");
    } else {
      valueFretecalc = `${valueFretecalc} ${unidade}`;
    }

    setFrete(valueFretecalc); // Salva o valor formatado no estado global
    console.log(valueFretecalc); // Exibe o valor formatado no console
  };

  useEffect(() => {
    calcularFrete(values);
  }, [
    values.valorFinal,
    values.freteNegociado,
    values.textValorFinal,
    values.textSomarFrete,
  ]);

  return (
    <div className="form-group-checkbox">
      <div>
        <div className="checkbox-infos">
          <Field
            type="checkbox"
            name="valorFinal"
            id="valor-final"
            checked={values.valorFinal || false}
            onChange={() => handleCheckboxChange("valorFinal")}
          />
          <label htmlFor="valor-final">
            Adicionar valor final de frete R$ 'Carga fechada ou negociada'
          </label>
        </div>
        <ErrorMessage name="valorFinal" component="div" className="errors" />
        {values.valorFinal && (
          <div className="input-text-checked">
            <CurrencyInput
              name="textValorFinal"
              placeholder="R$ "
              decimalsLimit={2}
              decimalScale={2}
              allowNegativeValue={false}
              decimalSeparator=","
              groupSeparator="."
              prefix="R$ "
              value={values.textValorFinal}
              onValueChange={(value) => {
                setFieldValue("textValorFinal", value);
                calcularFrete(values); // Atualiza o cálculo ao mudar o valor
              }}
            />
          </div>
        )}
      </div>
      <div>
        <div className="checkbox-infos">
          <Field
            type="checkbox"
            name="freteNegociado"
            id="frete-negociado"
            checked={values.freteNegociado || false}
            onChange={() => handleCheckboxChange("freteNegociado")}
          />
          <label htmlFor="frete-negociado">
            Somar % de frete negociado em valor de produtos
          </label>
        </div>
        <ErrorMessage
          name="freteNegociado"
          component="div"
          className="errors"
        />
      </div>
      {values.freteNegociado && (
        <div className="input-text-checked">
          <CurrencyInput
            name="textSomarFrete"
            placeholder="R$ "
            decimalsLimit={2}
            decimalScale={2}
            allowNegativeValue={false}
            decimalSeparator=","
            groupSeparator="."
            prefix=" % "
            value={values.textSomarFrete}
            onValueChange={(value) => {
              setFieldValue("textSomarFrete", value);
              calcularFrete(values); // Atualiza o cálculo ao mudar o valor
            }}
          />
        </div>
      )}
      <div>
        <div className="checkbox-infos">
          <Field
            type="checkbox"
            name="consultarST"
            id="consultarST"
            checked={values.consultarST || false}
            onChange={() => handleCheckboxChange("consultarST")}
          />
          <label htmlFor="consultarST">Consultar ST para orçamento</label>
        </div>
        <ErrorMessage name="consultarST" component="div" className="errors" />
      </div>
      {values.consultarST && (
        <div className="input-checked-consulta">
          <label>
            <Field type="radio" name="selectOpcoes" value="simplesNacional" />
            Simples Nacional
          </label>
          <label>
            <Field type="radio" name="selectOpcoes" value="atacadista" />
            Atacadista
          </label>
          <label>
            <Field
              type="radio"
              name="selectOpcoes"
              value="demaisContibuintes"
            />
            Demais Contribuintes
          </label>
        </div>
      )}
    </div>
  );
};

export default CheckBox;
