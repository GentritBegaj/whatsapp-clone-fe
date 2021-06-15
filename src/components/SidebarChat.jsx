import React from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const SidebarChat = () => {
  return (
    <SidebaRchat>
      <Avatar src="https://avatars.githubusercontent.com/u/77416371?v=4" />
      <div className="sidebarChat-info">
        <h2>Carlo Lombardi</h2>
        <p>Hey buddy</p>
      </div>
      <span style={{ fontSize: "12px", color: "grey" }}>14:28</span>
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
