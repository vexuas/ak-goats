import React, { Component } from "react";
import "./servercard.css";

class ServerCard extends Component {
  render() {
    const server = this.props.server;
    return (
      <article className="yagi-servercard">
        <a href={server.link}>
          <div className="yagi-serverName">{server.serverName}</div>
          <img src={server.img_src} alt="server-bg" className="serverCardImg" />
        </a>
      </article>
    );
  }
}
export default ServerCard;
