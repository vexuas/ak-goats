import React, { Component } from "react";
import Header from "../Header/header.js";
import PhoenixTimer from "../PhoenixTimer/phoenixtimer.js";
import PhoenixSpawns from "../PhoenixSpawns/phoenixspawns.js";

class Phoenix extends Component {
  render() {
    return (
      <div>
        <Header
          timerName="Phoenix"
          link="/"
          timerColor={{ color: "#fe5c5c" }}
        />
        <PhoenixTimer />
        <div className="yagi-partition" style={{ margin: "0px 15%" }} />
        <PhoenixSpawns />
      </div>
    );
  }
}
export default Phoenix;
