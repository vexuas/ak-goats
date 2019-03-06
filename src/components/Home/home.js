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
          <div className="yagi-title">
            <div id="yagi-AK">Aura Kingdom</div>
            <div id="yagi-WB">
              • Vulture's Vale & Blizzard Berg World Boss Timers •
            </div>
          </div>
          <div className="yagi-partition" />
          <GoatServers />
        </main>
      </div>
    );
  }
}
export default Home;
