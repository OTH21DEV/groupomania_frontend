import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import formatDate from "../../utils/format-date";
import "./style.css";

const Comments = ({ comments, textarea, setParentId, depth = 0 }) => {
  const cn = bem("Comments");
  const [clickedId, setClickedId] = useState(null);

  function handleClick(id) {
    if (clickedId === id) {
      setClickedId(null);
    } else {
      setClickedId(id);
      //set reply comments's parentId  as an id_comments (transmetted after to comment(textarea))component as
      // a props id = {parentId} in post component
      setParentId(id);
    }
  }

  return (
    <>
      {comments &&
        comments.map((comment, index) => {
          console.log(comment);
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

export default React.memo(Comments);
