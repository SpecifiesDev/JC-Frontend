import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Oppurtunities extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>Jackson Connect</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/info">Info</Nav.Link>
                            <Nav.Link href ="/directory">Directory</Nav.Link>
                            <a class = "nav-item nav-link active">Oppurtunities <span class = "sr-only">(current)</span></a>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <OppurtunitiesBody></OppurtunitiesBody>
            </React.Fragment>
        )
    }
}

class OppurtunitiesBody extends React.Component {

    render() {
        return(
            <h1>Building...</h1>
        )
    }

}