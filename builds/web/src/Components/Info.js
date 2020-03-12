import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';



export class Info extends React.Component {
    

    render() {
        return(
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Jackson Connect</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/*I pulled this styling from CWS*/}
                        <a class = "nav-item nav-link active" href = "/info">Info <span class = "sr-only">(current)</span></a>
                        <Nav.Link href="/directory">Directory</Nav.Link>
                        <Nav.Link href="/oppurtunities">Oppurtunities</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <InfoBody></InfoBody>
        </React.Fragment>   
        )
    }

}

class InfoBody extends React.Component {
    render() {
        return(
            <h1>Building...</h1>
        )
    }
}
