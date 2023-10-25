import React, { useState, useEffect } from "react";
import { cn as bem } from "@bem-react/classname";
import { createPost } from "../../services/post-services";
import {  useLocation } from "react-router-dom";
import "./style.css";
import Popup from "../popup";

const PostForm = () => {
  const cn = bem("Post-form");

  const [newPost, setNewPost] = useState({
    userId: "",
    title: "",
    body: "",
  });

  const [errorMessage, setErrorMessage] = useState({});
 
  const location = useLocation();
  let userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

    const apiEndpoint = location.pathname;

    console.log(apiEndpoint);
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
    <form
      className={cn()}
      method="post"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className={cn("title")}>
        <label>Title</label>
        <input type="text" value={newPost?.title || ""} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
        {errorMessage.title && <p className={cn("error-msg")}>{errorMessage.title}</p>}
      </div>

      <div className={cn("image")}>
        <label htmlFor="image-signup">
          Image
          <input name="image" type="file" />
        </label>
      </div>

      <div className={cn("textarea")}>
        <label>Description</label>
        <textarea value={newPost?.body || ""} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}></textarea>

        {errorMessage.body && <p className={cn("error-msg")}>{errorMessage.body}</p>}
      </div>

      <button type="submit">Submit</button>

      {showSuccessMessage && <Popup text={"Post created"} link={"/post"}></Popup>}
    </form>
  );
};

export default PostForm;
