//Import react
import React from 'react';

//Import React Containers

//Import sub containers
import {AppHeader} from './AppHeader.js';
import {Directory} from './Components/Directory.js';

export class App extends React.Component{
  constructor(props){
    //Call parent
    super(props);

    //Style root
    document.body.parentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.getElementById("root").style.height = "100%";
  }

  render(){
    //Render page
    if(window.location.pathname == "/Info"){
      return(
        <div>
          <AppHeader/>
          Info
        </div>
      )
    }

    if(window.location.pathname == "/Directory"){
      return(
        <div className="h-100">
          <AppHeader/>
          <Directory/>
        </div>
      )
    }

    if(window.location.pathname == "/Opportunites"){
      return(
        <div>
          <AppHeader/>
          Opportunites
        </div>
      )
    }

    else{
      return(
        <div>
          <AppHeader/>
          Info
        </div>
      )
    }

  }

}
