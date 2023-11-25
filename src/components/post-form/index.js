import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const PostForm = ({ onSubmit, newPost, setNewPost, errorMessage, postData }) => {
  const cn = bem("Post-form");

  return (
    <form
      className={cn()}
      method="post"
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <div className={cn("title")}>
        <label>Title</label>
        <input type="text" value={newPost?.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
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
        <textarea value={newPost?.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}></textarea>

        {errorMessage.body && <p className={cn("error-msg")}>{errorMessage.body}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
