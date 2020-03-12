//Import react
import React from "react";

import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export class AppHeader extends React.Component{
    render(){
        return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/Info">
                <img src={"./Assets/Logo.png"} style={{height: "40px", width: "40px"}}></img>
                Jackson Connect
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/Directory">Directory</Nav.Link>
                    <Nav.Link href="/Opportunites">Opportunities</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }

}
