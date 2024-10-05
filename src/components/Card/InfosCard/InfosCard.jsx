import React, { useContext } from "react";
import Card from "../Card";
import { AuthContext } from "../../../context/AuthContext";

const InfosCard = () => {

  const { discountResults } = useContext(AuthContext);

  const infoCards = [
    { nome: "Linha Forro", image: "forro.jpeg", line: "LINHA DE FORRO PVC" },
    { nome: "Linha Predial", image: "predial.jpeg", line: "LINHA PREDIAL" },
    {
      nome: "Linha Eletrodutos",
      image: "corrugado.jpeg",
      line: "LINHA ELETRODUTOS",
    },
    {
      nome: "Linha Irrigação",
      image: "irrigacao.jpeg",
      line: "LINHA IRRIGACAO",
    },
    {
      nome: "Linha Reservatorios",
      image: "reservatorios.jpeg",
      line: "LINHA DE RESERVATORIOS",
    },
  ];

  return (
    <div className="cards">
      {infoCards.map((item) => {
        const discountInfo = discountResults[item.line] || { discount: 0 }; // Garantindo que sempre haja um desconto
        return (
          <Card
            key={item.nome}
            title={item.nome}
            image={`/fotos/${item.image}`}
            discount={discountInfo.discount}
          />
        );
      })}
    </div>
  );
};

export default InfosCard;
