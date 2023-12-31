import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heart_empty from "../../assets/heart_empty.png";
import heart_full from "../../assets/heart_full.png";
import chat_bubble from "../../assets/chat_bubble.png";
import formatDate from "../../utils/format-date";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const PostCard = ({ pathname, getPostData, post, index, url, like, setLike, isVoted, isAuthor, id, clickBtn, setIsVoted }) => {
  const cn = bem("Post");
  const [isClicked, setIsClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250;
  const contentOverMaxLength = post.body?.length > maxLength;
  const shortContent = contentOverMaxLength ? `${post.body.slice(0, maxLength)}...` : post.body;

  let navigate = useNavigate();
  let state = sessionStorage.getItem(`postExpanded-${post.id_post}`);

  function handleClick() {
    setIsClicked(true);
    setIsExpanded(false);
  }

  function handleExpandClick(event) {
    event.preventDefault(); // Prevent default anchor behavior
    event.stopPropagation(); // Stop event from propagating to parent elements
    setIsExpanded((currentState) => !currentState); // Toggle the expansion of the content
    sessionStorage.setItem(`postExpanded-${post.id_post}`, "true");
  }

  async function handleImageClick() {
    try {
      if (isVoted === false) {
        await setLike(1);
        await like();
        await setIsVoted(true);
        await getPostData();
      } else if (isVoted === true) {
        await setLike(-1);
        await like();
        await setIsVoted(false);
        await getPostData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={cn("wrapper")}>
      <a className={cn("link")} href={`/post/${post.id_post}`} id={post?.id_post} key={index} onClick={handleClick}>
        <p className={cn("link-pseudo")}>{post?.pseudo}</p>
        <h2 className={cn("link-title")}>{post?.title}</h2>

        <p className={cn("link-body")}>{isExpanded || (pathname && state) ? post.body : shortContent}</p>

        {contentOverMaxLength && !(pathname && state) ? (
          <p className={cn("content-expand")} onClick={(event) => handleExpandClick(event)}>
            Read more
          </p>
        ) : (
          ""
        )}

        {post &&
          (post?.image_url ? (
            <div className={cn(id ? "img-container-post" : "img-container")}>
              <img src={post?.image_url} alt="" className={cn("img")} />
            </div>
          ) : null)}
      </a>

      <div className={cn("bottom")}>
        <p className={cn("bottom-date")}>{formatDate(post?.date)}</p>
        <div className={cn("bottom-notation-wrapper")}>
          <div className={cn("bottom-notation")}>
            <img src={isVoted === true ? heart_full : heart_empty} alt="" onClick={handleImageClick} />
            <p className={cn("bottom-notation-likes")}>{post?.likes}</p>
          </div>
          <div className={cn("bottom-notation")}>
            <img src={chat_bubble} alt="" />
            <p className={cn("bottom-notation-comments")}>{post?.comments === null ? 0 : post?.comments}</p>
          </div>
        </div>
      </div>

      {isAuthor === true && (
        <>
          <button
            className={cn("modify-btn")}
            onClick={() => {
              navigate(`/modify-post/${id}`);
              localStorage.setItem("postData", JSON.stringify(post));
            }}
          >
            Modify
          </button>
          <button className={cn("delete-btn")} onClick={clickBtn}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default React.memo(PostCard);
