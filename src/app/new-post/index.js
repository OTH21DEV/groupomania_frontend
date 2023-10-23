import React, { memo } from "react";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Nav from "../../components/nav";
import PostForm from "../../components/post-form";

const NewPost = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <PageLayoutLight style={"center"}>
        <Header title={"Welcome!"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />
        <PostForm></PostForm>
      </PageLayoutLight>
    </div>
  );
};

export default NewPost;
