import axios from "axios";
import { useState } from "react";

const BASE_URL = "https://open-ufrgs-api.vercel.app";

function App() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [classes, setClasses] = useState<string | null>(null);
  const x = async () => {
    const response = await axios.post(`${BASE_URL}/login`, {
      user,
      password,
    });

    const { sessionId } = response.data;

    const responseGet = await axios.get(`${BASE_URL}/available-classes`, {
      headers: {
        authorization: sessionId,
      },
    });

    setClasses(JSON.stringify(responseGet.data));
  };

  if (classes === null) {
    return <LoginScreen />;
  }

  return <div>{classes}</div>;
}

function LoginScreen() {
  return (
    <div className="container">
      <h1>Open UFRGS</h1>
      <br />
      <form>
        <div className="mb-3">
          <label className="form-label">Número do cartão</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha do portal</label>
          <input type="password" className="form-control" />
        </div>

        <button type="button" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default App;
