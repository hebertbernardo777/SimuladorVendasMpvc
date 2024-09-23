import React from "react";
import "./Card.css";

const Card = ({ title, discount, image }) => {
  return (
    <>
      <div className="container-card">
        <h3>{title}</h3>
        <div className="card-info">
          <img src={image} alt="" />
          <p className="title-discount"> {discount} %</p>
        </div>
      </div>
     
    </>
  );
};

export default Card;
