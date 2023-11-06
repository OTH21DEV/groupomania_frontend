import React, { memo, useState, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
// import { Picker } from "emoji-mart";
import data from "@emoji-mart/data";

import Picker from "@emoji-mart/react";
// import "emoji-mart/css/emoji-mart.css";
import "./style.css";

const Comment = ({ avatar }) => {
  const cn = bem("Comment");
  const [text, setText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  function handleClick(e) {
    e.preventDefault();

    setIsClicked(true);
  }

  function cancel() {
    setIsClicked(false);
  }

  function addEmoji(e) {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  }


  return (
    <div className={cn("wrapper")}>
      <div className={cn("container")}>
        <div className={cn("avatar")}>
          <img src={avatar} alt="" />
        </div>
        <input value={text} type="text" onChange={(e) => setText(e.target.value)} className={cn("input")} />
      </div>

      <div className={cn("btn")}>
        <div  className={cn("emoji-btn")} onClick={() => setShowEmojis(!showEmojis)}>
          <svg xmlns="http://www.w3.org/2000/svg" className={cn("emoji-btn-icon")} viewBox="0 0 24 24" fill="none" stroke="#bbbcc2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div >

 

        <button className={cn("send-btn")} onClick={(e) => handleClick(e)}>
          Send
        </button>
        {/* <button className={cn("cancel-btn")} onClick={cancel}>
          Cancel
        </button> */}
      </div>
      {showEmojis && (
          <div className={cn("emoji-container")}>
            {/* <Picker data={data} onEmojiSelect={console.log}/> */}
            <Picker data={data} onEmojiSelect={addEmoji} theme={"light"} navPosition={"bottom"} emojiSize={18} emojiButtonSize= {28} maxFrequentRows={0}/>
          </div>
        )}
  
    </div>
  );
};

export default Comment;
