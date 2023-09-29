import React from "react";
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Popup = ({text,link}) => {

  const cn = bem("Popup");
  let navigate = useNavigate();

  function handleNavigate() {
    navigate({link});
  }
  return (
    <div className={cn("overlay")}>
    <div className={cn("msg")}>
      <p>{text}</p>
      <a href={link}onClick={handleNavigate}>
        Close
      </a>
    </div>
    </div>
  );
};

export default Popup;
