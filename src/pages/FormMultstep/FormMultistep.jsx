import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import NewOrders from "../neworders/NewOrders";
import Products from "../produtcs/Products";
import CategoryProducts from "../categoryProducts/CategoryProducts";

const FormMultistep = () => {
  const { currentStep,  selectedClient, data, cartItems } = useContext(DataContext);
  const formComponents = [<NewOrders client={selectedClient} data={data}/>, <CategoryProducts data={data} />, <Products  cart={cartItems}/>];

  return (
    <>
      <div className="container-app">{formComponents[currentStep]}</div>
    </>
  );
};

export default FormMultistep;
