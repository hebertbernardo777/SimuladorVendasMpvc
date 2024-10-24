import { React, useContext, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";
import * as Yup from "yup";
import "./CategoryProducts.css";
import SelectField from "../../components/select/SelectField";
import ProductList from "../../components/ProductList/ProductList";
import useCategoriesFunctions from "../../hooks/useCategoriesFunctions";
import Loading from "../../components/Loading/Loading";

const CategoryProducts = () => {
  const { loading, data, setData, selectedCategory, selectedProduct } =
    useContext(DataContext);

  const navigate = useNavigate();

  const {
    categories,
    searchProducts,
    filterCategory,
    filteredLines,
    filterSubCategory,
    letterInitial,
    filteredProductsByLineAndSubCategory,
    search,
    setSearch,
    handleCategory,
    handleSubCategory,
    handleSelectProduct,
    handleSelectLine,
    isActive,
  } = useCategoriesFunctions();

  const handleSubmit = (values) => {
    console.log("Form values on submit:", values);
    console.log("Produto Selecionado para Submissão:", selectedProduct);
    if (!selectedProduct) {
      alert("Por favor, selecione um produto.");
      return;
    }
    const updates = { ...data, ...values };
    setData(updates);
    localStorage.setItem("formCategory", JSON.stringify(updates));
    navigate("/products");
  };

  return (
    <div className="container-category">
      <Formik
        initialValues={data}
        validationSchema={Yup.object({
          searchProduct: Yup.string(),
          category: Yup.string(),
          product: Yup.string(),
        })}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="form-category-product">
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
            <SelectField
              name="category"
              id="category"
              defaultOption="CATEGORIAS"
              options={(categories || []).map((category) => ({
                value: category,
                label: category,
              }))}
              onChange={(e) => handleCategory(setFieldValue, e.target.value)}
            />
            {selectedCategory === "CONEXOES" && (
              <SelectField
                name="line"
                id="line"
                defaultOption="TODOS"
                options={filteredLines.map((line) => ({
                  value: line,
                  label: line,
                }))}
                onChange={(e) =>
                  handleSelectLine(setFieldValue, e.target.value)
                }
              />
            )}
            <SelectField
              name="subCategory"
              id="subCategory"
              defaultOption="TODOS"
              options={(filterCategory || []).map((classe) => ({
                value: classe,
                label: classe,
              }))}
              onChange={(e) => handleSubCategory(setFieldValue, e.target.value)}
            />

            <div className="lists-products">
              {loading ? (
                <Loading />
              ) : (
                <div>
                  <h3 id="title-list-products">Lista Produtos</h3>
                  {selectedCategory === "CONEXOES" &&
                  filterCategory.length > 0 ? (
                    <ProductList
                      products={filteredProductsByLineAndSubCategory || []}
                      handleSelectProduct={handleSelectProduct}
                      isActive={isActive}
                      letterInitial={letterInitial}
                    />
                  ) : selectedCategory && filterCategory.length > 0 ? (
                    <ProductList
                      products={filterSubCategory}
                      handleSelectProduct={handleSelectProduct}
                      isActive={isActive}
                      letterInitial={letterInitial}
                    />
                  ) : (
                    <ProductList
                      products={searchProducts}
                      handleSelectProduct={handleSelectProduct}
                      isActive={isActive}
                      letterInitial={letterInitial}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="btn-steps">
              <Link to="/orders">
                <Button className="btn" type="Button" children={"voltar"} />
              </Link>
              <Button className="btn" type="Submit" children={"Avançar"} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CategoryProducts;
