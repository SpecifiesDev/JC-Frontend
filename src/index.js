import React from 'react';
import ReactDOM from 'react-dom';


import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Directory} from './Components/Directory.js';
import {Oppurtunities} from './Components/Oppurtunities.js';
import {Info} from './Components/Info.js';



class DefineRouter extends React.Component {
    render() {
        return(
            <Router>
                <Route path = {"/directory"} component={Directory}></Route>
                <Route path = {"/oppurtunities"} component={Oppurtunities}></Route>
                <Route path = {"/info"} component = {Info}></Route>

            </Router>
        )
    }
}

ReactDOM.render(<DefineRouter/>, document.getElementById("root"));