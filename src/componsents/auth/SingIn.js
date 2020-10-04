import React, { Component } from "react";
import { auth, firebaseProvider } from "../FirebaseConfig";
import "../../App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import "../../style/components/signin.css";

class SingIn extends Component {

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebaseProvider.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      let isSignIn = (user !== null);

      this.props.onSignIn(isSignIn);
      if (user != null) {
        console.log("USER IS LOG IN");
      } else {
        console.log("USER IS LOG OUT");
      }
    })
  }

  render() {
    return (
      <div className="sign_in_container">
        <div className="auth_model">
          <div className="greating">
            Добро пожаловать в карточную игру "Прикуп"
          </div>
          <div>              
            <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={auth}
          />
          </div>
        </div>
      </div>
    )
  }

}

export default SingIn;