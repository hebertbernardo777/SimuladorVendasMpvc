import { useRouteError, Link} from "react-router-dom";
import '../routes/Error.css'

const Error = () => {
const error = useRouteError();
console.log(error)

  return (
    <div className="container-error">
        <h1>{error.status}</h1>
        <p>Página não encontrada </p>
        <Link to="/" className="link-error">
            Ir para página inicial
        </Link>
    </div>
  )
}

export default Error