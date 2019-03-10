import React, { Component } from "react";
import "./header.css";

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

export function getserverTimeinMilliseconds() {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const offset = -4;
  const gameTime = utc + 3600000 * offset;
  return gameTime;
}
export function getServerTime() {
  const serverTime = new Date(getserverTimeinMilliseconds());
  return serverTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function getServerDay() {
  return weekday[new Date(getserverTimeinMilliseconds()).getDay()];
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverTime: getServerTime(),
      serverDay: getServerDay()
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        serverTime: getServerTime(),
        serverDay: getServerDay()
      });
    });
  }

  render() {
    return (
      <header className="yagi-header">
        <div className="yagi-navigation">
          <a href={this.props.link}>
            <span id="yagi-mainTitle" style={this.props.color}>
              ak-goats
            </span>
          </a>
          <span
            className="yagi-server"
            id="yagi-serverTime"
            title="Server Time">
            {this.state.serverDay} | {this.state.serverTime}
          </span>
          <span id="yagi-timerName" style={this.props.timerColor}>
            {this.props.timerName}
          </span>
        </div>
      </header>
    );
  }
}
export default Header;
