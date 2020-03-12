//Import react
import React from 'react';

//Import screens
import {InfoScreen} from "./Screens/InfoScreen.js";

//Render Class
export class AppBody extends React.Component{
  constructor(props){
    super(props);
    this.Page = props.Page;
  }

  //Parent Render Call
  render(){
    //Render Info Page
    if(this.Page == "Info"){
      return this.RenderInfo();
    }

    //Render Other Page
    if(this.Page == "Other"){
      return this.RenderOther();
    }
  }

  //Render Info Call
  RenderInfo(){
    return(
      <div>
        <InfoScreen/>
      </div>

    )
  }

  //Render other call
  RenderOther(){
    return(
      <div>Other</div>
    )
  }

}
