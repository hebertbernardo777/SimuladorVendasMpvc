import { Field } from "formik";
import React from "react";

const ListSuspended = (props) => {
  return (
    <div>
      <select>{props.label}</select>
      <Field as="select">
        {props.estados.map((estados) => (
          <option key={estados.siglas}>{estados.sigla}</option>
        ))}
      </Field>
    </div>
  );
};

export default ListSuspended;
