import React from "react";
import "../../styles/app.css";
import "../../styles/app.scss";
import s from "../../styles/app.module.scss";
import { Link, Outlet } from "react-router-dom";
import SocIcon from "../../../public/icon.svg";

const Home = () => {
  return (
    <div data-testid="app-test1">
      <Link to={"/about"}>About </Link>
      <Link to={"/posts"}>Posts</Link>

      <div className={s.appWrapper} data-testid="app-test2">
        <div className="app">
          home block123
          <SocIcon width={24} />
          {__MODE__}
        </div>
        <div className="scss">
          home block <SocIcon width={24} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;

