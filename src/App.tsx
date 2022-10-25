import axios from "axios";
import { useState } from "react";

const BASE_URL = "https://open-ufrgs-api.vercel.app";

function App() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [classes, setClasses] = useState<string | null>(null);

  if (classes === null) {
    return (
      <div>
        <input value={user} onChange={(ev) => setUser(ev.target.value)} />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          onClick={async () => {
            const response = await axios.post(`${BASE_URL}/login`, {
              user,
              password,
            });

            const { sessionId } = response.data;

            const responseGet = await axios.get(
              `${BASE_URL}/available-classes`,
              {
                headers: {
                  authorization: sessionId,
                },
              }
            );

            setClasses(JSON.stringify(responseGet.data));
          }}
        >
          SEND
        </button>
      </div>
    );
  }

  return <div>{classes}</div>;
}

export default App;
