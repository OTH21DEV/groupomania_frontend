import React, { memo, useState, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import "./style.css";

// const Comment = ({ avatar, postComment, setText, text, setParentId, id }) => {
//   console.log("test");
//   const cn = bem("Comment");

//   //hide the component
//   const [isClicked, setIsClicked] = useState(false);
//   const [showEmojis, setShowEmojis] = useState(false);

//   function handleClick(e) {
//     e.preventDefault();
//     //set parentId(main post id or reply comment id) when click the button (applied in postComment api call - post component)
//     setParentId(id);

//     //was on
//     // postComment();
//     setIsClicked(true);
//     //was on
//     // setText("");
//   }

//   //test with useEffect
//   useEffect(() => {
//     if (isClicked && typeof postComment === "function") {
//       postComment();
//     }
//   });

//   if (isClicked) {
//     return null; // Returns null to hide the component after clicking the send button
//   }

//   function addEmoji(e) {
//     let sym = e.unified.split("-");
//     let codesArray = [];
//     sym.forEach((el) => codesArray.push("0x" + el));
//     let emoji = String.fromCodePoint(...codesArray);
//     setText(text + emoji);
//   }

//   return (
//     <div className={cn("wrapper")}>
//       <div className={cn("container")}>
//         <div className={cn("avatar")}>
//           <img src={avatar} alt="" />
//         </div>
//         <input value={text} type="text" onChange={(e) => setText(e.target.value)} className={cn("input")} />
//       </div>

//       <div className={cn("btn")}>
//         <div className={cn("emoji-btn")} onClick={() => setShowEmojis(!showEmojis)}>
//           <svg xmlns="http://www.w3.org/2000/svg" className={cn("emoji-btn-icon")} viewBox="0 0 24 24" fill="none" stroke="#bbbcc2">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>

//         <button className={cn("send-btn")} onClick={(e) => handleClick(e, id)}>
//           Send
//         </button>
//       </div>
//       {showEmojis && (
//         <div className={cn("emoji-container")}>
//           <Picker data={data} onEmojiSelect={addEmoji} theme={"light"} navPosition={"bottom"} emojiSize={18} emojiButtonSize={28} maxFrequentRows={0} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Comment;
const Comment = ({ avatar, postComment, setText, text, setParentId, id }) => {
  console.log("test");
  const cn = bem("Comment");

  //hide the component
  const [isClicked, setIsClicked] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  //need for set temp text to avoid the same input in the field
  const [tempText, setTempText] = useState(""); // new state variable

  function handleClick(e) {
    e.preventDefault();
    setText(tempText); // update 'text' with the temporary text
    setParentId(id);

    // setIsClicked(true);
    if (!isClicked) { // add this condition to prevent multiple calls to postComment
      setIsClicked(true);
    }
    setTempText(""); // clear the temporary text after clicking the send button
  }

  useEffect(() => {
    if (isClicked && typeof postComment === "function") {
      postComment();
    }
  }, [isClicked]);
  

  if (isClicked) {
    return null; // Returns null to hide the component after clicking the send button
  }

  function addEmoji(e) {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setTempText(tempText + emoji); // update the temporary text with the selected emoji
  }

  return (
    <div className={cn("wrapper")}>
      <div className={cn("container")}>
        <div className={cn("avatar")}>
          <img src={avatar} alt="" />
        </div>
        {/* use tempText instead of text */}
        <input value={tempText} type="text" onChange={(e) => setTempText(e.target.value)} className={cn("input")} />
      </div>

      <div className={cn("btn")}>
        <div className={cn("emoji-btn")} onClick={() => setShowEmojis(!showEmojis)}>
          <svg xmlns="http://www.w3.org/2000/svg" className={cn("emoji-btn-icon")} viewBox="0 0 24 24" fill="none" stroke="#bbbcc2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <button className={cn("send-btn")} onClick={(e) => handleClick(e, id)}>
          Send
        </button>
      </div>
      {showEmojis && (
        <div className={cn("emoji-container")}>
          <Picker data={data} onEmojiSelect={addEmoji} theme={"light"} navPosition={"bottom"} emojiSize={18} emojiButtonSize={28} maxFrequentRows={0} />
        </div>
      )}
    </div>
  );
};

export default Comment;
