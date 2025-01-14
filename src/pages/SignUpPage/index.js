import { api } from "../../api/api";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";

function SignUpPage() {
  const startRef = useRef();
  const passwordInput = useRef();
  const passwordEye = useRef();
  const createButton = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [userForm, setUserForm] = useState({
    nick: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    createButton.current.disabled = true;

    try {
      await api.post("/users/sign-up", userForm);
      handleShow();
    } catch (error) {
      createButton.current.disabled = false;
      console.log(error);
      toast.error("Erro ao criar conta.");
    }
  }

  function showPassword() {
    passwordInput.current.type === "password"
      ? (passwordInput.current.type = "text")
      : (passwordInput.current.type = "password");

    passwordEye.current.classList.toggle("fa-eye");
  }

  return (
    <>
      <div className="body shadow-sm">
        <div className="sign-up mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label fw-bold" htmlFor="nick">
                Nick
              </label>
              <input
                ref={startRef}
                className="form-control"
                id="nick"
                type="text"
                value={userForm.name}
                name="nick"
                minLength={3}
                maxLength={24}
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label fw-bold" htmlFor="email">
                E-mail
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                value={userForm.email}
                name="email"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" htmlFor="password">
                Senha
              </label>
              <div className="container-password">
                <input
                  ref={passwordInput}
                  className="form-control senha-teste"
                  type="password"
                  id="password"
                  minLength={5}
                  maxLength={24}
                  value={userForm.password}
                  name="password"
                  required
                  onChange={handleChange}
                />
                <i
                  ref={passwordEye}
                  style={{ marginLeft: "-30px", cursor: "pointer" }}
                  className="fa-solid fa-eye-slash olho-teste"
                  onClick={showPassword}
                ></i>
              </div>
            </div>

            <button ref={createButton} type="submit" className="button">
              <i className="fa-solid fa-plus me-2"></i>CRIAR CONTA
            </button>

            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              userForm={userForm}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Parabéns {userForm.nick}!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Conta criada com sucesso.</h4>
                <p>
                  Sua conta foi criada, agora é necessário ativa-la. <br /> Foi
                  enviado um e-mail para {userForm.email} com um link para
                  ativar sua conta.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-danger" onClick={handleClose}>
                  <i className="fa-solid fa-xmark"></i> FECHAR
                </button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
