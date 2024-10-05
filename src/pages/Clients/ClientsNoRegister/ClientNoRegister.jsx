import React from "react";
import { Field, ErrorMessage } from "formik";
import dataEstados from "../../../data/estados.json";
import "./ClientNoRegister.css";

const ClientNoRegister = ({ values, setFieldValue, setClientNoRegister }) => {
  return (
    <div className="container-no-register">
      <div className="form-group">
        <Field
          type="text"
          name="namePartners"
          id="name-partners"
          placeholder="Nome do parceiro"
          value={values.namePartners}
          onChange={(e) => {
            setFieldValue("namePartners", e.target.value);
            setClientNoRegister(e.target.value);
          }}
        />
        <ErrorMessage name="namePartners" component="div" className="errors" />
      </div>
      <div className="form-group">
        <label htmlFor="type-partners">Tipo de Parceiro</label>
        <Field as="select" name="typePartners" id="type-partners">
          <option value="">Selecione...</option>
          <option value="revendedor">Revendedor</option>
          <option value="consumidorFinal">Consumidor Final</option>
          <option value="construtorSemCei">Construtor sem CEI</option>
          <option value="construtorComCei">Construtor com CEI</option>
        </Field>
        <ErrorMessage name="typePartners" component="div" className="errors" />
      </div>
      <div className="form-group">
        <label htmlFor="uf-partners">UF do Parceiro</label>
        <Field as="select" name="ufPartners" id="uf-partners">
          <option value="">UF do Parceiro</option>
          {dataEstados.estados.map((estados) => (
            <option key={estados.sigla} value={estados.sigla}>
              {estados.sigla}
            </option>
          ))}
        </Field>
        <ErrorMessage name="ufPartners" component="div" className="errors" />
      </div>
      <div className="form-group">
        <label htmlFor="suframa">Suframa</label>
        <Field as="select" name="suframa" id="suframa">
          <option value="">Selecione a Suframa</option>
          <option value="nao-optante">Não Optante</option>
          <option value="isento-todos">Isento de todos os impostos</option>
          <option value="isento-ICMSIPI">Isento ICMS/IPI</option>
          <option value="isento-IPI">Isento IPI</option>
        </Field>
        <ErrorMessage name="suframa" component="div" className="errors" />
      </div>
    </div>
  );
};

export default ClientNoRegister;
