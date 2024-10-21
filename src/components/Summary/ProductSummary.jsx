import React, { useContext } from "react";
import formatFirstLetter from "../../utils/FormatFirstLetter";
import formatCurrency from "../../utils/formatCurrency";
import "./ProductSummary.css";
import { ResumeContext } from "../../context/ResumeContext";

const ProductSummary = () => {
  const { discountResults } = useContext(ResumeContext);

  return (
    <div className="container-infos-line">
      {Object.entries(discountResults).map(([line, results]) => (
        <div className="infos-line" key={line}>
          <h4>{line}</h4>
          {results.categories &&
            Object.entries(results.categories).map(
              ([category, categoryData]) => (
                <div key={category}>
                  <p>
                    Valor {formatFirstLetter(String(category))}:{" "}
                    <span>
                      {formatCurrency(
                        Number(categoryData.totalOrdersCategory),
                        "BRL"
                      )}
                    </span>
                  </p>
                  <p>
                    Desconto {formatFirstLetter(String(category))}:{" "}
                    <span>{categoryData.discountCategory}</span>
                  </p>
                  <p>
                    Percentual de {formatFirstLetter(String(category))}:{" "}
                    <span>{categoryData.percentageCategory}</span>
                  </p>
                </div>
              )
            )}
          <div className="infos-results-total">
            <p>
              Desconto total da linha: <span>{results.discount}</span>
            </p>
            <p>
              Valor total da linha:
              <span>{formatCurrency(Number(results.ordersTotal), "BRL")}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSummary;
