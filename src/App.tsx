import { HashRouter, Route, Routes } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#/" onClick={() => {}}>
              Template
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Examples" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/page-a">Page A</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="page-a" element={<PageA />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

function Homepage() {
  return <div>This is the home page!</div>;
}

function PageA() {
  return <div>This is the Page A.</div>;
}
export default App;
