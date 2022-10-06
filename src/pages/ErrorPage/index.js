import Alert from "react-bootstrap/Alert";
import img404 from "../../assets/404.svg";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="body shadow-sm">
      <Alert variant="danger">
        <img src={img404} width={250} alt="404" />
        <Alert.Heading>Opa, página não encontrada !!!</Alert.Heading>
        <br />
        <p>
          Parece que você tentou acessar uma página que não existe em nosso
          domínio.
        </p>
        <hr />
        <Link to="/">
          <button className="btn btn-info">
            <i className="fa-solid fa-house"></i> HOME
          </button>
        </Link>
      </Alert>
    </div>
  );
}

export default ErrorPage;
