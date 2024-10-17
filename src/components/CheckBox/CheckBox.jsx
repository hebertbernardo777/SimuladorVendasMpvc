import { ErrorMessage, Field } from "formik";
import React from "react";
import "./CheckBox.css";

const CheckBox = ({ setFieldValue, values }) => {
  const handleCheckboxChange = (name) => {
    const newValue = !values[name];
    setFieldValue(name, newValue);

    if (name === "valorFinal" && newValue) {
      setFieldValue("freteNegociado", false);
    } else if (name === "freteNegociado" && newValue) {
      setFieldValue("valorFinal", false);
    }
  };

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
            <Field type="text" name="textValorFinal" placeholder="R$:" />
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
          <Field type="text" name="textSomarFrete" placeholder="0" />
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
