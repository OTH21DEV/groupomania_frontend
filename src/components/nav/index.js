import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import news from "../../assets/news.png";
import post from "../../assets/post.png";
import team from "../../assets/team.png";
import dashboard from "../../assets/dashboard.png";
import book from "../../assets/book.png";
import map from "../../assets/map.png";

const Nav = () => {
  const cn = bem("Nav");
  return (
    <section className={cn()}>
      <div className={cn("icon-posts")}>
        <a href="/post">
          {" "}
          <img src={news} alt="" className="rotate-icon" />
        </a>
        <div className={cn("icons")}>
          <img src={post} alt="" />

          <img src={team} alt="" />
          <img src={map} alt="" />
          <img src={dashboard} alt="" />
          <img src={book} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Nav;
