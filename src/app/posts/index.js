import React, { memo, useEffect, useState } from "react";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import AllPosts from "../../components/all-posts";
import Nav from "../../components/nav";
import Links from "../../containers/links";
import Employees from "../../containers/employees";
import { getAllPostsData } from "../../services/post-services";
import sideLayout from "../../components/side-layout";
import SideLayout from "../../components/side-layout";

const Posts = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));


const [matches, setMatches] = useState(
  window.matchMedia("(min-width: 376px) and (max-width: 450px)").matches
);

useEffect(() => {
  const mediaQueryList = window.matchMedia("(min-width: 376px) and (max-width: 450px)");

  const listener = (e) => {
    setMatches(e.matches);
  };

  // Add event listener
  mediaQueryList.addEventListener('change', listener);

  // Remove event listener on cleanup
  return () => {
    mediaQueryList.removeEventListener('change', listener);
  };
}, []);

  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <PageLayoutLight style={"space-between"}>
        <Header title={"Welcome!"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />
        <AllPosts></AllPosts>
        <SideLayout display={"flex"} direction={matches ? "column" : "column"} width={matches ? "100%" : "45%"}  align={"baseline"} justify={matches ? "space-between":""}>
          <Links />
          <Employees />
        </SideLayout>
      </PageLayoutLight>
    </div>
  );
};

export default Posts;
