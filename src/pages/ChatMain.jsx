import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const ChatMain = () => {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default ChatMain;
