import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import news from "../../assets/news.png";
import post from "../../assets/post.png";
import post_selected from "../../assets/post_selected.png";
import team from "../../assets/team.png";
import dashboard from "../../assets/dashboard.png";
import book from "../../assets/book.png";
import map from "../../assets/map.png";
import logout from "../../assets/logout.png";
import "./style.css";

const Nav = () => {
  const cn = bem("Nav");
  const location = useLocation();
  const apiEndpoint = location.pathname;
  let navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    localStorage.clear();
  }
  return (
    <section className={cn()}>
      <div className={cn("icon-posts")}>
        <a href="/posts">
          {" "}
          <img src={news} alt="" className="rotate-icon" />
        </a>
        <div className={cn("icons")}>
          <img className={cn("icon_logout")} onClick={handleLogout} src={logout} alt="" />
          <img src={apiEndpoint === "/posts" || apiEndpoint === "/new-post" ? post : post_selected} alt="" />
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
