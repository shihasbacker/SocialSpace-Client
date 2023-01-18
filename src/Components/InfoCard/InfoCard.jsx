// eslint-disable-next-line no-unused-vars
import React from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import * as UserApi from "../../Api/UserRequest.js";
import { logOut } from "../../Actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data);
      }
    };
    fetchProfileUser();
  }, [params]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const navigate=useNavigate()
  const handleChat = async (data) => {
    await UserApi.createChat(data)  
    navigate('/chat')
}

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser?.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser?.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser?.worksAt}</span>
      </div>
      {params.id === user._id ? (
        <button className="button logout-button" onClick={handleLogOut}>
          Logout
        </button>
      ) : (
        <span className="button chat-button" 
        onClick={() => {
          const data = {
              senderId: user._id,
              receiverId: params.id
          }
          handleChat(data);
      }}>
          Message
        </span>
      )}
    </div>
  );
};

export default InfoCard;
