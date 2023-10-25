import React, { useState, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import { getAllPostsData } from "../../services/post-services";
import formatDate from "../../utils/format-date";
import heart_empty from "../../assets/heart_empty.png";
import chat_bubble from "../../assets/chat_bubble.png";

import "./style.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  let userData = JSON.parse(localStorage.getItem("userData"));
  let headers = new Headers();
  headers.append("Authorization", `Bearer ${userData.token}`);

  //API call
  async function getPostsApi() {
    try {
      const result = await getAllPostsData(headers);

      setPosts(result.message);
    } catch (error) {
      // Handle error case
      console.log(error.message);
    }
  }

  getPostsApi();

  const cn = bem("Post");
  return (
    <div className={cn()}>
      {posts.map((post, index) => (
        <>
          <p className={cn("pseudo")}>{post.pseudo}</p>
          <h2 className={cn("title")}>{post.title}</h2>
          <p>{post.body}</p>

          {/* {post?.image_url && (
  <div className={cn("img")}>
    <img src={post.image_url} alt="" />
  </div>
)} */}

{/* {post?.image_url && (
  <div className={cn(post?.image_url? "img": "img-hide")}>
    <img src={post.image_url} alt="" />
  </div>
)} */}

{/* {post?.image_url && (
  <div className={cn("img")}>
    <img src={post.image_url} alt="" />
  </div>
)} */}


{/* {post?.image_url && (
  // <div className={cn("img")}>
    <img src={post.image_url} alt=""  />
  // </div>
)} */}



    <img src={post.image_url} alt="" className={cn("img")} />

          <div className={cn("bottom")}>
            <p>{formatDate(post.date)}</p>
            <div className={cn("bottom-notation-wrapper")}>
              <div className={cn("bottom-notation")}>
                <img src={heart_empty} alt="" />
                <p>{post.likes}</p>
              </div>
              <div className={cn("bottom-notation")}>
                <img src={chat_bubble} alt="" />
                <p>6</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Posts;
