import React, { Component } from "react";
import "./App.css";
import Menu from "./componsents/Main"
import SingIn from "./componsents/auth/SingIn";

class App extends Component {

  constructor(){
    super();
    this.state = { 
      isSignedIn: false,
    }
  }

  handleSignIn(isSigned){
    this.setState({isSignedIn: isSigned});
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn === true ? (<Menu/>) : ( <SingIn onSignIn={this.handleSignIn.bind(this)}/> ) }
      </div>
    )
  }
}

export default App;