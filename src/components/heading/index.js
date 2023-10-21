import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Heading = ({ title }) => {
  const cn = bem("Heading");
  return <h2 className={cn()}>{title}</h2>;
};

export default Heading;
