import { React, memo } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const PageLayoutLight = ({ children,style}) => {
  const cn = bem("PageLayoutLight");
  return <div className={cn()} style={{justifyContent:style}}>{children}</div>;
};

export default memo(PageLayoutLight);
