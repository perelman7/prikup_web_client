import React, { Component } from "react";
import "./App.css";
import GoogleAuthProvider from "./componsents/auth/GoogleAuthProvider"
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <GoogleAuthProvider/>
      </div>
    )
  }
}

export default App