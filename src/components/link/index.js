import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Link = ({ name, icon, style }) => {
  const cn = bem("Link");

  return (
    <aside className={cn()}>
      <div className={cn("name")} style={{ background: `${style}` }}>
        <p>{name}</p>
      </div>
      <div className={cn("icon")} style={{ background: `${style}` }}>
        <img src={icon} alt="" />
      </div>
    </aside>
  );
};

export default Link;
