import React, { useContext, useEffect } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import dataEstados from "../../../data/estados.json";
import "./FormOrders.css";
import Clients from "../../Clients/Clients";
import Button from "../../../components/Button/Button";
import { AuthContext } from "../../../context/AuthContext";
import * as Yup from "yup";
import ClientNoRegister from "../../Clients/ClientsNoRegister/ClientNoRegister";

const FormOrders = ({ onClose }) => {
  const {
    data,
    isChecked,
    setIsChecked,
    setClientNoRegister,
    setSelectedClient,
    setData,
    clientNoRegister,
  } = useContext(AuthContext);

  const handleCheckboxChange = (setFieldValue, values) => {
    if (!isChecked) {
      setSelectedClient(null);
      setFieldValue("namePartners", clientNoRegister || values.namePartners);
    }
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      console.log("Checkbox marcado, cliente sem cadastro ativo.");
      setSelectedClient(null);
    }
  }, [isChecked, setSelectedClient]);

  return (
    <Formik
      initialValues={data}
      validationSchema={Yup.object({
        customerRegistration: Yup.boolean(),
        namePartners: Yup.string().required("Campo obrigatório"),
        typePartners: Yup.string().required("Campo obrigatório"),
        ufPartners: Yup.string().required("Campo obrigatório"),
        suframa: Yup.string().required("Campo obrigatório"),
      })}
      onSubmit={(values) => {
        console.log("Form values on submit:", values);
        setData({ ...data, ...values });
        onClose();
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <div className="container-form">
          <div className="form-partners">
            <h1>Seleção de Parceiros</h1>
            <div className="container-checked">
              <Field
                type="checkbox"
                name="customerRegistration"
                id="customer-registration"
                checked={isChecked}
                onChange={() => handleCheckboxChange(setFieldValue, values)}
              />
              <label
                htmlFor="customer-registration"
                id="customer-registration-label"
              >
                Selecione Cliente sem cadastro
              </label>
            </div>
            {isChecked && (
              <div className="container-checked-form">
                <ClientNoRegister
                  values={values}
                  setFieldValue={setFieldValue}
                  setClientNoRegister={setClientNoRegister}
                />
                <Button className="btn" type="button" onClick={handleSubmit}>
                  Confirmar
                </Button>
              </div>
            )}
          </div>
          {!isChecked && (
            <Clients style={{ height: "400px" }} onClose={onClose} />
          )}
        </div>
      )}
    </Formik>
  );
};

export default FormOrders;
