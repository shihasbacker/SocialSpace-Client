import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUser, unFollowUser } from "../../Actions/UserAction";

const User = ({person}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const handleFollow = () => {
      following?
        dispatch(unFollowUser(person._id,user)):
        dispatch(followUser(person._id, user));

        setFollowing((prev)=>!prev)
    }
  return (
    <div className="follower">
      <div onClick={()=>{
        navigate(`/profile/${person._id}`)
      }}>
        <img src={person.profilePicture? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png"} alt="" className="followerImage" />
        <div className="name">
          <span>{person.firstname} {person.lastname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button className={following? "button fc-button unfollowButton": "button fc-button"} onClick={handleFollow}>{following?"Unfollow":"Follow"}</button>
    </div>
  );
};

export default User;
