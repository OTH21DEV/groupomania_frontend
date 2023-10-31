import React, { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Nav from "../../components/nav";
import PostCard from "../../components/post-card";
import { getOnePostData } from "../../services/post-services";
import Comment from "../../components/comment";

const Post = () => {
  const [post, setPost] = useState([]);
  let id = useParams();
  const navigate = useNavigate();

  let userData = JSON.parse(localStorage.getItem("userData"));
  let headers = new Headers();
  headers.append("Authorization", `Bearer ${userData.token}`);

  //API call
  async function getPostApi() {
    try {
      const result = await getOnePostData(id.id, headers);

      setPost(result.message);
      // console.log(post)
    } catch (error) {
      // Handle error case
      console.log(error.message);
    }
  }

  getPostApi();

  // console.log(post)

  // let userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <PageLayoutLight style={"space-between"}>
        <Header title={"Company news"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />

        <PostCard post={post} index={post.id_post} url={""}></PostCard>
        <Comment avatar={userData?.avatarUrl}></Comment>
      </PageLayoutLight>
    </div>
  );
};

export default Post;
