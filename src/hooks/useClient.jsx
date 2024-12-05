import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";

const useClient = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const clients = posts || [];

  const filterClients = clients.filter(
    (client) =>
      client.RAZAOSOCIAL &&
      client.RAZAOSOCIAL.toUpperCase().includes(searchClient.toUpperCase())
  );

  const handleSelectCliente = (client) => {
    setSelectedClient(client);
    onClose();
  };

  return setSearchClient, loading, filterClients, handleSelectCliente;
};

export default useClient;
