import React, { Component } from "react";
import "../App.css";
import NavMenu from "./NavMenu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RoomTable from "./rooms/RoomTable";
import CreateOwnRoom from "./rooms/CreateOwnRoom";
import Settings from "./settings/Settings";

class Main extends Component{

    render() {
        return (
          <div className="App">
                          <NavMenu/>
                          <BrowserRouter>
                            <Switch>
                                <Route exact path="/room" component={RoomTable}/>
                                <Route exact path="/createRoom" component={CreateOwnRoom}/>
                                <Route exact path="/settings" component={Settings}/>
                                <Route exact path="/" component={RoomTable}/>
                                <Route component={RoomTable}/>
                            </Switch>
                            </BrowserRouter>

          </div>
        )
      }

}

export default Main;