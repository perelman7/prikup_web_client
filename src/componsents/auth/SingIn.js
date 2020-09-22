import React, { Component } from "react";
import {auth, firebaseProvider} from "../FirebaseConfig";
import "../../App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import UserService from "./UserService";

class SingIn extends Component{

    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebaseProvider.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }

    componentDidMount = () => {
      const userService = new UserService();
        auth.onAuthStateChanged(user => {
          let isSignIn = (user !== null);
          console.log("USER:", user, isSignIn);
          
          this.props.onSignIn(isSignIn);
          if(user != null){
            console.log("USER IS LOG IN");
            user.getIdToken().then(token => {
              userService.initCurrentUser(token);
            });
          }else{
            console.log("USER IS LOG OUT");
          }
        })
      }

    render() {
        return (
          <div className="App">
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={auth}
              />
          </div>
        )
      }

}

export default SingIn;