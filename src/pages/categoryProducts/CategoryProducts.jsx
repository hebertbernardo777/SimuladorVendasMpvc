import { React, useState, useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

import DataProducts from "../../data/produtcs.json";
import * as Yup from "yup";
import "./CategoryProducts.css";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/AuthContext";
import Search from "../../components/Search/Search";

const CategoryProducts = (props) => {
  const { data} = useContext(AuthContext);

 const { selectedCategory, setSelectedCategory, letterInitial, setLetterInitial } = useContext(AuthContext);
  const {selectedProduct, setSelectedProduct} =useContext(AuthContext);
  const [search, setSearch] = useState("");
 
 

  const rows = DataProducts.rows;

  const categories = Object.keys(
    rows.reduce((acc, rows) => ({...acc,[rows.AD_SUBGRUPO]: true,}),{})
  );

  const searchProducts = rows.filter((produto) =>
    produto.DESCRPROD.toUpperCase().includes(search.toUpperCase())
  );

  const filteredProducts = selectedCategory
    ? rows.filter((product) => product.AD_SUBGRUPO === selectedCategory) : [];

  const handleSelectProducts = (setFieldValue, category) => {
    setFieldValue("category", category);
    setSelectedCategory(category);
    setSelectedProduct("");
    const initial = category.charAt(0).toUpperCase();
    setLetterInitial(initial);
  };

  const handleProductChange = (setFieldValue, product) => {
    setFieldValue("product", product);
    setSelectedProduct(product);
  };

  const handleSubmit = (values) => {
    console.log("Form values on submit:", values);
    props.handleNextStep(values, true);
   };

  return (
    <>
      <div className="container-category">
            <Formik
          initialValues={data}
          validationSchema={Yup.object({
            searchProduct: Yup.string(),
            category: Yup.string().required("Requerido"),
            product: Yup.string().required("Requerido"),
          })}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form id="form-category-product">
              <h1>Produtos</h1>
              <div className="search-products">
                <Search
                  type="search"
                  name="searchProduct"
                  placeholder="Procurar produto"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              
              </div>
              <div className="select-products">
                <Field
                  as="select"
                  name="category"
                  id="category"
                  onChange={(e) =>
                    handleSelectProducts(setFieldValue, e.target.value)
                  }
                >
                  <option value="">TODOS</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="errors"
                />
              </div>
              <div className="select-products">
                <Field
                  as="select"
                  name="product"
                  id="product"
                  onChange={(e) =>
                    handleProductChange(setFieldValue, e.target.value)
                  }
                >
                  <option value="">TODOS</option>
                  {filteredProducts.map((product) => (
                    <option key={product.CODPROD} value={product.DESCRPROD}>
                      {product.DESCRPROD}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="product"
                  component="div"
                  className="errors"
                />
              </div>
              <div className="lists-products">
                <h3 id="title-list-products">Lista Produtos</h3>
                <ul>
                  {selectedCategory
                    ? filteredProducts.map((product) => (
                        <div className="lists-container" key={product.CODPROD}>
                          <div className="lists">
                            <span>{letterInitial}</span>
                          </div>
                          <li>{product.DESCRPROD}</li>
                        </div>
                      ))
                    : searchProducts.map((product) => (
                        <li key={product.CODPROD}>{product.DESCRPROD}</li>
                      ))}
                </ul>
              </div>

              <div className="btn-steps">
                <Button
                  className="btn"
                  type="Button"
                  children={"voltar"}
                  onClick={() => props.handlePrevStep(values)}
                />
                <Button
                  className="btn"
                  type="Submit"
                  children={"Avançar"}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CategoryProducts;
