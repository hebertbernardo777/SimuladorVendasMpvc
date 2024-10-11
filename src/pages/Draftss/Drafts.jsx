import { useState, useEffect, useContext } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiChevronRightCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./Drafts.css";

const Drafts = () => {
  const { setCurrentStep, setSelectedClient, setData, setCartItems } =
    useContext(DataContext);
  const [savedData, setSavedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("pedido") || "[]");
    setSavedData(dataLocalStorage);
  }, []);

  const handleRemoveItem = (id) => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("pedido") || "[]");
    const updatedData = dataLocalStorage.filter((item) => item.id !== id);
    setSavedData(updatedData);
    localStorage.setItem("pedido", JSON.stringify(updatedData));
  };

  const handleLoadDraft = (pedido, redirectToForm = true) => {
    setSelectedClient(pedido.client );
    setData(pedido.form);
    setCartItems(pedido.cart);
    setCurrentStep(pedido.currentStep || 0);

    if (redirectToForm) {
      setTimeout(() => {
        navigate("/");
      }, 100);
    } else {
      setTimeout(() => {
        navigate("/resumedrafts");
      }, 100);
    }
  };

  return (
    <div className="drafts-container">
      <h1>Rascunho do Pedido</h1>
      {savedData.length > 0 ? (
        savedData.map((pedido) => (
          <div key={pedido.id} className="drafts">
            <div className="resume">
              <p>Cliente: </p>
              <span>
                {pedido.client
                  ? pedido.client.RAZAOSOCIAL || pedido.client
                  : "Cliente não disponível"}
              </span>
            </div>
            <div className="resume">
              <p>Data do pedido:</p>
              <span>{pedido.dateSaved || "Data não disponível"}</span>
            </div>
            <FaRegTrashCan
              className="delete-orders"
              onClick={() => handleRemoveItem(pedido.id)}
            />
            <BiChevronRightCircle
              className="loading-orders"
              onClick={() => handleLoadDraft(pedido)}
            />
            <div className="resume-btn">
              <a href="#" onClick={() => handleLoadDraft(pedido, false)}>
                Ver resumo do pedido
              </a>
            </div>
          </div>
        ))
      ) : (
        <p>Não há pedidos salvos</p>
      )}
    </div>
  );
};

export default Drafts;
