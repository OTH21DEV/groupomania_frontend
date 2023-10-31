import React, { useState, useEffect } from "react";
import heart_empty from "../../assets/heart_empty.png";
import chat_bubble from "../../assets/chat_bubble.png";
import formatDate from "../../utils/format-date";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

const PostCard = ({ post, index,url }) => {
  const cn = bem("Post");
  const [isClicked, setIsClicked] = useState(false);

  function handleClick(){
    setIsClicked(true)
  }
  return (
    <div className={cn("wrapper")}>
      <a className={cn("link")} href={url} id={post.id_post} key={index} onClick={handleClick} >
        <p className={cn("link-pseudo")}>{post.pseudo}</p>
        <h2 className={cn("link-title")}>{post.title}</h2>
        <p className={cn("link-body")}>{post.body}</p>

        {post &&
          (post.image_url ? (
            <div className={cn("img-container")}>
           
              <img src={post.image_url} alt="" className={cn("img")}/>
            </div>
          ) : null)}
      </a>

      <div className={cn("bottom")}>
        <p className={cn("bottom-date")}>{formatDate(post.date)}</p>
        <div className={cn("bottom-notation-wrapper")}>
          <div className={cn("bottom-notation")}>
            <img src={heart_empty} alt="" />
            <p className={cn("bottom-notation-likes")}>{post.likes}</p>
          </div>
          <div className={cn("bottom-notation")}>
            <img src={chat_bubble} alt="" />
            <p className={cn("bottom-notation-comments")}>6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
