import React, { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Nav from "../../components/nav";
import PostCard from "../../components/post-card";
import { getOnePostData } from "../../services/post-services";
import { deletePostData } from "../../services/post-services";
import { getPostCommentsData } from "../../services/post-services";
import { postCommentData } from "../../services/post-services";
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

  const [parentId, setParentId] = useState(null);
  //for textarea comment creation
  const [text, setText] = useState("");


  let navigate = useNavigate();
  let id = useParams();
  let userData = JSON.parse(localStorage.getItem("userData"));
  let headers = new Headers();
  headers.append("Authorization", `Bearer ${userData.token}`);
  let urlencoded = new URLSearchParams();
  urlencoded.append("like", like);

  // API call to fetch post data

  useEffect(() => {
    async function getPostData() {
      try {
        const result = await getOnePostData(id.id, headers);
        setPost(result.post);
        setIsVoted(result.isVoted);
        setIsAuthor(result.isAuthor);
        setComments(result.comments);
        localStorage.setItem("postData", JSON.stringify(post));
      } catch (error) {
        console.log(error.message);
      }
    }

    getPostData();
  }, []); // Empty dependency array ensures the effect runs only once

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
      await deletePostData(id.id, headers);
      // console.log(result);
      navigate("/posts");
    } catch (error) {
      console.log(error.message);
    }
  }

  //API call-   post comment
  async function postCommentApi() {
    let urlencoded = new URLSearchParams();
    urlencoded.append("body", text);
    urlencoded.append("parent_id", parentId);

    try {

      await postCommentData(id.id, headers, urlencoded);
      setText("")
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <PageLayoutLight style={"space-between"}>
        <Header title={"Company news"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />
        <PostCard post={post} index={post?.id_post} url={""} like={postLikeApi} setLike={setLike} isVoted={isVoted} isAuthor={isAuthor} id={id.id} clickBtn={handleClick}></PostCard>
        
        {/* Includes reply comments -  parentId is the id of replied comment */}
        <Comments
          comments={comments}
          textarea={<Comment avatar={userData?.avatarUrl} postComment={postCommentApi} setText={setText} text={text} setParentId={setParentId} id={parentId} />}
          setParentId={setParentId}
        />
        {/* MAIN REPLY - parentId is the id of main post  */}
        <Comment avatar={userData?.avatarUrl} postComment={postCommentApi} setText={setText} text={text} setParentId={setParentId} id={id.id}></Comment>
        {isClicked && <Popup text={"Are you sure to delete this post?"} link={"/posts"} btnName={"YES"} isClicked={isClicked} toDelete={deletePostApi}></Popup>}
      </PageLayoutLight>
    </div>
  );
};

export default Post;
