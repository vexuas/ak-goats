import React, { Component } from "react";
import PhoenixCard from "../PhoenixCard/phoenixcard.js";
import { getserverTimeinMilliseconds } from "../Header/header";
import "./phoenixspawns.css";

const maps = {
  VV1: "Vulture's Vale Ch. 1",
  VV2: "Vulture's Vale Ch. 2",
  VV3: "Vulture's Vale Ch. 3",
  VV4: "Vulture's Vale Ch. 4",
  VV5: "Vulture's Vale Ch. 5",
  VV6: "Vulture's Vale Ch. 6",
  BB1: "Blizzard Berg Ch.1",
  BB2: "Blizzard Berg Ch.2",
  BB3: "Blizzard Berg Ch.3",
  BB4: "Blizzard Berg Ch.4",
  BB5: "Blizzard Berg Ch.5",
  BB6: "Blizzard Berg Ch.6"
};

function getServerTime24() {
  const gameTime = new Date(getserverTimeinMilliseconds());
  let timein24 = gameTime.toLocaleTimeString("en-US", {
    hour12: false
  });
  timein24 = timein24.replace(/:/g, ",");
  const time24 = timein24.split(",").map(Number);
  return time24[0];
}
class PhoenixSpawns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spawnMap: "Loading",
      spawnTime: "Loading"
    };
  }
  getPhoenixInfo() {
    fetch("https://ak-goats-api.herokuapp.com/times/1")
      .then(response => response.json())
      .then(response => {
        const info = response.responseData;
        console.log(info[1]);
        const nextSpawn = getServerTime24();
        if (info[1] === "U") {
          this.setState({
            spawnMap: "TBA",
            spawnTime: "TBA"
          });
        }
        if (info[1] !== "U" && info[1] - nextSpawn < 0 && nextSpawn + 4 < 24) {
          this.setState({
            spawnMap: maps[info[0]],
            spawnTime: `${info[1] + info[2]} PM`
          });
        } else if (
          (info[1] !== "U" && info[1] - nextSpawn >= 0) ||
          (info[1] !== "U" && nextSpawn + 4 >= 24 && info[1] - nextSpawn < 0)
        ) {
          this.setState({
            spawnMap: maps[info[0]],
            spawnTime: `${info[1] + info[2]} AM`
          });
        }
      });
  }
  componentDidMount() {
    setInterval(() => {
      this.getPhoenixInfo();
    }, 10000);
  }
  render() {
    this.getPhoenixInfo();
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
          return <PhoenixCard spawn={item} key={item.id} />;
        })}
      </div>
    );
  }
}
export default PhoenixSpawns;
