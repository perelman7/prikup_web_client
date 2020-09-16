import React, { Component } from "react"
import {auth, firebaseProvider} from "./FirebaseConfig"
import "../App.css"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

class GoogleAuthProvider extends Component{

    state = { 
        isSignedIn: false,
        authuser: null
    }
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
        firebaseProvider.auth().onAuthStateChanged(user => {
          this.setState({ 
              isSignedIn: !!user,
              authuser: user
             })
          console.log("user", user)
        })
      }

    render() {
        var user = firebaseProvider.auth().currentUser;
        if(user){
          var token = user.getIdToken();
          console.log("Token: ", token)
        }
        return (
          <div className="App">
            {this.state.isSignedIn ? (
              <span>
                <div>Signed In!</div>
                <button onClick={() => firebaseProvider.auth().signOut()}>Sign out!</button>
                <h1>Welcome {firebaseProvider.auth().currentUser.displayName}</h1>
                <img
                  alt="profile picture"
                  src={firebaseProvider.auth().currentUser.photoURL}
                />
              </span>
            ) : (
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebaseProvider.auth()}
              />
            )}
          </div>
        )
      }

}

export default GoogleAuthProvider