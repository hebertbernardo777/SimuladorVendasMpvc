import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/fotos/maispvc-logo.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { AuthContext } from "../../context/AuthContex";
import * as Yup from "yup";
import "./Login.css";

const Login = () => {
  const { signIn, signed } = useContext(AuthContext);
  const navigate = useNavigate();
  
  if (signed) {
    return <Navigate to="/" />;
  }

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
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const success = await signIn(values.user, values.password);
          if (success) {
            navigate("/");
          } else {
            setErrors({ password: "Usuário ou senha inválidos" });
          }
        } catch (error) {
                  setErrors({ password: "Usuário ou senha inválidos" });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="container">
          <div className="container-login">
            <img src={Logo} alt="logo mais PVC" />
            <Form className="container-form-login">
              <label>
                <Field
                  id="user"
                  name="user"
                  type="text"
                  placeholder="Digite seu usuário"
                  autoComplete="username"
                />
              </label>
              <ErrorMessage name="user" component="div" className="errors" />
              <label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                />
              </label>
              <ErrorMessage name="password" component="div" className="errors" />
              
              <button type="submit" disabled={isSubmitting}>
                Acessar
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
