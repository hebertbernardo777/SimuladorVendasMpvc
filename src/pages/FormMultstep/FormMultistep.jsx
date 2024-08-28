import { useContext } from "react";
import NewOrdes from "../newordes/NewOrdes";
import Products from "../produtcs/Products";
import CategoryProducts from "../categoryProducts/CategoryProducts";
import { AuthContext } from "../../context/AuthContext";
import NavBar from "../../components/header/NavBar";


const FormMultistep = () => {
  const { data, setData } = useContext(AuthContext);

  const { currentStep, setCurrentStep } = useContext(AuthContext);

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
    setCurrentStep((prev) => prev - 1);
  };

  const formComponents = [
    <NewOrdes handleNextStep={handleNextStep} />,
    <CategoryProducts
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <Products
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
  ];

  return (
<>

<div className="container-app">{formComponents[currentStep]}</div>
</>

) 
    
};

export default FormMultistep;
