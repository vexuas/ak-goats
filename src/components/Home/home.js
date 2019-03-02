import React, { Component } from "react";
import GoatServers from "../Servers/servers.js";
import Header from "../Header/header.js";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Header timerName="Home" color={{ color: "#fe5c5c" }} />
        <main className="yagi-content">
          <GoatServers />
          <div className="yagi-partition" />
        </main>
      </div>
    );
  }
}
export default Home;
