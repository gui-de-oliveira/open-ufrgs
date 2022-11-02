import { ReactChild } from "react";

export function NavBar({ children }: { children: ReactChild }) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">{children}</div>
    </nav>
  );
}
