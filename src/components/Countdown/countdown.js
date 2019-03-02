import React, { Component } from "react";
import "./countdown.css";

class Countdown extends Component {
  render() {
    return (
      <div className="yagi-timerTemplate">
        <div className="yagi-timerContainer">
          <div
            className="yagi-timerCountdown"
            style={{ fontFamily: this.props.font }}>
            {this.props.countdown}
          </div>
          <div className="yagi-timerBg" style={{ fontFamily: this.props.font }}>
            {this.props.timerBg}
          </div>
        </div>
      </div>
    );
  }
}
export default Countdown;
