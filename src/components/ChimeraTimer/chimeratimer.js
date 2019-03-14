import React, { Component } from "react";
import Countdown from "../Countdown/countdown";
import { getserverTimeinMilliseconds } from "../Header/header";

class ChimeraTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: "Loading",
      nextSpawn: null,
      timerHour: null,
      timerMin: null,
      timerSec: null,
      timerBg: "Loading",
      font: null
    };
  }
  getChimeraTimes() {
    fetch("https://ak-goats-api.herokuapp.com/times/0")
      .then(response => response.json())
      .then(response => {
        const times = response.responseData;
        let countString = times[3];
        if (countString === "#VALUE") {
          this.setState({
            countdown: "To Be Announced",
            timerBg: "To Be Announced",
            font: "Open Sans Condensed"
          });
        }
        countString = countString.replace(/:/g, ",");
        countString = countString.replace("AM", "");
        countString = countString.replace("PM", "");
        const countArray = countString.split(",").map(Number);
        if (times[3].includes("PM")) {
          countArray[0] += 12;
        }

        const gameTime = getserverTimeinMilliseconds();
        const count = new Date(gameTime);
        let countertime = new Date(
          count.getFullYear(),
          count.getMonth(),
          count.getDate(),
          countArray[0],
          countArray[1],
          countArray[2]
        );
        let countTime = countertime.getTime();
        let diff = parseInt(countTime - gameTime);
        if (diff < 0 && times[2].includes("PM")) {
          countTime += 24 * 60 * 60 * 1000;
          diff = parseInt(countTime - gameTime);
        }
        if (diff > 14400000) {
          countArray[0] += 4;
          countertime = new Date(
            count.getFullYear(),
            count.getMonth(),
            count.getDate() + 1,
            countArray[0],
            countArray[1],
            countArray[2]
          );
          countTime = countertime.getTime();
          diff = parseInt(countTime - gameTime);
        }
        if (diff > 86400000) {
          countArray[0] -= 4;
          countertime = new Date(
            count.getFullYear(),
            count.getMonth(),
            count.getDate(),
            countArray[0],
            countArray[1],
            countArray[2]
          );
          countTime = countertime.getTime();
          diff = parseInt(countTime - gameTime);
        }
        if (diff < 0) {
          this.setState({
            countdown: "Hunt in Progress",
            timerBg: "Hunt in Progress",
            font: "Open Sans Condensed"
          });
        }
        if (diff > 0) {
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          const hour = ("00" + hours).substr(-2);
          const minute = ("00" + minutes).substr(-2);
          const second = ("00" + seconds).substr(-2);
          const countdown = `${hour}:${minute}:${second}`;
          this.setState({
            countdown: countdown,
            timerBg: "88:88:88",
            font: null
          });
        }
      });
  }
  chimeraCountdown() {
    this.getChimeraTimes();
  }
  componentDidMount() {
    setInterval(() => {
      this.chimeraCountdown();
    });
  }
  render() {
    return (
      <div>
        <Countdown
          countdown={this.state.countdown}
          timerBg={this.state.timerBg}
          font={this.state.font}
        />
      </div>
    );
  }
}

export default ChimeraTimer;
