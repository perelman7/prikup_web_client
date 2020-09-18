import React, { Component } from "react";
import "./App.css";
import Menu from "./componsents/Main"
import 'bootstrap/dist/css/bootstrap.min.css';
import SingIn from "./componsents/auth/SingIn";

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
        {this.state.isSignedIn ? (<Menu/>) : ( <SingIn onSignIn={this.handleSignIn}/> ) }
      </div>
    )
  }
}

export default App