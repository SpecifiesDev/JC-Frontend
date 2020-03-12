//Import React
import React from "react";

import {Spinner} from "reactstrap";

//Create loading class
export class Loading extends React.Component{
    //Basic example for now, will play with it later
    render(){
        return(
            <div className="d-flex justify-content-center">
                <div className="row align-items-center" style={{display: "flex"}}>
                    <Spinner color="success"/><br/>
                </div>
            </div>
            
        )
    }
}