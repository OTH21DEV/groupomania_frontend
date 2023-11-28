import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOnePostData } from "../../services/post-services";
import { postLikeData } from "../../services/post-services";
import { postCommentData } from "../../services/post-services";
import { deletePostData } from "../../services/post-services";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Nav from "../../components/nav";
import PostCard from "../../components/post-card";
import Comment from "../../components/comment";
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

  let headers = useMemo(() => {
    let head = new Headers();
    head.append("Authorization", `Bearer ${userData.token}`);
    return head;
  }, [userData.token]);

  let urlencoded = useMemo(() => {
    let encoded = new URLSearchParams();
    encoded.append("like", like);
    return encoded;
  }, [like]);

  //tets
  let pathname = `/post/${id.id}`;

  // API call to fetch post data
  const getPostData = useCallback(async () => {
    const result = await getOnePostData(id.id, headers);
    try {
      console.log("call api");
      setPost(result.post);
      setComments(result.comments);
      setIsVoted(result.isVoted);
      setIsAuthor(result.isAuthor);

      localStorage.setItem("postData", JSON.stringify(post));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  //API call save the like +-
  const postLikeApi = useCallback(async () => {
    try {
      const result = await postLikeData(id.id, headers, urlencoded);

      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }, [id.id, headers, urlencoded]);

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
      setText("");
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleClick() {
    setIsClicked(!isClicked);
  }

  //Updates states(comments) after new commit submit
  const handleCommentSubmit = async () => {
    try {
      getPostData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <PageLayoutLight style={"space-between"}>
        <Header title={"Company news"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />
        <PostCard
          getPostData={getPostData}
          post={post}
          index={post?.id_post}
          url={""}
          like={postLikeApi}
          setLike={setLike}
          isVoted={isVoted}
          setIsVoted={setIsVoted}
          isAuthor={isAuthor}
          id={id.id}
          clickBtn={handleClick}
          pathname={pathname}
        ></PostCard>

        {/* Includes reply comments -  parentId is the id of replied comment */}
        <Comments
          comments={comments}
          textarea={<Comment onSubmit={handleCommentSubmit} avatar={userData?.avatarUrl} postComment={postCommentApi} setText={setText} text={text} setParentId={setParentId} id={parentId} />}
          setParentId={setParentId}
        />
        {/* MAIN REPLY - parentId is the id of main post  */}
        <Comment onSubmit={handleCommentSubmit} avatar={userData?.avatarUrl} postComment={postCommentApi} setText={setText} text={text} setParentId={setParentId} id={id.id}></Comment>
        {isClicked && <Popup text={"Are you sure to delete this post?"} link={"/posts"} btnName={"YES"} isClicked={isClicked} toDelete={deletePostApi}></Popup>}
      </PageLayoutLight>
    </div>
  );
};

export default React.memo(Post);
