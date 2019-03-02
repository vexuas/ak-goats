import React, { Component } from "react";
import "./servers.css";
import ServerCard from "../ServerCard/servercard.js";

const servers = [
  {
    id: 0,
    serverName: "Chimera",
    link: "/chimera",
    img_src:
      "https://cdn.discordapp.com/attachments/535280497656332289/537162893565886464/AKGoE-girls-banner.jpg"
  },
  {
    id: 1,
    serverName: "Phoenix",
    link: "/phoenix",
    img_src:
      "https://cdn.discordapp.com/attachments/535280497656332289/550937134605926418/image1.jpg"
  }
];
class GoatServers extends Component {
  render() {
    return (
      <div className="yagi-servers">
        {servers.map(item => {
          return <ServerCard server={item} key={item.id} />;
        })}
      </div>
    );
  }
}
export default GoatServers;
