import React, { Component } from "react";
import Countdown from "../Countdown/countdown";
import { getServerTime, getserverTimeinMilliseconds } from "../Header/header";
const ampm = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "11": 11,
  "12": 12,
  "13": 1,
  "14": 2,
  "15": 3,
  "16": 4,
  "17": 5,
  "18": 6,
  "19": 7,
  "20": 8,
  "21": 9,
  "22": 10,
  "23": 11,
  "24": 0
};
class PhoenixTimer extends Component {
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
  getPhoenixTimes() {
    fetch("https://ak-goats-api.herokuapp.com/times/1")
      .then(response => response.json())
      .then(response => {
        const times = response.responseData;
        let countString = times[1] + times[2];
        if (times[1] === "U") {
          return this.setState({
            countdown: "To Be Announced",
            timerBg: "To Be Announced",
            font: "Open Sans Condensed"
          });
        }
        countString = countString.replace(/:/g, ",");
        let countArray = countString.split(",").map(Number);
        const gameTime = getserverTimeinMilliseconds();
        const count = new Date(gameTime);
        let timein24 = count.toLocaleTimeString("en-US", {
          hour12: false
        });
        timein24 = timein24.replace(/:/g, ",");
        const time24 = timein24.split(",").map(Number);

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
        console.log(countArray[0]);
        //daytime cycle
        if (time24[0] > 3 && time24[0] < 12 && countArray[0] < 12) {
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
        //evening cycle
        if (time24[0] > 11 && time24[0] < 24 && countArray[0] < 12) {
          countArray[0] += 12;
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
          console.log(countArray[0]);
        }
        if (time24[0] + 4 > 23 && countArray[0] < 24) {
          time24[0] -= 24;
        }
        //switching to next day
        if (time24[0] < 4) {
          console.log(time24[0]);
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
      }, 1000);
  }

  phoenixCountdown() {
    this.getPhoenixTimes();
  }
  componentDidMount() {
    setInterval(() => {
      this.phoenixCountdown();
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
export default PhoenixTimer;
