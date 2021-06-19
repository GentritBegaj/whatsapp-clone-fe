import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Redirect } from "react-router-dom";
import { io } from "socket.io-client";

export const socket = io(`ws://localhost:3001`, {
  withCredentials: true,
  transports: ["websocket"],
});

const ChatMain = () => {
  const [contacts, setContacts] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [user, setUser] = useState({});
  const [NewMessage, setNewMessage] = useState(null);
  const [activeSockets, setActiveSockets] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchUser =
    // useCallback(
    async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/me`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setUser(data);

          socket.emit("isOnline", { userID: data._id });
        } else {
          console.log("Error while fetching user");
        }
      } catch (error) {
        console.log(error);
      }
    };
  // , []);

  useEffect(() => {
    fetchUser();
    socket.on("connect", () => {
      // console.log(socket.id);
    });
    socket.on("getUsers", (a) => setActiveSockets(a));
  }, []);

  if (localStorage.getItem("loggedIn") !== "true") {
    return <Redirect to="login" />;
  }

  return (
    <div className="app-wrapper">
      <Sidebar
        user={user}
        setConversation={setConversation}
        fetchUser={fetchUser}
        setSearchInput={setSearchInput}
      />
      {conversation ? (
        <Chat
          conversation={conversation}
          newMessage={NewMessage}
          user={user}
          activeSockets={activeSockets}
        />
      ) : (
        <span style={{ fontSize: "26px", margin: "50px auto" }}>
          Click on a conversation to open it
        </span>
      )}
    </div>
  );
};

export default ChatMain;
