import React from "react";
import { cn as bem } from "@bem-react/classname";

const Header = ({ title, pseudo }) => {
  const cn = bem("Header");
  return (
    <>
      <h1 className={cn("title")}>{title}</h1>
      <div>
        <p>{pseudo}</p>
      </div>
    </>
  );
};

export default Header;
