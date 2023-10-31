import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import news from "../../assets/news.png";
import post from "../../assets/post.png";
import post_selected from "../../assets/post_selected.png";
import team from "../../assets/team.png";
import dashboard from "../../assets/dashboard.png";
import book from "../../assets/book.png";
import map from "../../assets/map.png";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const cn = bem("Nav");
  const location = useLocation();
  const apiEndpoint = location.pathname;

  return (
    <section className={cn()}>
      <div className={cn("icon-posts")}>
        <a href="/posts">
          {" "}
          <img src={news} alt="" className="rotate-icon" />
        </a>
        <div className={cn("icons")}>
          <img src={apiEndpoint === "/posts" || apiEndpoint === "/new-post"? post : post_selected} alt="" />

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
