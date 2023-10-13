import React,{memo} from "react";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Post from "../../components/post";

const Posts = () => {
  return (
    <PageLayoutLight>

    <Header></Header>
       <Post></Post>
    
    
  </PageLayoutLight>
  );
};

export default Posts;