import React, { Component } from "react";
import "./chimeracard.css";

class ChimeraCard extends Component {
  render() {
    const spawn = this.props.spawn;
    return (
      <article className="yagi-chimeraCard">
        <div className="yagi-cardTitle">{spawn.desc}</div>
        <div className="yagi-center">
          <div className="yagi-cardOutput">{spawn.output}</div>
        </div>
        <img src={spawn.img_src} alt="card-bg" className="yagi-cardImg" />
      </article>
    );
  }
}
export default ChimeraCard;
