import React from "react";
import "./List.css";

const List = ({ children }) => {
  return (
    <div className="lists-container">
      <ul className="lista">
        <li>{children}</li>
      </ul>
    </div>
  );
};

export default List;
