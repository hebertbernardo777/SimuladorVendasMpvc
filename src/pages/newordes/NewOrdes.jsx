import React, { useEffect } from "react";
import Modal from "../../components/modal/Modal";
import FormOrdes from "./form/FormOrders";
import Button from "../../components/Button/Button";
import SelectField from "../../components/select/SelectField";
import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { api } from "../../lib/parametros";
import { FaCheck } from "react-icons/fa";
import "./NewOrdes.css";

const NewOrdes = () => {
  const {
    data,
    setData,
    loading,
    setLoading,
    selectedClient,
    clientNoRegister,
  } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [valorFinalChecked, setValorFinalChecked] = useState(false);
  const [freteNegociadoChecked, setFreteNegociadoChecked] = useState(false);
  const [consultaSTChecked, setConsultaSTChecked] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.toJSON());
        setLoading(false);
      });
  }, []);

  if (loading) return <p>carregando</p>;

  const validateClientSelection = () => {
    if (!selectedClient && !clientNoRegister) {
      setValidationError(true);
      alert("Selecione um cliente");
      return false;
    }
    setValidationError(false);
    return true;
  };

  const handleSubmit = (values) => {
    console.log("Form values on submit:", values);
    if (!validateClientSelection()) {
      return;
    }
    setData({ ...data, ...values });
    Navigate("/category");
  };

  return (
    <>
      <Formik
        initialValues={data}
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
        {({ setFieldValue }) => {
          const handleValorFinalChange = () => {
            setValorFinalChecked(!valorFinalChecked);
            setFieldValue("valorFinal", !valorFinalChecked);

            if (!valorFinalChecked) {
              setFreteNegociadoChecked(false);
              setFieldValue("freteNegociado", false);
            }
          };

          const handleFreteNegociadoChange = () => {
            setFreteNegociadoChecked(!freteNegociadoChecked);
            setFieldValue("freteNegociado", !freteNegociadoChecked);

            if (!freteNegociadoChecked) {
              setValorFinalChecked(false);
              setFieldValue("valorFinal", false);
            }
          };

          const handleConsultaSTChange = () => {
            setConsultaSTChecked(!consultaSTChecked);
            setFieldValue("consultarST", !consultaSTChecked);
          };

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
                <SelectField
                  name="tipoVenda"
                  label="Tipo de venda"
                  defaultOption="Selecione uma opção"
                  options={[
                    { value: "pedido", label: "Pedido de venda" },
                    { value: "orcamento", label: "Orçamento de venda" },
                  ]}
                />
                <div className="form-group">
                  <SelectField
                    name="faturamento"
                    label="Faturamento"
                    defaultOption="Selecione uma opção"
                    options={
                      posts.length === 0
                        ? [{ value: "", label: "carregando" }]
                        : posts.tiposFaturamento.map((tipo) => ({
                            value: tipo.VALOR,
                            label: tipo.OPCAO,
                          }))
                    }
                  />
                </div>
                <div className="form-group">
                  <SelectField
                    name="frete"
                    label="Frete"
                    id="frete"
                    defaultOption="Selecione uma opção"
                    options={
                      posts.length === 0
                        ? [{ value: "", label: "Carregando" }]
                        : posts.tiposFaturamento.map((tipo) => ({
                            value: tipo.VALOR,
                            label: tipo.OPCAO,
                          }))
                    }
                  />
                </div>
                <div className="form-group">
                  <SelectField
                    name="transportadora"
                    label="Transportadora"
                    defaultOption="Selecione uma opção"
                    options={
                      posts.length === 0
                        ? [{ value: "", label: "Carregando" }]
                        : posts.transportadoras.map((tipo) => ({
                            value: tipo.VALOR,
                            label: tipo.OPCAO,
                          }))
                    }
                  />
                </div>
                <div className="form-group">
                  <SelectField
                    name="negociacao"
                    label="Tipos de negociacão"
                    defaultOption="Selecione uma opção"
                    options={
                      posts.length === 0
                        ? [{ value: "", label: "Carregando" }]
                        : posts.tiposNegociacao.map((tipo) => ({
                            value: tipo.CODTIPVENDA,
                            label: tipo.DESCRTIPVENDA,
                          }))
                    }
                  />
                </div>
                <div className="form-group-checkbox">
                  <div>
                    <div className="checkbox-infos">
                      <Field
                        type="checkbox"
                        name="valorFinal"
                        id="valor-final"
                        checked={valorFinalChecked}
                        onChange={handleValorFinalChange}
                      />
                      <label htmlFor="valor-final">
                        Adicionar valor final de frete R$ 'Carga fechada ou
                        negociada'
                      </label>
                    </div>
                    <ErrorMessage
                      name="valorFinal"
                      component="div"
                      className="errors"
                    />
                    {valorFinalChecked && (
                      <div className="input-text-checked">
                        <Field
                          type="text"
                          name="textValorFinal"
                          placeholder="R$:"
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
                        checked={freteNegociadoChecked}
                        onChange={handleFreteNegociadoChange}
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
                  {freteNegociadoChecked && (
                    <div className="input-text-checked">
                      <Field
                        type="text"
                        name="textSomarFrete"
                        placeholder="0"
                      />
                    </div>
                  )}
                  <div>
                    <div className="checkbox-infos">
                      <Field
                        type="checkbox"
                        name="consultarST"
                        id="consultarST"
                        checked={consultaSTChecked}
                        onChange={handleConsultaSTChange}
                      />
                      <label htmlFor="consultarST">
                        Consultar ST para orçamento
                      </label>
                    </div>
                    <ErrorMessage
                      name="ConsultaST"
                      component="div"
                      className="errors"
                    />
                  </div>
                  {consultaSTChecked && (
                    <div className="input-checked-consulta">
                      <label>
                        <Field
                          type="radio"
                          name="selectOpcoes"
                          value="simplesNacional"
                        />
                        Simples Nacional
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="selectOpcoes"
                          value="atacadista"
                        />
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

export default NewOrdes;
