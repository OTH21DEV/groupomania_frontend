import React,{memo} from "react";
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import Post from "../../components/post";

const Posts = () => {
  return (
    <PageLayout>
    <Header></Header>
       <Post></Post>
     
    
    </PageLayout>
  );
};

export default memo(Posts);