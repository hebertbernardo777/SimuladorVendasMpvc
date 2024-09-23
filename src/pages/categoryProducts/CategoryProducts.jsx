import { React, useState, useContext, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../lib/products";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";
import * as Yup from "yup";
import "./CategoryProducts.css";

const CategoryProducts = () => {
  const {
    data,
    setData,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    setSelectedProduct,
    letterInitial,
    setLetterInitial,
    loading,
    setLoading,
  } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.toJSON());
        setLoading(false);
      });
  }, []);

  if (loading) return <p>carregando</p>;

  const rows = posts.rows || [];

  const categories = Object.keys(
    rows.reduce((acc, rows) => ({ ...acc, [rows.AD_SUBGRUPO]: true }), {})
  );

  const searchProducts = rows.filter((produto) =>
    produto.DESCRPROD.toUpperCase().includes(search.toUpperCase())
  );

  const filteredProducts = selectedCategory
    ? rows.filter((product) => product.AD_SUBGRUPO === selectedCategory)
    : [];

  const filterCategory = Object.keys(
    filteredProducts.reduce((acc, rows) => {
      if (rows.AD_CLASSE !== null && rows.AD_CLASSE !== undefined) {
        acc[rows.AD_CLASSE] = true; 
      }
      return acc;
    }, {})
  );

  const filterSubCategory = selectedSubCategory
    ? rows.filter((product) => product.AD_CLASSE === selectedSubCategory)
    : filteredProducts;

  const handleCategory = (setFieldValue, category) => {
    setFieldValue("category", category);
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setSelectedProduct("");
    setLetterInitial(category.charAt(0).toUpperCase());
  };

  const handleSubCategory = (setFieldValue, subCategory) => {
    setFieldValue("subCategory", subCategory);
    setSelectedSubCategory(subCategory);
  };

  // const handleProductChange = (setFieldValue, product) => {
  //   setFieldValue("product", product);
  //   setSelectedProduct(product);
  //   console.log(selectedProduct)
  // };

  const handleSelectCliente = (product) => {
    setSelectedProduct(product.DESCRPROD);
    setIsActive(product.CODPROD);
    console.log(product);
  };

  const handleSubmit = (values) => {
    console.log("Form values on submit:", values);
    setData({ ...data, ...values });
    navigate("/products");
  };

  return (
    <>
      <div className="container-category">
        <Formik
          initialValues={data}
          validationSchema={Yup.object({
            searchProduct: Yup.string(),
            category: Yup.string().required("Requerido"),
            product: Yup.string(),
          })}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
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
              <div className="select-products">
                <Field
                  as="select"
                  name="category"
                  id="category"
                  onChange={(e) =>
                    handleCategory(setFieldValue, e.target.value)
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
              <div className="select-subcategory">
                <Field
                  as="select"
                  name="subCategory"
                  id="subCategory"
                  onChange={(e) =>
                    handleSubCategory(setFieldValue, e.target.value)
                  }
                >
                  <option value="">TODOS</option>
                  {filterCategory.map((classe) => (
                    <option key={classe} value={classe}>
                      {classe}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="subcategory"
                  component="div"
                  className="errors"
                />
              </div>
              {/* <div className="select-products">
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
              </div> */}
              <div className="lists-products">
                <h3 id="title-list-products">Lista Produtos</h3>
                <ul>
                  {selectedCategory && filterCategory.length > 0
                    ? filterSubCategory.map((product) => (
                        <div className="lists-container" key={product.CODPROD}>
                          <div className="lists">
                            <span>{letterInitial}</span>
                          </div>
                          <li
                            className={
                              isActive === product.CODPROD ? "active" : ""
                            }
                            onClick={() => {
                              handleSelectCliente(product);
                            }}
                          >
                            {product.DESCRPROD}
                          </li>
                        </div>
                      ))
                    : searchProducts.map((product) => (
                        <li key={product.CODPROD}>{product.DESCRPROD}</li>
                      ))}
                </ul>
              </div>

              <div className="btn-steps">
                <Link to="/orders">
                  <Button
                    className="btn"
                    type="Button"
                    children={"voltar"}

                    // onClick={() => props.handlePrevStep(values)}
                  />
                </Link>
                <Button className="btn" type="Submit" children={"Avançar"} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CategoryProducts;
