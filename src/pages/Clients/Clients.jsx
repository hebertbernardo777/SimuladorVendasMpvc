import { Formik, Form, Field } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import ListClients from "../../data/clients.json";
import "./Clients.css";
import { api } from "../../lib/clients";
import { AuthContext } from "../../context/AuthContext";

const Clients = ({ style, onClose = () => {} }) => {
  const [searchClient, setSearchClient] = useState("");
  const { setSelectedClient } = useContext(AuthContext);
  const [setPosts] = useState([]);

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clients = ListClients.rows;

  const filterClients = clients.filter((client) =>
    client.RAZAOSOCIAL && client.RAZAOSOCIAL.toUpperCase().includes(searchClient.toUpperCase())
  );

 console.log(clients)
 console.log(filterClients)

  const handleSelectCliente = (client) => {
    setSelectedClient(client);
    console.log(client);
    onClose();
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="clients-container" style={style}>
        <Formik initialValues={{ searchClients: "" }} onSubmit={handleSubmit}>
          {({ handleChange }) => (
            <div>
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
            </div>
          )}
        </Formik>

        <div className="list-clients">
          <ul>
            {filterClients.map((client) => (
              <li
                key={client.CODPARC}
                onClick={() => {
                  handleSelectCliente(client);
                }}
              >
              <span className="client-letter">{client.RAZAOSOCIAL.charAt(0)}</span> -
              {client.CODPARC} - {client.RAZAOSOCIAL}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Clients;
