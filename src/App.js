import React, { Component } from "react";
import "./App.css";
import Menu from "./componsents/Main"
import SingIn from "./componsents/auth/SingIn";

class App extends Component {

  constructor(props){
    super(props);
    this.state = { 
      isSignedIn: false,
    } 

    this.handleSignIn = this.handleSignIn.bind(this);
  }


  handleSignIn(isSigned){
    console.log("IS sign in result:", isSigned)
    this.setState({isSignedIn: isSigned});
  }

  render() {
    console.log("IS sign in:", this.state.isSignedIn)
    return (
      <div className="App">
        {this.state.isSignedIn ? (<Menu/>) : ( <SingIn onSignIn={this.handleSignIn}/> ) }
      </div>
    )
  }
}

export default App;