import React from 'react'
import { cn as bem } from "@bem-react/classname";
import "./style.css";


const Posts = () => {

  const cn = bem("Post");
  return (
    <div className={cn()}>Test</div>
  )
}

export default Posts