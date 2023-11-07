import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import heart_empty from "../../assets/heart_empty.png";
import heart_full from "../../assets/heart_full.png";
import chat_bubble from "../../assets/chat_bubble.png";
import formatDate from "../../utils/format-date";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

const PostCard = ({ post, index, url, click, setLike, isVoted, isAuthor, id }) => {
  const cn = bem("Post");
  const [isClicked, setIsClicked] = useState(false);
  let navigate = useNavigate();

  function handleClick() {
    setIsClicked(true);
  }

  async function handleImageClick() {
    try {
      if (isVoted === false) {
        console.log("API called");

        await setLike(1);
        await click();
      } else if (isVoted === true) {
        await setLike(-1);
        await click();
      }
    } catch (error) {
      // Handle error case
      console.log(error.message);
    }
  }

  return (
    <div className={cn("wrapper")}>
      <a className={cn("link")} href={url} id={post?.id_post} key={index} onClick={handleClick}>
        <p className={cn("link-pseudo")}>{post?.pseudo}</p>
        <h2 className={cn("link-title")}>{post?.title}</h2>
        <p className={cn("link-body")}>{post?.body}</p>

        {post &&
          (post?.image_url ? (
            <div className={cn("img-container")}>
              <img src={post?.image_url} alt="" className={cn("img")} />
            </div>
          ) : null)}
      </a>

      <div className={cn("bottom")}>
        <p className={cn("bottom-date")}>{formatDate(post?.date)}</p>
        <div className={cn("bottom-notation-wrapper")}>
          {/* <div className={cn("bottom-notation")} onClick={() => { setLike(like+1); click(); }}> */}
          <div className={cn("bottom-notation")}>
            {/* <img src={heart_empty} alt="" onClick={(e) =>{  console.log(e.target)}} /> */}
            <img src={isVoted === true ? heart_full : heart_empty} alt="" onClick={handleImageClick} />
            <p className={cn("bottom-notation-likes")}>{post?.likes}</p>
          </div>
          <div className={cn("bottom-notation")}>
            <img src={chat_bubble} alt="" />
            <p className={cn("bottom-notation-comments")}>6</p>
          </div>
        </div>
      </div>

      {isAuthor === true && (
        <>
          <button className={cn("modify-btn")} onClick={() => navigate(`/modify-post/${id}`)}>
            Modify
          </button>
          <button className={cn("delete-btn")}>Delete</button>
        </>
      )}
    </div>
  );
};

export default PostCard;
