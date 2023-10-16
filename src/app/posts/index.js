import React, { memo } from "react";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Post from "../../components/post";

const Posts = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  console.log(userData.pseudo);
  return (
    <PageLayoutLight>
      <Header title={"Welcome"} pseudo={userData?.pseudo}></Header>
      <Post></Post>
    </PageLayoutLight>
  );
};

export default Posts;
