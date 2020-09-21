import React, { Component } from "react";
import "../App.css";
import NavMenu from "./NavMenu";
import { withRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoomTable from "./rooms/RoomTable";
import CreateOwnRoom from "./rooms/CreateOwnRoom";
import Settings from "./settings/Settings";
import Room from "./rooms/Room";

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
                                  <Route exact path="/room" render={(props) => <Room {...props}/>}/>
                                  <Route exact path="/" component={RoomTable}/>
                                  <Route component={RoomTable}/>
                              </Switch>
                            </Router>

          </div>
        )
      }

}

export default withRouter(Main);