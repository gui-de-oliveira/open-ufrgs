import { useState } from "react";
import { LoginScreen } from "./screens/LoginScreen";

function App() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  if (sessionId === null) {
    return (
      <LoginScreen
        onLogin={async (sessionId) => {
          setSessionId(sessionId);
        }}
      />
    );
  }

  return <div>{sessionId}</div>;
}

export default App;
