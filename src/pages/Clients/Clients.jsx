import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import Search from "../../components/Search/Search";
import ListClients from "../../data/clients.json";
import "./Clients.css";
import NavBar from "../../components/header/NavBar";

const Clients = () => {
  const [searchClient, setSearchClient] = useState("");

  const clients = ListClients.rows;
  
  const filterClients = clients.filter((client) =>
    client.NOMEPARC.toUpperCase().includes(searchClient.toUpperCase())
  );

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <NavBar />
      <div className="clients-container">
        <Formik initialValues={{ searchClients: "" }} onSubmit={handleSubmit}>
         
         {({handleChange})=>( <Form>
            <Search
              type="search"
              name="searchClients"
              placeholder="Procurar Clientes"
              value={searchClient}
              onChange={(e) => {
                handleChange(e); // Atualiza o valor no Formik
                setSearchClient(e.target.value); // Atualiza o valor no estado local para filtragem
              }}
            />
          </Form>
          )}
        </Formik>

        <div className="list-clients">
          <ul>
            {filterClients.map((client) => (
              <li key={client.CODPARC}>
                {client.CODPARC} - {client.NOMEPARC}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Clients;
