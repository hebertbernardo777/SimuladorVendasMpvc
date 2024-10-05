import React, { useState, useEffect } from "react";
import Logo from "../../assets/fotos/maispvc-logo.svg";
import "./Login.css";
import { Link } from "react-router-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "../../lib/login";

const Login = () => {

  const user = ""; // Defina o usuário
  const password = ""; // Defina a senha

  useEffect(() => {
    api.post("/", {
      user,
      password, // Corrigido o erro de digitação
    })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      console.error("Houve um erro no login!", error);
    });
  }, []);

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
      }}
      validationSchema={Yup.object({
        user: Yup.string().required("Campo obrigatório"),
        password: Yup.string().required("Campo obrigatório"),
      })}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
        console.log(values)
      }}
    >
      <div className="container">
        <div className="container-login">
          <img src={Logo} alt="logo mais PVC" />
          <Form className="container-form">
            <label>
              <Field
                id="user"
                name="user"
                type="text"
                placeholder="Digite seu usuário"
                autoComplete="username"
              />
            </label>
            <ErrorMessage name="user" 
           component="div" className="errors" />
            <label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                autoComplete="current-password"
              />
            </label>
            <ErrorMessage name="password" component="div" className="errors"/>

            <Link to="/orders">
            <button type="submit">Acessar</button>
            </Link>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default Login;
