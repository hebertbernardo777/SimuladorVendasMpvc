import React from "react";
import Logo from "../../assets/fotos/maispvc-logo.svg";
import "./Login.css";
import { Link } from "react-router-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Digite um email válido")
          .required("Campo obrigatório"),
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
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                autoComplete="username"
              />
            </label>
            <ErrorMessage name="email" 
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

            <Link to="./orders">
            <button type="submit">Acessar</button>
            </Link>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default Login;
