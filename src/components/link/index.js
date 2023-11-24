import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Link = ({ name, icon, style,url,id }) => {
  const cn = bem("Link");

  return (
    <a className={cn()} href={url} id={id}>
      <div className={cn("name")} style={{ background: `${style}` }}>
        <p>{name}</p>
      </div>
      <div className={cn("icon")} style={{ background: `${style}` }}>
        <img src={icon} alt="" />
      </div>
    </a>
  );
};

export default Link;
