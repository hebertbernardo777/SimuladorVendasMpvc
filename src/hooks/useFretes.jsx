import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import CheckBox from "../components/CheckBox/CheckBox";

const useFretes = () => {
  const {
    fretePercente,
    setFretePercente,
    freteselected,
    setFreteSelected,
    fretePriority,
    setFretePriority,
  } = useContext(DataContext);

  const handleSelectFreteChange = (value)=>{
    setFretePercente(value);
    setFretePriority("select")
  } 
  const handleChekckBoxFreteChange = (value)=>{
    setFreteSelected(value);
    
  }

  useEffect(()=>{
    const calcFreteFinal = fretePriority === "select" ? fretePercente : CheckBox;
  })



  return <div>useFretes</div>;
};

export default useFretes;
