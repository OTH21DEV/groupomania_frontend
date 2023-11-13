import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import formatDate from "../../utils/format-date";

const Comments = ({ comments }) => {
  const cn = bem("Comments");
  // console.log(comments)
  return (
    < >
      {comments.sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((comment, index) => (
        <div className={cn("container")}>
          <p>{comment.pseudo}</p>
          <p>{comment.body}</p>

          <div className={cn("bottom")}>
            <p>{formatDate(comment.date)}</p>
            <button> Reply to </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;
