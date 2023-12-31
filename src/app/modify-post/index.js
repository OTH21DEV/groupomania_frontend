import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { updateOnePostData } from "../../services/post-services";
import PageLayoutLight from "../../components/page-layout-light";
import Header from "../../components/header";
import Nav from "../../components/nav";
import PostForm from "../../components/post-form";
import Popup from "../../components/popup";
import SideLayout from "../../components/side-layout";

const ModifyPost = () => {
  let id = useParams();

  const [errorMessage, setErrorMessage] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const location = useLocation();
  let userData = JSON.parse(localStorage.getItem("userData"));
  let postData = JSON.parse(localStorage.getItem("postData"));

  let apiEndpoint = location.pathname === `/modify-post/${id.id}`;

  const [newPost, setNewPost] = useState(
    apiEndpoint
      ? {
          userId: "",
          title: postData?.title,
          body: postData?.body,
        }
      : {
          userId: "",
          title: "",
          body: "",
        }
  );

  function handleSubmit(e) {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput?.files[0];

    e.preventDefault();
    setErrorMessage({});

    let formdata = new FormData();
    let headers = new Headers();

    if (location.pathname === `/modify-post/${id.id}`) {
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
        const result = await updateOnePostData(id.id, formdata, headers);
        setErrorMessage(result.message);

        if (newPost.title !== "" && newPost.body !== "" && (result.message === "Post modified" || result.message === "Post modified with file")) {
          setShowSuccessMessage(true);
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
        {showSuccessMessage && <Popup text={"Post modified"} link={"/posts"} btnName={"CLOSE"} isClicked={false}></Popup>}
      </PageLayoutLight>
    </SideLayout>
  );
};

export default ModifyPost;
