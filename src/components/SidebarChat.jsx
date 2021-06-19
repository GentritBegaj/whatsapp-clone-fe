import React from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { format } from "timeago.js";

const SidebarChat = ({ room, user }) => {
  const messages = room.messages;

  return (
    <SidebaRchat>
      <Avatar
        src={room.members.find((member) => member._id !== user._id).profilePic}
      />
      <div className="sidebarChat-info">
        {room.members
          .filter((member) => member._id !== user._id)
          .map((user) => (
            <h2 key={user._id}>{user.username}</h2>
          ))}
        <p>{messages[messages.length - 1].text}</p>
      </div>
      <span style={{ fontSize: "12px", color: "grey" }}>
        {format(room.updatedAt)}
      </span>
    </SidebaRchat>
  );
};

export default SidebarChat;

const SidebaRchat = styled.div`
  display: flex;
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;

  &:hover {
    background-color: #ebebeb;
  }

  .sidebarChat-info {
    margin-left: 15px;
    flex: 1;
  }

  .sidebarChat-info p {
    font-size: 14px;
    color: #413f3f;
  }
  .sidebarChat-info h2 {
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 8px;
  }
`;
