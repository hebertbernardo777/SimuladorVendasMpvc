import React from 'react';
import { Field } from "formik";
import './Search.css'
import { IoMdSearch } from "react-icons/io";

const Search = ({ id, name, label, placeholder, type, value, onChange}) => {
  return (
    <div className='input-search'>
    <label>{label} </label>
      <Field 
        id={id} 
        name={name} 
        placeholder={placeholder} 
        type={type}
        value={value}
        onChange={onChange}        
      />
        <IoMdSearch className="icon" />
    </div>
  );
}

export default Search;