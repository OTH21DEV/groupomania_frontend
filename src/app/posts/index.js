import React, { memo } from "react";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Post from "../../components/post";
import Nav from "../../components/nav";
import Links from "../../containers/links";

const Posts = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div style={{display:"flex"}}>
      <Nav />
      <PageLayoutLight>
        <Header title={"Welcome!"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />
        {/* <Post></Post> */}
        <Links />
      </PageLayoutLight>
    </div>
  );
};

export default Posts;
