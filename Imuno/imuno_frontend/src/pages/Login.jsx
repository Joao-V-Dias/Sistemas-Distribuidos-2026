import "../styles/login.css";

function Login() {
  function handleLogin(e) {
    e.preventDefault();

    console.log("login");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="system-name">ImunoPanel</h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>E-mail</label>

            <input type="email" placeholder="Digite seu e-mail" />
          </div>

          <div className="input-group">
            <label>Senha</label>

            <input type="password" placeholder="Digite sua senha" />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
