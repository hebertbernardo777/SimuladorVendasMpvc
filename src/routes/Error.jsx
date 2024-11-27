import { useRouteError, Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="container-error">
      <h1>{error.status}</h1>
      <p>Página não encontrada </p>
      <Link to="/orders" className="link-error">
        Ir para página inicial
      </Link>
    </div>
  );
};

export default Error;
