//Import react
import React from "react";

//Import react strap components
import {Container} from "react-bootstrap";

//Import sub components
import {Loading} from "./SubComponents/Loading.js";
import {ResultsBox} from "./SubComponents/ResultsBox.js";
import {SearchBox} from "./SubComponents/SearchBox.js";

//Define Class
export class Directory extends React.Component{
    //Setup data flow
    constructor(props){
        //Take care of any parents
        super(props);

        //Setup App Variables
        window.App = {
            "OrgData" : null
        }

        //Setup listener for Directory Request | Push data into global state
        this.Load = (Request) => {
            //Load data in 
            let ReturnData = JSON.parse(Request.srcElement.response);
            
            //Clean it
            window.App.OrgData = ReturnData["result"];

            //Tell them we're done loading
            this.setState((state) => {
               return {loading : false}
            });
        }

        //Fetch Directory Request
        this.Request = new XMLHttpRequest();
        this.Request.addEventListener("load", this.Load);
        this.Request.open("GET", "/organizations");
        this.Request.send();

        //Set loading state 
        this.state = {loading: true};
    }


    //Render loop for elem
    render(){
        //If we have data, display data
        if(this.state.loading == false){
            return(
                <div className="h-100" style={{display: "flex", textAlign: "center"}}>
                    <SearchBox style={{width: "25%", backgroundColor: "#28a745"}}/>
                    <ResultsBox style={{width: "75%", backgroundColor: "#20c997"}}/>
                </div>
            )
        }

        //If we don't have the data, say we're loading
        if(this.state.loading == true){
            return(
                <Loading/>
            );
        }
    }

}