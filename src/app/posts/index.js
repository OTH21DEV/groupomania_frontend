import React, { memo } from "react";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Post from "../../components/post";
import Nav from "../../components/nav";

const Posts = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  console.log(userData.pseudo);
  return (
    <>
    <PageLayoutLight>
      <Nav/>
      <Header title={"Welcome!"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl}/>
      {/* <Post></Post> */}
    </PageLayoutLight>
    </>
  );
};

export default Posts;
