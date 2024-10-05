import React from "react";
import "./ProductList.css";

const ProductList = ({ products, isActive, handleSelectProduct, letterInitial }) => {
  return (
    <>
      <ul>
        {(products || []).map((product) => (
          <div className="lists-container" key={product.CODPROD}>
            <div className="lists">
              <span>{letterInitial}</span>
            </div>
            <li
              className={isActive === product.CODPROD ? "active" : ""}
              onClick={() => {
                handleSelectProduct(product);
              }}
            >
              {product.DESCRPROD}
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default ProductList;

