import React, { useContext } from "react";
import "./Summary.css";
import Button from "../Button/Button";
import { AuthContext } from "../../context/AuthContext";

const Summary = () => {
  const { data, products } = useContext(AuthContext);
  const { selectedCategory, setSelectedCategory } = useContext(AuthContext);
  const { selectedProduct, setSelectedProduct } = useContext(AuthContext);
  const {imagePath, setImagePath} = useContext(AuthContext);


  
   return (
    <div className="container-summary">
      <h3>Resumo da compra</h3>
      <div className="products-summary">
        <div>
          <img src={imagePath} alt="imagem do produto" />
        </div>
        <div>
          <p>{selectedProduct}</p>
          <p>Quantidade</p>
          <div className="summary-buy">
            <p>Preço</p><span>R$: 33</span>
          </div>
        </div>
      </div>
      <div className="summary-discount">
        <div className="infos-summary">
          <p>Frete</p> <span>5</span>
        </div>
        <div className="infos-summary">
          <p>Descontos aplicados</p><span>5</span>
        </div>
        <div className="infos-summary">
          <p>Total</p><span>5</span>
        </div>
      </div>

      <div className="summary-btn">
        <Button className="btn" children={"Finalizar Compra"} />
      </div>

      <div className="drafts">
        <a href="#">
          <p>Salvar Rascunho</p>
        </a>
      </div>
    </div>
  );
};

export default Summary;
