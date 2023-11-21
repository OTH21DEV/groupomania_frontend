import React, { useState, useEffect, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import { getAllPostsData } from "../../services/post-services";
import PostCard from "../post-card";
import "./style.css";

const AllPosts = () => {
  console.log("allpost call");
  const cn = bem("Post");
  const [posts, setPosts] = useState([]);

  let userData = JSON.parse(localStorage.getItem("userData"));
  let headers = new Headers();
  headers.append("Authorization", `Bearer ${userData.token}`);

  //API call

  const getPostsApi = useCallback(async () => {
    const result = await getAllPostsData(headers);
    try {
      setPosts(result.message);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getPostsApi();
  }, [getPostsApi]);

  return (
    <div className={cn()}>
      {posts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post, index) => (
          <PostCard post={post} index={index} url={`/post/${post.id_post}`}></PostCard>
        ))}
    </div>
  );
};

export default AllPosts;
