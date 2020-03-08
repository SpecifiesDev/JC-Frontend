import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav} from 'react-bootstrap';




class App extends React.Component {
    render() {
        return(
            <Navbar bg="dark" variant="dark">
            {/* We can pull images from master/WebApp at a later time */}
            <Navbar.Brand>Jackson Connect</Navbar.Brand>
            <Nav className="mr-auto">

                {/* I'll set up page routing */}
                <Nav.Link>Directory</Nav.Link>

                <Nav.Link>Oppurtunities</Nav.Link>
                
            
            </Nav>
          </Navbar>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));