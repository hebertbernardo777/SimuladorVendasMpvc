import { useContext } from "react";
import NavBar from "./components/header/NavBar";
import NewOrdes from "./pages/newordes/NewOrdes";
import Products from "./pages/produtcs/Products";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts";
import { AuthContext } from "./context/AuthContext";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const { data, setData } = useContext(AuthContext);

  const {currentStep, setCurrentStep} = useContext(AuthContext);

 

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
    <CategoryProducts handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />,
    <Products handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />,
  ];

  return (
    <>
      <NavBar />
      <main>{/* <Outlet/> */}</main>
      <div className="container-app">{formComponents[currentStep]}</div>
    </>
  );
}

export default App;
