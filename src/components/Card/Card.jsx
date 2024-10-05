import React from "react";
import "./Card.css";

const Card = ({ title, discount, image }) => {
  return (
    <>
      <div className="container-card">
        <h3>{title}</h3>
        <div className="card-info">
          <img src={image} alt="" />
          <p className="title-discount">
            {discount !== undefined && discount !== null
              ? Number.isInteger(parseFloat(discount)) ? parseFloat(discount) 
              : parseFloat(discount).toFixed(2) : ""} %</p>
        </div>
      </div>
    </>
  );
};

export default Card;
