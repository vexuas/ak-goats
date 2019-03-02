import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/home.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chimera from "./components/Chimera/chimera";
import Phoenix from "./components/Phoenix/phoenix";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="yagi">
          <Route exact path="/" component={Home} />
          <Route path="/chimera" component={Chimera} />
          <Route path="/phoenix" component={Phoenix} />
        </div>
      </Router>
    );
  }
}

export default App;
