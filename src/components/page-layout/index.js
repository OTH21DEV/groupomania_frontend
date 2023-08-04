import { React, memo } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const PageLayout = ({ children }) => {
  const cn = bem("PageLayout");
  return <div className={cn()}>{children}</div>;
};

export default memo(PageLayout);
