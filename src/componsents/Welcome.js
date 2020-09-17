import React, { Component } from "react";
import UserService from "./auth/UserService"
import {getToken, firebaseProvider} from "./FirebaseConfig";

class Welcome extends Component{ 

  state = { 
    currentUser: null,
  }


  componentDidMount = async () => {
    const userService = new UserService();
    const token = await getToken();
    const user = await userService.initCurrentUser(token);
    this.setState({currentUser: user});
  }

    render() {
        return (
          <div className="App">
              {this.state.currentUser != null ? (<div>
                  <span>
                    <div>Signed In!</div><br></br>
                    <button onClick={() => firebaseProvider.auth().signOut()}>Sign out!</button>
                    <h1>Welcome {firebaseProvider.auth().currentUser.displayName}</h1>
                    <img
                      alt="profile logo"
                      src={firebaseProvider.auth().currentUser.photoURL}
                    />
                  </span>
                  <div>{"EMAIL: " + this.state.currentUser.email}</div>
                  <div>{"NICKNAME: " + this.state.currentUser.nickname}</div>
                  <div>{"ID: " + this.state.currentUser.id}</div>
              </div>)
                : <div>{"User is null"}</div>  
            } 

          </div>
        )
      }
}

export default Welcome;