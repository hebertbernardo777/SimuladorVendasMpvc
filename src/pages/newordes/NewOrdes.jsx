import React from "react";
import Modal from "../../components/modal/Modal";
import FormOrdes from "./form/FormOrders";
import { useContext, useState } from "react";
import dataValue from "../../data/data.json";
import Button from "../../components/Button/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./NewOrdes.css";
import { AuthContext } from "../../context/AuthContext";

const NewOrdes = (props) => {
  const { data, setData } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  

  const handleSubmit = (values) => {
    console.log("Form values on submit:", values);
    props.handleNextStep(values);
  
  };

  return (
    <>
      <Formik
        initialValues={data}
        validationSchema={Yup.object({
          tipoVenda: Yup.string().required("Requerido"),
          faturamento: Yup.string().required("Requerido"),
          frete: Yup.string().required("Requerido"),
          transportadora: Yup.string().required("Requerido"),
          negociacao: Yup.string().required("Requerido"),
          valorFinal: Yup.boolean().oneOf([true], "marque a opção"),
          freteNegociado: Yup.boolean().oneOf([true], "marque a opção"),
          consultarST: Yup.boolean().oneOf([true], "marque a opção"),
          observacoes: Yup.string(),
          search: Yup.string(),
          customerRegistration: Yup.boolean().oneOf([true]),
          namePartners: Yup.string(),
          typePartners: Yup.string(),
          ufPartners: Yup.string(),
          suframa: Yup.string(),
        })}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <div className="container-orders">
            <Form className="form">
              <h1>Novo Pedido</h1>
              <Button
                type="Button"
                onClick={() => setOpenModal(true)}
                className="btn"
              >
                Selecionar Parceiro
              </Button>
              <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(!openModal)}
              >
                <FormOrdes setFieldValue={setFieldValue} />
              </Modal>
              <div>
                <div className="form-group">
                  <label>Tipo de venda</label>
                  <Field as="select" name="tipoVenda" id="tipo-venda">
                    <option value="">Selecione um tipo de venda</option>
                    <option value="pedido">Pedido de venda</option>
                    <option value="orcamento">Orçamento de venda</option>
                  </Field>
                  <ErrorMessage
                    name="tipoVenda"
                    component="div"
                    className="errors"
                  />
                </div>
              </div>

              <div>
                <div className="form-group">
                  <label>Faturamento</label>
                  <Field as="select" name="faturamento" id="faturamento">
                    <option value="">Selecione um tipo de faturamento</option>
                    {dataValue.tiposFaturamento.map((tiposFaturamento) => (
                      <option key={tiposFaturamento.VALOR}>
                        {tiposFaturamento.OPCAO}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="faturamento"
                    component="div"
                    className="errors"
                  />
                </div>
              </div>

              <div>
                <div className="form-group">
                  <label>Modalidade de frete</label>
                  <Field as="select" name="frete" id="frete">
                    <option value="">Selecione uma modalidade de frete</option>
                    {dataValue.tipoFrete.map((tipoFrete) => (
                      <option key={tipoFrete.VALOR}>{tipoFrete.OPCAO}</option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="frete"
                    component="div"
                    className="errors"
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label>Transportadora</label>
                  <Field as="select" name="transportadora" id="transportadora">
                    <option value="">Selecione uma transportadora</option>
                    {dataValue.transportadoras.map((transportadora) => (
                      <option key={transportadora.VALOR}>
                        {transportadora.OPCAO}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="transportadora"
                    component="div"
                    className="errors"
                  />
                </div>
              </div>

              <div>
                <div className="form-group">
                  <label>Tipo de negociação</label>
                  <Field as="select" name="negociacao" id="negociacao">
                    <option value="">Selecione um tipo de negociação</option>
                    {dataValue.tiposNegociacao.map((tiposNegociacao) => (
                      <option key={tiposNegociacao.CODTIPVENDA}>
                        {tiposNegociacao.DESCRTIPVENDA}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="negociacao"
                    component="div"
                    className="errors"
                  />
                </div>
              </div>

              <div>
                <div className="form-group-checkbox">
                  <div>
                    <Field type="checkbox" name="valorFinal" id="valor-final" />
                    <label htmlFor="valor-final">
                      Adicionar valor final de frete R$ 'Carga fechada ou
                      negociada'
                    </label>
                    <ErrorMessage
                      name="valorFinal"
                      component="div"
                      className="errors"
                    />
                  </div>

                  <div>
                    <Field
                      type="checkbox"
                      name="freteNegociado"
                      id="frete-negociado"
                    />
                    <label htmlFor="frete-negociado">
                      Somar % de frete negociado em valor de produtos
                    </label>
                    <ErrorMessage
                      name="freteNegociado"
                      component="div"
                      className="errors"
                    />
                  </div>
                  <div>
                    <Field
                      type="checkbox"
                      name="consultarST"
                      id="consultarST"
                    />
                    <label htmlFor="consultarST">
                      Consultar ST para orçamento
                    </label>
                    <ErrorMessage
                      name="ConsultaST"
                      component="div"
                      className="errors"
                    />
                  </div>
                </div>
              </div>

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
                  <Button className="btn" type="Submit" children={"Avançar"} />
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default NewOrdes;
