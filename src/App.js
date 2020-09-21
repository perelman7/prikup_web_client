import React, { Component } from "react";
import "./App.css";
import Menu from "./componsents/Main"
import 'bootstrap/dist/css/bootstrap.min.css';
import SingIn from "./componsents/auth/SingIn";

import {BrowserRouter as Router } from "react-router-dom";

class App extends Component {

  state = { 
    isSignedIn: false,
  } 

  handleSignIn = (isSigned) => {
    this.setState({isSignedIn: isSigned});
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (<Router><Menu/></Router>) : ( <SingIn onSignIn={this.handleSignIn}/> ) }
      </div>
    )
  }
}

export default App;