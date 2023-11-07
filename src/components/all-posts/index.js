import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import { getAllPostsData } from "../../services/post-services";
// import formatDate from "../../utils/format-date";
// import heart_empty from "../../assets/heart_empty.png";
// import chat_bubble from "../../assets/chat_bubble.png";
import PostCard from "../post-card";
import { postLikeData } from "../../services/post-services";
import "./style.css";

const AllPosts = () => {
  const cn = bem("Post");
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  //test

  //

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

  //test

  return (
    <div className={cn()}>
      {posts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post, index) => (
          <>
            <PostCard post={post} index={index} url={`/post/${post.id_post}`}></PostCard>
          </>
        ))}
    </div>
  );
};

export default AllPosts;
