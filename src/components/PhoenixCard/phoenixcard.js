import React, { Component } from "react";
import "./phoenixcard.css";

class PhoenixCard extends Component {
  render() {
    const spawn = this.props.spawn;
    return (
      <article className="yagi-phoenixCard">
        <div className="yagi-cardTitle">{spawn.desc}</div>
        <div className="yagi-center">
          <div className="yagi-cardOutput">{spawn.output}</div>
        </div>
        <img src={spawn.img_src} alt="card-bg" className="yagi-cardImg" />
      </article>
    );
  }
}
export default PhoenixCard;
