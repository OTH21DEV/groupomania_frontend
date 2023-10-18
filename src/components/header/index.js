import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import loupe from "../../assets/loupe.png"
import notification from "../../assets/notification.png"
import line from "../../assets/line.png"


const Header = ({ title, pseudo,avatar }) => {
  const cn = bem("Header");
  return (
    <section className={cn()}>
      <h1 className={cn("title")}>{title}</h1>
      <div className={cn("user")}>
        <img className={cn("icon_loupe")}src={loupe} alt=""/>
        <img className={cn("icon_notification")}src={notification} alt=""/>
        <img className={cn("icon_line")}src={line} alt=""/>
        <p>{pseudo}</p>
        <img className={cn("icon_avatar")}src={avatar}alt=""></img>
      </div>
    </section>
  );
};

export default Header;
