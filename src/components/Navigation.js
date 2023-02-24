import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Using Themis</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link eventKey="2" href="/keygen">Keys Generation</Nav.Link>
                        <NavDropdown title="SecureCell" id="basic-nav-dropdown1">
                            <NavDropdown.Item eventKey="3" href="/secureCellWithKey">With Key</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4" href="/secureCellWithPassphrase">
                                With passphrase
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="SecureMessage" id="basic-nav-dropdown">
                            <NavDropdown.Item eventKey="5" href="/secureMessageSign">Signature mode</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="6" href="/secureMessageEncrypt">
                                Encryption mode
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


