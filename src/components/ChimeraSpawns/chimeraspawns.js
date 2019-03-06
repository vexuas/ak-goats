import React, { Component } from "react";
import ChimeraCard from "../ChimeraCard/chimeracard.js";
import "./chimeraspawns.css";

const maps = {
  V1: "Vulture's Vale Ch. 1",
  V2: "Vulture's Vale Ch. 2",
  V3: "Vulture's Vale Ch. 3",
  V4: "Vulture's Vale Ch. 4",
  V5: "Vulture's Vale Ch. 5",
  V6: "Vulture's Vale Ch. 6",
  B1: "Blizzard Berg Ch.1",
  B2: "Blizzard Berg Ch.2",
  B3: "Blizzard Berg Ch.3",
  B4: "Blizzard Berg Ch.4",
  B5: "Blizzard Berg Ch.5",
  B6: "Blizzard Berg Ch.6"
};

class ChimeraSpawns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spawnMap: null,
      spawnTime: null
    };
  }
  getChimeraInfo() {
    fetch("http://localhost:3001/times/0")
      .then(response => response.json())
      .then(response => {
        const info = response.responseData;
        if (info[3] === "#VALUE") {
          this.setState({
            spawnMap: "TBA",
            spawnTime: "TBA"
          });
        } else {
          this.setState({
            spawnMap: maps[info[0]],
            spawnTime: info[3]
          });
        }
      });
  }
  render() {
    this.getChimeraInfo();
    let spawnInfo = [
      {
        id: 0,
        desc: "Map/Channel",
        output: this.state.spawnMap,
        img_src:
          "https://cdn.discordapp.com/attachments/248430185463021569/543608970573512715/unknown.png"
      },
      {
        id: 1,
        desc: "Spawn Time",
        output: this.state.spawnTime,
        img_src:
          "https://cdn.discordapp.com/attachments/248430185463021569/544348987843543050/unknown.png"
      }
    ];
    return (
      <div className="yagi-spawnInfo">
        {spawnInfo.map(item => {
          return <ChimeraCard spawn={item} key={item.id} />;
        })}
      </div>
    );
  }
}
export default ChimeraSpawns;
