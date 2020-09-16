import React, { Component } from "react"
import "./App.css"
import GoogleAuthProvider from "./componsents/GoogleAuthProvider"

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