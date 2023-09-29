import { React, memo } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const FormLayout = ({ children }) => {
  const cn = bem("FormLayout");
  return (
    <>
      <div className={cn()}>
        <div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default memo(FormLayout);
