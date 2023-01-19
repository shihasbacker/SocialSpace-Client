// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./ProfileCard.css";
import { useState } from "react";
import { getUser } from "../../Api/UserRequest";

const ProfileCard = ({ location }) => {
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profile ,setProfile] = useState(null)

  
  useEffect(()=>{
    
    if(params.id !== user._id){
      getUser(params.id).then((response)=>{
        setProfile(response.data)
      })
    }
  },[params])

  useEffect(()=>{
    setProfile(user)
  },[user])
  
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profile?.coverPicture
              ? serverPublic + profile?.coverPicture
              : serverPublic + "defaultCover.jpeg"
          }
          alt=""
        />
        <img
          src={
            profile?.profilePicture
              ? serverPublic + profile?.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {profile?.firstname} {profile?.lastname}
        </span>
        <span>{profile?.worksAt ? profile?.worksAt : "Write about yourself"}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profile?.following.length}</span>
            <span>Following</span>
          </div>

          <div className="vl"></div>

          <div className="follow">
            <span>{profile?.followers.length}</span>
            <span>Followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === profile?._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
