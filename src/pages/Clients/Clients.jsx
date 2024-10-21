import { Formik, Form, Field } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import "./Clients.css";
import { api } from "../../lib/clients";
import { DataContext } from "../../context/DataContext";

const Clients = ({ style, onClose = () => {} }) => {
  const [searchClient, setSearchClient] = useState("");
  const [posts, setPosts, loading, setLoading] = useState([]);
  const { setSelectedClient } = useContext(DataContext);

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      
  }, []);

  if (loading) return <p>carregando</p>;

  const clients = posts.rows || [];

  const filterClients = clients.filter((client) =>
    client.RAZAOSOCIAL && client.RAZAOSOCIAL.toUpperCase().includes(searchClient.toUpperCase())
  );

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
                  handleChange(e); 
                  setSearchClient(e.target.value); 
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
              <span className="client-letter">{client.RAZAOSOCIAL.charAt(0)}</span> 
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
