import React from "react";
import Icon from "../../components/icon/Icon";
import useAuth from "../../hooks/useAuth";

const News = () => {
  const { auth } = useAuth();
  
  return (
    <div className="nk-news-list">
      <a className="nk-news-item" href="#news" onClick={(ev) => ev.preventDefault()}>
        <div className="nk-news-icon">
          <Icon name="card-view" />
        </div>
        <div className="nk-news-text">
          <p>
            Welcome back. You're signed in as: <span> {auth?.name}</span>
          </p>
          {/* <Icon name="external" /> */}
        </div>
      </a>
    </div>
  );
};

export default News;
