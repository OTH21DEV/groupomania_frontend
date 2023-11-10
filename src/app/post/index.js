import React, { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Nav from "../../components/nav";
import PostCard from "../../components/post-card";
import { getOnePostData } from "../../services/post-services";
import { deletePostData } from "../../services/post-services";
import { getPostCommentsData } from "../../services/post-services";
import Comment from "../../components/comment";
import { postLikeData } from "../../services/post-services";
import Popup from "../../components/popup";
import Comments from "../../components/comments";
const Post = () => {
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(null);
  const [isVoted, setIsVoted] = useState("");
  const [isAuthor, setIsAuthor] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [comments, setComments] = useState([]);
  let navigate = useNavigate();
  let id = useParams();
  let userData = JSON.parse(localStorage.getItem("userData"));
  let headers = new Headers();
  headers.append("Authorization", `Bearer ${userData.token}`);
  let urlencoded = new URLSearchParams();
  urlencoded.append("like", like);

  //API call
  async function getPostApi() {
    try {
      const result = await getOnePostData(id.id, headers);

      setPost(result);
      setIsVoted(result.isVoted);
      setIsAuthor(result.isAuthor);
      localStorage.setItem("postData", JSON.stringify(post));
      // console.log(post)
    } catch (error) {
      // Handle error case
      console.log(error.message);
    }
  }

  getPostApi();

  //API call save the like +-
  async function postLikeApi() {
    try {
      const result = await postLikeData(id.id, headers, urlencoded);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  //API call delete Post
  async function deletePostApi() {
    try {
      setIsClicked(true);
      const result = await deletePostData(id.id, headers);
      // console.log(result);
      navigate("/posts");
    } catch (error) {
      console.log(error.message);
    }
  }

   //API call - get post's comments 
   async function getPostCommentsApi() {
    try {
      const result = await getPostCommentsData(id.id, headers);

      setComments(result.data);
      localStorage.setItem("commentsData", JSON.stringify(comments));
      // localStorage.setItem("postData", JSON.stringify(post));
      // console.log(post)
    } catch (error) {
      // Handle error case
      console.log(error.message);
    }
  }

  getPostCommentsApi()
  

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <PageLayoutLight style={"space-between"}>
        <Header title={"Company news"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />

        <PostCard post={post.message} index={post?.id_post} url={""} like={postLikeApi} setLike={setLike} isVoted={isVoted} isAuthor={isAuthor} id={id.id} clickBtn={handleClick}></PostCard>
      <Comments comments={comments}></Comments>
        <Comment avatar={userData?.avatarUrl}></Comment>
        {isClicked && <Popup text={"Are you sure to delete this post?"} link={"/posts"} btnName={"YES"} isClicked={isClicked} toDelete={deletePostApi}></Popup>}
      </PageLayoutLight>
    </div>
  );
};

export default Post;
