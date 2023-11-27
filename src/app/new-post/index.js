import React, { useState, useEffect } from "react";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Nav from "../../components/nav";
import PostForm from "../../components/post-form";
import { useLocation } from "react-router-dom";
import { createPost } from "../../services/post-services";
import Popup from "../../components/popup";
import SideLayout from "../../components/side-layout";

const NewPost = () => {
  const [newPost, setNewPost] = useState({
    userId: "",
    title: "",
    body: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const location = useLocation();
  const apiEndpoint = location.pathname;
  let userData = JSON.parse(localStorage.getItem("userData"));

  function handleSubmit(e) {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput?.files[0];

    e.preventDefault();
    setErrorMessage({});

    let formdata = new FormData();
    let headers = new Headers();

    if (location.pathname === "/new-post") {
      formdata.append("title", `${newPost.title}`);
      formdata.append("body", `${newPost.body}`);
      formdata.append("userId", `${userData.userId}`);
      headers.append("Authorization", `Bearer ${userData.token}`);
      if (file) {
        formdata.append("image", file, file.name);
      }
    }

    //API call
    async function submitForm() {
      try {
        const result = await createPost(apiEndpoint, formdata, headers);

        setErrorMessage(result.message);

        console.log(result);
        if (newPost.title !== "" && newPost.body !== "" && result.message === "Post created") {
          setShowSuccessMessage(true);
          console.log(result);
        }
      } catch (error) {
        // Handle error case
        console.log(error.message);
        setErrorMessage(error.message);
      }
    }

    submitForm();
  }

  return (
    <SideLayout display={"flex"}>
      <Nav />
      <PageLayoutLight style={"center"}>
        <Header title={"Welcome!"} pseudo={userData?.pseudo} avatar={userData?.avatarUrl} />
        <PostForm onSubmit={handleSubmit} newPost={newPost} setNewPost={setNewPost} errorMessage={errorMessage}></PostForm>
        {showSuccessMessage && <Popup text={"Post created"} link={"/posts"} btnName={"CLOSE"} isClicked={false}></Popup>}
      </PageLayoutLight>
    </SideLayout>
  );
};

export default NewPost;
