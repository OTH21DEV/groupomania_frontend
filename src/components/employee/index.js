import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Employee = ({ photo, title, role, icon, phone }) => {
    const cn = bem("Employee");
  return (
    <div className={cn()}>
      <img src={photo} alt=""></img>
      <div className={cn("info")}>
        <h2>{title}</h2>
        <p>{role}</p>
        <div className={cn("contact")}>
          <img src={icon} alt=""></img>
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Employee;
