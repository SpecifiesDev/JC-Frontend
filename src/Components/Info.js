import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav} from 'react-bootstrap';

export class Info extends React.Component {

    render() {
        return(
            <Navbar bg="dark" variant="dark">
                {/* We can pull images from master/WebApp at a later time */}
                <Navbar.Brand>Jackson Connect</Navbar.Brand>
                <Nav className="mr-auto">

                    <Nav.Link href = "/info">Info</Nav.Link>
                    <Nav.Link href = "/directory">Directory</Nav.Link>

                    <Nav.Link href = "/oppurtunities">Oppurtunities</Nav.Link>
                    
                
                </Nav>
            </Navbar>
        )
    }

}