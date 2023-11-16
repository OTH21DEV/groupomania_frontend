import React, { memo, useState, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import formatDate from "../../utils/format-date";

// const Comments = ({ comments,textarea ,setParentId}) => {
//   const cn = bem("Comments");
//   const [clickedId, setClickedId] = useState(null);
//   // console.log(comments)

//   function handleClick(id) {
//     if (clickedId === id) {
//       // If the same button is clicked again, hide the textarea
//       setClickedId(null);
//     } else {
//       // Otherwise, show the textarea for the clicked comment
//       setClickedId(id);
//       setParentId(id)
//     }
    
//   }
//   return (
//     <>
//       {comments && comments
//         // .sort((a, b) => new Date(b.date) - new Date(a.date))
//         .map((comment, index) => (
//           <div className={cn("container")} key={index}>
//             <p>{comment.pseudo}</p>
//             <p>{comment.body}</p>

//             <div className={cn("bottom")}>
//               <p>{formatDate(comment.date)}</p>
//               <button onClick={() => handleClick(index)} id={index}>
//                 {" "}
//                 Reply to {comment.pseudo}
//               </button>
//             </div>
//             {/* Render the textarea only if isClicked is true */}
//             {clickedId === index && textarea}
//           </div>
//         ))}
//     </>
//   );
// };

// export default Comments;
const Comments = ({ comments, textarea, setParentId, depth = 0 }) => {
  const cn = bem("Comments");
  const [clickedId, setClickedId] = useState(null);
  // console.log(comments)

  function handleClick(id) {
    if (clickedId === id) {
      setClickedId(null);
    } else {
      setClickedId(id);
      setParentId(id);
    }
  }
// console.log(comments)

return (
  <>
    {comments &&
      comments.map((comment, index) => {
        // Access the id_comments property from each comment object
        const id = comment.id_comments;

        return (
          <div
            className={cn("container")}
            key={index}
            style={{ paddingLeft: `${comment.level * 20}px` }}
          >
            <p>{comment.pseudo}</p>
            <p>{comment.body}</p>
            <div className={cn("bottom")}>
            <p>{formatDate(comment.date)}</p>
              {/* <p>{formatDate(comment.date)}</p>
              <button onClick={() => handleClick(index)} id={index}></button> */}
              <button onClick={() => handleClick(id)} id={index}>
                Reply to {comment.pseudo}
              </button>
            </div>
            {clickedId === id && textarea}
       
          </div>
        );
      })}
  </>
);
};

export default Comments;