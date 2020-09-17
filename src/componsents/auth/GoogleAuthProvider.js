import React, { Component } from "react";
import "../../App.css";
import SignIn from "./SingIn";
import Welcome from "../Welcome";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RoomTable from "../rooms/RoomTable";
import CreateOwnRoom from "../rooms/CreateOwnRoom";

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
            <BrowserRouter>
              <Switch>
                  <Route exact path="/room" component={RoomTable}/>
                  <Route exact path="/createRoom" component={CreateOwnRoom}/>
                  <Route exact path="/" component={RoomTable}/>
                  <Route component={RoomTable}/>
              </Switch>
              </BrowserRouter>
          </div>
        )
      }

}

export default GoogleAuthProvider