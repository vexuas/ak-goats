import React, { Component } from "react";
import Header from "../Header/header.js";
import ChimeraTimer from "../ChimeraTimer/chimeratimer.js";
import ChimeraSpawns from "../ChimeraSpawns/chimeraspawns.js";

class Chimera extends Component {
  render() {
    return (
      <div>
        <Header
          timerName="Chimera"
          link="/"
          timerColor={{ color: "#fe5c5c" }}
        />
        <ChimeraTimer />
        <div className="yagi-partition" style={{ margin: "0px 15%" }} />
        <ChimeraSpawns />
      </div>
    );
  }
}

export default Chimera;
