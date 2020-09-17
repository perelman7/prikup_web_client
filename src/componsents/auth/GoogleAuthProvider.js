import React, { Component } from "react";
import "../../App.css";
import SignIn from "./SingIn";
import Welcome from "../Welcome";

class GoogleAuthProvider extends Component{

    state = { 
        isSignedIn: false,
    }

    handleSignIn = (isSigned) => {
        this.setState({isSignedIn: isSigned});
    }

    render() {
        return (
          <div className="App">
            {this.state.isSignedIn ? (
              <Welcome/>
            ) : (
              <SignIn onSignIn={this.handleSignIn}/>
            )}
          </div>
        )
      }

}

export default GoogleAuthProvider