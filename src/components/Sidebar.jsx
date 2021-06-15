import React from "react";
import styled from "styled-components";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import SidebarChat from "./SidebarChat";
import { useState } from "react";

function Sidebar() {
  const [isEdit, setIsEdit] = useState(false);

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  return (
    <SideBar>
      <div className="sidebar-header">
        <Avatar src="https://avatars.githubusercontent.com/u/69857293?v=4" />
        <div className="sidebar-headerRight">
          <IconButton style={{ paddingLeft: "0", paddingRight: "0" }}>
            <DonutLargeIcon />
          </IconButton>
          <IconButton style={{ paddingLeft: "0", paddingRight: "0" }}>
            <ChatIcon />
          </IconButton>
          <IconButton
            onClick={editHandler}
            style={{ paddingLeft: "0", paddingRight: "0" }}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {isEdit ? (
        <EditOne>
          <label id="editPic" className="img-box">
            <img
              className="edit-img"
              src="https://avatars.githubusercontent.com/u/69857293?v=4"
              alt=""
            />
            <input type="file" id="editPic" style={{ display: "none" }} />
          </label>
        </EditOne>
      ) : (
        <div className="sidebar-search">
          <div className="sidebar-searchContainer">
            <SearchOutlined />
            <input
              className="sidebar-search-input"
              placeholder="Search or start new chat"
              type="text"
            />
          </div>
        </div>
      )}

      {isEdit ? (
        <EditTwo>
          <div className="box-1">
            <div className="box-info">
              <p>Your name</p>
              <input type="text" value={"Huseyin Can"} />
            </div>
            <div className="box-svg">
              <EditIcon style={{ color: "grey" }} />
            </div>
          </div>
          <div className="box-2">
            <p style={{ fontSize: "14px", color: "#666666" }}>
              This is not your username or pin. This name will be visible to
              your WhatsApp contacs.
            </p>
          </div>
          <div className="box-3">
            <div className="box-info">
              <p>About</p>
              <input type="text" value={"Busy"} />
            </div>
            <div className="box-svg">
              <EditIcon style={{ color: "grey" }} />
            </div>
          </div>
        </EditTwo>
      ) : (
        <div className="sidebar-chats">
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
        </div>
      )}
    </SideBar>
  );
}

export default Sidebar;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.35;

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    height: 49px;
    padding: 10px 16px;
    border-right: 1px solid lightgray;
    min-width: 10vw;

    .MuiSvgIcon-root {
      margin-right: 2vw;
      font-size: 24px !important;
    }
  }

  .sidebar-search {
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
    height: 39px;
    padding: 10px;
  }

  .sidebar-searchContainer {
    display: flex;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;

    .sidebar-search-input {
      border: none;
      outline-width: 0;
      margin-left: 8px;
    }

    .MuiSvgIcon-root {
      color: gray;
      padding: 10px;
      margin-left: 6px;
    }
  }

  .sidebar-chats {
    flex: 1;
    background-color: white;
    overflow: scroll;
    overflow-x: hidden;
  }
`;

const EditOne = styled.div`
  height: 50%;

  .img-box {
    display: grid;
    place-items: center;
    height: 100%;

    .edit-img {
      height: 200px;
      width: 200px;
      border-radius: 50%;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const EditTwo = styled.div`
  height: 50%;

  .box-1,
  .box-3 {
    height: 70px;
    padding: 15px 25px;
  }

  .box-2 {
    height: 50px;
    padding: 15px 25px;
  }

  .box-1,
  .box-3 {
    background-color: #fff;
    display: flex;

    .box-svg {
      display: flex;
      flex-direction: column-reverse;
      padding: 10px;
      margin-bottom: 5px;
    }

    .box-info {
      flex: 1;

      p {
        margin-bottom: 15px;
        color: #0f9c8f;
        font-size: 14px;
        padding-left: 2px;
      }

      input {
        border: none;
        font-size: 16px;
        color: #666666;

        &:focus {
          outline: none;
        }
      }
    }
  }
`;
