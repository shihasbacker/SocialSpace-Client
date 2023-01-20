// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { Link } from "react-router-dom";
import { userChats } from "../../Api/ChatRequests";
import { UilSetting } from "@iconscout/react-unicons";
import Conversation from "../../Components/Conversation/Conversation";
import LogoSearch from "../../Components/LogoSearch/LogoSearch";
import "./Chat.css";
import ChatBox from "../../Components/ChatBox/ChatBox";
import { io } from "socket.io-client";
const socket = io.connect("https://socialspace.fashionclues.shop");

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  // const socket = useRef();


  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.emit("new-user-add", user._id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // receive message from the socket server
  useEffect(() => {
    console.log('received-message useEffect')
    socket.on("receive-message", (data) => {
      console.log("data received in parent Chat.jsx:", data);
      setReceiveMessage(data);
    });
  }, [receiveMessage]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>
        <div>
          {/* chat body */}
          {currentChat ? (
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
            />
          ) : (
            <span className="chatbox-empty-message">
              Select a Chat head to view ...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
