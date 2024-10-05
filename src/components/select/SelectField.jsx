import React from "react";
import { Field, ErrorMessage } from "formik";
import "./SelectField.css";

const SelectField = ({ name, label, options, onChange, defaultOption}) => {
  const handleChange = (event, form) => {
    const { value } = event.target;
    form.setFieldValue(name, value); // Atualiza o valor do Formik
    if (onChange) {
      onChange(event); // Executa o onChange personalizado
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field name={name} >
        {({ field, form }) => (
          <select {...field} id={name} onChange={(e) => handleChange(e, form)}>
            <option value="">{defaultOption}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="errors" />
    </div>
  );
};

export default SelectField;
