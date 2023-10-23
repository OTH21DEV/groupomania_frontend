import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";


const PostForm = () => {
  const cn = bem("Post-form");

  return (
    <form className={cn()}>
      <div className={cn("title")}>
        <label>Title</label>
        <input type="text"></input>
      </div>


      <div className={cn("image")}>
        <label htmlFor="image-signup">
          Image
          <input name="image" type="file" />
        </label>
      </div>

      <div className={cn("textarea")}>
        <label>Description</label>
        <textarea></textarea>
      </div>


      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
