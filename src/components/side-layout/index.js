import { React, memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const SideLayout = ({ children,display,direction,width,margin,align,justify}) => {
  const cn = bem("SideLayout");
  return <div className={cn()} style={{display:display,flexDirection:direction,width:width,marginRight:margin,alignItems:align,justifyContent:justify}}>{children}</div>;
};

export default memo(SideLayout);
