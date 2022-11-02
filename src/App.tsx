import { useState } from "react";
import { OpenUFRGSNavBar } from "./components/OpenUFRGSNavBar";
import { LoginScreen } from "./screens/LoginScreen";
import { SemesterPlannerScreen } from "./screens/SemesterPlannerScreen";

type State = { tag: "LOGIN" } | { tag: "LOGGED IN"; sessionId: string };
function App() {
  const [state, setState] = useState<State>({ tag: "LOGIN" });

  if (state.tag === "LOGIN") {
    return (
      <LoginScreen
        onLogin={async (sessionId) => {
          setState({ tag: "LOGGED IN", sessionId });
        }}
      />
    );
  }

  return (
    <>
      <OpenUFRGSNavBar />
      <SemesterPlannerScreen sessionId={state.sessionId} />;
    </>
  );
}

export default App;
