import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NewOrdes from "../newordes/NewOrdes";
import Products from "../produtcs/Products";
import CategoryProducts from "../categoryProducts/CategoryProducts";

const FormMultistep = () => {
  const { currentStep,  selectedClient, data, cartItems } = useContext(AuthContext);
  const formComponents = [<NewOrdes client={selectedClient} data={data}/>, <CategoryProducts data={data} />, <Products  cart={cartItems}/>];

  return (
    <>
      <div className="container-app">{formComponents[currentStep]}</div>
    </>
  );
};

export default FormMultistep;
