import React, { memo } from "react";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import AllPosts from "../../components/all-posts";
import Nav from "../../components/nav";
import Links from "../../containers/links";
import Employees from "../../containers/employees";
import { getAllPostsData } from "../../services/post-services";


const Posts = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div style={{display:"flex"}}>
      <Nav />
      <PageLayoutLight style={"space-between"}>
        <Header title={"Welcome!"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />
        <AllPosts></AllPosts>
        <div style={{display:"flex", flexDirection:"column", width:"45%", marginRight:"20px"}}>
        <Links />
        <Employees/>
        </div>
      </PageLayoutLight>
    </div>
  );
};

export default Posts;
