import React from "react";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../../components/modal/Modal";
import FormOrdes from "./form/FormOrders";
import Button from "../../components/Button/Button";
import SelectParametros from "../../components/SelectParametros/SelectParametros";
import CheckBox from "../../components/CheckBox/CheckBox";
import useOrders from "../../hooks/useOrders";
import { FaCheck } from "react-icons/fa";
import * as Yup from "yup";
import "./NewOrders.css";

const NewOrders = () => {
  const { data, selectedClient, clientNoRegister } = useContext(DataContext);
  const [openModal, setOpenModal] = useState(false);
  const { handleSubmit } = useOrders();

   return (
    <>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={Yup.object({
          tipoVenda: Yup.string(),
          faturamento: Yup.string(),
          frete: Yup.string(),
          transportadora: Yup.string(),
          negociacao: Yup.string(),
          valorFinal: Yup.boolean(),
          freteNegociado: Yup.boolean(),
          consultarST: Yup.boolean(),
          observacoes: Yup.string(),
          search: Yup.string(),
        })}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => {
          return (
            <div className="container-orders">
              <Form className="form">
                <h1>Novo Pedido</h1>
                <Button
                  type="Button"
                  onClick={() => setOpenModal(true)}
                  className="btn"
                  children={"Selecione Parceiro"}
                />
                <Modal
                  isOpen={openModal}
                  onClose={() => setOpenModal(!openModal)}
                >
                  <FormOrdes
                    setFieldValue={setFieldValue}
                    onClose={() => setOpenModal(false)}
                  />
                </Modal>
                <div>
                  {selectedClient ? (
                    <div className="parceiro-selected">
                      <div className="selected">
                        <FaCheck /> <p>Parceiro selecionado:</p>
                      </div>
                      <p>{selectedClient.RAZAOSOCIAL}</p>{" "}
                    </div>
                  ) : clientNoRegister ? (
                    <div className="parceiro-selected">
                      <div className="selected">
                        <FaCheck /> <p>Parceiro sem cadastro selecionado:</p>
                      </div>
                      <p> {clientNoRegister.toUpperCase()}</p>{" "}
                    </div>
                  ) : null}
                </div>
                <SelectParametros />
                <CheckBox setFieldValue={setFieldValue} values={values} />
                <div>
                  <div className="form-group">
                    <label>Observações:</label>
                    <Field
                      as="textarea"
                      name="observacoes"
                      id="observacoes"
                      placeholder="Observações do pedido"
                    ></Field>
                  </div>
                  <div className="btn-steps">
                    <Button
                      className="btn"
                      type="Submit"
                      children={"Avançar"}
                    />
                  </div>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default NewOrders;
