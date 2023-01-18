// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";

const PostSide = () => {
  const params = useParams();
  const location = useLocation();
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="PostSide">
      {location.pathname === "/home" ? <PostShare /> : ""}
      {params.id === user._id ? <PostShare /> : ""}

      <Posts />
    </div>
  );
};

export default PostSide;
