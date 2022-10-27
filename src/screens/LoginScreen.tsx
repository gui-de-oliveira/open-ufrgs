import { useState } from "react";
import { LoginError, postLogin } from "../api/postLogin";

export function LoginScreen({
  onLogin,
}: {
  onLogin: (sessionId: string) => Promise<void>;
}) {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  type State =
    | { tag: "DEFAULT" | "REQUESTING" }
    | { tag: "ERROR"; error: LoginError };
  const [state, setState] = useState<State>({ tag: "DEFAULT" });

  return (
    <div className="container">
      <h1>Open UFRGS</h1>
      <br />
      {state.tag === "ERROR" && (
        <div className="alert alert-danger">{errorMessage[state.error]}</div>
      )}
      <form>
        <div className="mb-3">
          <label className="form-label">Número do cartão</label>
          <input
            type="text"
            className="form-control"
            value={user}
            disabled={state.tag === "REQUESTING"}
            onChange={(ev) => setUser(ev.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha do portal</label>
          <input
            type="password"
            className="form-control"
            disabled={state.tag === "REQUESTING"}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          disabled={state.tag === "REQUESTING"}
          onClick={async () => {
            setState({ tag: "REQUESTING" });
            const result = await postLogin({ user, password });

            if (result.tag === "FAIL") {
              setState({ tag: "ERROR", error: result.error });
              return;
            }

            await onLogin(result.sessionId);
          }}
        >
          {state.tag === "REQUESTING" ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
const errorMessage: Record<LoginError, string> = {
  INVALID_LOGIN: "Login ou senha inválidos.",
  LOCKED_USER:
    "Número de falhas de login excedido. Acesse o portal da UFRGS e tente novamente.",
  UNKNOWN_RESPONSE:
    "O servidor encontrou um erro inesperado, tente novamente mais tarde.",
};
