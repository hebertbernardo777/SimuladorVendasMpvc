import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Field, ErrorMessage } from "formik";
import dataEstados from "../../../data/estados.json";
import "./FormOrders.css";
import Search from "../../../components/Search/Search";
import Clients from "../../Clients/Clients";

const FormOrders = ({ setFieldValue, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setFieldValue("customerRegistration", !isChecked);
  };

  return (
    <>
      <div className="container-form">
        <div className="form-partners">
          <h1>Seleção de Parceiros</h1>
          <div className="container-checked">
            <Field
              type="checkbox"
              name="customerRegistration"
              id="customer-registration"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="customer-registration"
              id="customer-registration-label"
            >
              Cliente sem cadastro
            </label>
          </div>
          {isChecked && (
            <div className="container-checked-form">
              <div className="form-group">
                <Field
                  type="text"
                  name="namePartners"
                  id="name-partners"
                  placeholder="Nome do parceiro"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Tipo de Parceiro</label>
                <Field as="select" name="typePartners" id="type-partners">
                  <option value="type-partners">
                    classificação de ICMS do parceiro
                  </option>
                </Field>
              </div>
              <div className="form-group">
                <label>UF do Parceiro</label>
                <Field as="select" name="ufPartners" id="uf-partners">
                  <option value="uf-partners">UF do Parceiro</option>
                  {dataEstados.estados.map((estados) => (
                    <option key={estados.siglas}>{estados.sigla}</option>
                  ))}
                </Field>
              </div>
              <div className="form-group">
                <label>Suframa</label>
                <Field as="select" name="suframa" id="suframa">
                  <option value="suframa">Selecione a Suframa</option>
                  <option value="nao-optante">Não Optante</option>
                  <option value="isento-todos">
                    Isento de todos os impostos
                  </option>
                  <option value="isento-ICMSIPI">Isento ICMS/IPI</option>
                  <option value="isento-IPI">Isento IPI</option>
                </Field>
              </div>
            </div>
          )}
        </div>
        {!isChecked && <Clients style={{ height: '400px' }} onClose={onClose}/>}
      </div>
    </>
  );
};

export default FormOrders;
