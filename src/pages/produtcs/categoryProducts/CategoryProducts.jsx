import { React, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../components/header/NavBar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdSearch } from "react-icons/io";
import DataProducts from "../../../data/produtcs.json";
import * as Yup from "yup";
import "./CategoryProducts.css";
import Button from "../../../components/Button/Button";


const CategoryProducts = () => {
  const rows = DataProducts.rows;

  const categories = Object.keys(
    rows.reduce(
      (acc, rows) => ({
        ...acc,
        [rows.AD_SUBGRUPO]: true,
      }),
      {}
    )
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [search, setSearch] = useState("");
  const [letterInitial, setLetterInitial] = useState("");

  const searchProducts = rows.filter((produto) =>
    produto.DESCRPROD.toUpperCase().includes(search.toUpperCase())
  );

  const filteredProducts = selectedCategory
    ? rows.filter((product) => product.AD_SUBGRUPO === selectedCategory)
    : [];

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

  return (
    <>
      <NavBar />
      <div className="container-category">
        <h1>Produtos</h1>
    
        <div>
          <Formik
            initialValues={{ searchProduct: "", category: "", product: "" }}
            validationSchema={Yup.object({
              searchProduct: Yup.string(),
              category: Yup.string().required("Requerido"),
              product: Yup.string().required("Requerido"),
            })}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form id="form-category-product">
                <div className="search-products">
                  <Field
                    type="search"
                    name="searchProduct"
                    placeholder="Procurar produto"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <IoMdSearch className="icon" />
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
                          <div
                            className="lists-container"
                            key={product.CODPROD}
                          >
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
                {/* <Link to="/product"> */}
                  <Button type="submit" >Adicionar produtos</Button>
                {/* </Link> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
