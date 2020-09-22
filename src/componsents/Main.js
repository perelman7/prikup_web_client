import React, { Component } from "react";
import "../App.css";
import NavMenu from "./NavMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoomTable from "./rooms/RoomTable";
import CreateOwnRoom from "./rooms/CreateOwnRoom";
import Settings from "./settings/Settings";
import Room from "./rooms/Room";
import Board from "./board/Board";

class Main extends Component{

    render() {
        return (
          <div className="App">
                          <NavMenu/>
                            <Router>
                              <Switch>
                                  <Route exact path="/roomTable" component={RoomTable}/>
                                  <Route exact path="/createRoom" component={CreateOwnRoom}/>
                                  <Route exact path="/settings" component={Settings}/>
                                  <Route exact path="/room" component={Room}/>
                                  <Route exact path="/board" component={Board}/>
                                  <Route exact path="/" component={RoomTable}/>
                                  <Route component={RoomTable}/>
                              </Switch>
                            </Router>

          </div>
        )
      }

}

export default Main;