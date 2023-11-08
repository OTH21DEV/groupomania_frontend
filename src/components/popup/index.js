import React from "react";
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Popup = ({ text, link, btnName, isClicked, toDelete }) => {
  console.log(isClicked);
  const cn = bem("Popup");
  let navigate = useNavigate();

  function handleNavigate() {
    navigate(link);
  }


  return (
    <div className={cn("overlay")}>
      <div className={cn("msg")}>
        <p>{text}</p>
        <div className={cn("btn")}>
          <button className={cn("btn-yes")} onClick={() => (isClicked ? toDelete() : handleNavigate())}>
            {btnName}
          </button>
          {isClicked && (
            <button className={cn("btn-no")} onClick={handleNavigate}>
              NO
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
