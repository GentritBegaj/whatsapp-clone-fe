import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { socket } from "../pages/ChatMain";
// import { io } from "socket.io-client";

// export const socket = io(`ws://localhost:3001`, {
//   withCredentials: true,
//   transports: ["websocket"],
// });

function Chat({ conversation, user, activeSockets }) {
  const { isWriting, setIsWriting } = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [userLastSeenDB, setUserLastSeenDB] = useState("");

  const activeIds = activeSockets.map((u) => u.userId);

  const getReceiver = () =>
    conversation.members.filter((member) => member._id !== user._id);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return null;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderId: user._id,
        receiverId: getReceiver(),
        text: message,
        updatedAt: new Date(),
      },
    ]);

    try {
      const data = await axios.post(
        `http://localhost:3001/rooms/${conversation._id}`,
        {
          text: message,
        },
        {
          withCredentials: true,
        }
      );
      socket.emit("sendMessage", {
        senderId: user._id,
        receiverId: [...conversation.members],
        text: message,
        updatedAt: new Date(),
      });
      // console.log(data);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      // console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  useEffect(() => {
    socket.on("lastSeen", ({ lastSeenTime, userLastSeenId }) => {
      if (
        user._id !== userLastSeenId &&
        userLastSeenId === getReceiver()[0]._id
      ) {
        setUserLastSeenDB(lastSeenTime);
      }
    });
  }, []);

  useEffect(() => {
    setUserLastSeenDB(user.lastSeen);
  }, []);

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatC>
      <div className="chat-header">
        <Avatar
          src={
            conversation.members.find((member) => member._id !== user._id)
              .profilePic
          }
        />

        <div className="chat-headerInfo">
          {conversation.members.length < 3
            ? conversation.members
                .filter((member) => member._id !== user._id)
                .map((u, i) => (
                  <>
                    <p key={i}>{u.username}</p>
                    <small>
                      {activeIds.includes(u._id)
                        ? "Online"
                        : new Date(userLastSeenDB).getDay() ===
                          new Date().getDay()
                        ? `Last seen today at ${moment(userLastSeenDB).format(
                            "HH:mm"
                          )}`
                        : `Last seen at ${moment(userLastSeenDB).format(
                            "HH:mm on DD/MM/yyyy"
                          )}`}
                    </small>
                  </>
                ))
            : conversation.members
                .filter((member) => member._id !== user._id)
                .map((u, i) => (
                  <>
                    <p key={i}>
                      {i !== conversation.members.length - 2
                        ? `${u.username}, `
                        : `${u.username}`}
                    </p>
                  </>
                ))}
        </div>

        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chatBody">
        {messages.map((message, i) => (
          <div key={message._id} ref={scrollRef}>
            <p
              className={
                message.senderId === user._id
                  ? "chat-message chat-receiver"
                  : "chat-message"
              }
            >
              {message.text}
              <div style={{ marginBottom: "5px" }}>
                <span key={i} className="time-text">
                  {moment(message.updatedAt).format("HH.mm")}
                </span>
              </div>
            </p>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <InsertEmoticonIcon />
        <AttachFile className="attach" />

        <form onSubmit={handleMessageSubmit}>
          <input
            placeholder="Type a message"
            style={{ outlineWidth: 0 }}
            type="text"
            value={message}
            onChange={handleMessageChange}
          />
          <button type="submit">Send a message</button>
        </form>
        {isWriting ? <MicIcon /> : <SendIcon />}
      </div>
    </ChatC>
  );
}

export default Chat;

const ChatC = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;

  .chat-header {
    height: 48px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
  }

  .chat-headerInfo {
    flex: 1;
    padding-left: 20px;

    h3 {
      margin-bottom: 3px;
      font-weight: 500;
      font-size: 16px;
    }
  }

  .chatBody {
    flex: 1;
    background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
    background-repeat: repeat;
    background-position: center;
    padding: 40px;
    overflow: scroll;
    overflow-x: hidden;
    position: relative;
  }

  .chat-message {
    position: relative;
    font-size: 14px;
    padding: 8px;
    width: fit-content;
    min-width: 30px;
    min-height: 15px;
    border-radius: 10px;
    background-color: #fff;
    margin-bottom: 30px;
    max-width: 50%;
  }
  .time-text {
    font-size: xx-small;
    position: absolute;
    display: block;
    right: 8%;
    bottom: 0%;
  }

  .chat-receiver {
    margin-left: auto;
    background-color: #dcf8c6;
  }

  .chat-timestamps {
    margin-left: 10px;
    font-size: xx-small;
  }

  .chat-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    border-top: 1px solid lightgray;
    border-left: 1px solid lightgray;

    .MuiSvgIcon-root {
      padding: 10px;
      color: gray;
    }

    .attach {
      transform: rotate(45deg);
    }

    form {
      flex: 1;
      display: flex;

      input {
        flex: 1;
        border-radius: 30px;
        padding: 10px;
        border: none;
      }

      button {
        display: none;
      }
    }
  }
`;
