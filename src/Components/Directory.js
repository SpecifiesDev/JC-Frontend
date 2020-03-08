import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

export class Directory extends React.Component {

    render() {
        return(
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>Jackson Connect</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/info">Info</Nav.Link>
                            <a class = "nav-item nav-link active">Directory <span class = "sr-only">(current)</span></a>
                            <Nav.Link href="/oppurtunities">Oppurtunities</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <DirectoryBody></DirectoryBody>
            </React.Fragment>
        )
    }

}

class DirectoryBody extends React.Component {

    render() {
        return(
            <h1>Building...</h1>
        )
    }

}





