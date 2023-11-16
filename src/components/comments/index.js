import React, { memo, useState, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import formatDate from "../../utils/format-date";


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
            <>
              <div className={cn("container")} key={index} style={{ paddingLeft: `${depth * 20}px` }}>
                <p>{comment.pseudo}</p>
                <p>{comment.body}</p>
                <div className={cn("bottom")}>
                  <p>{formatDate(comment.date)}</p>
     
                  <button onClick={() => handleClick(id)} id={index}>
                    Reply to {comment.pseudo}
                  </button>
                </div>
                {clickedId === id && textarea}
              </div>

              {/* Render child comments recursively */}
              <Comments comments={comment.children} textarea={textarea} setParentId={setParentId} depth={depth + 1} />
            </>
          );
        })}
    </>
  );
};

export default Comments;
