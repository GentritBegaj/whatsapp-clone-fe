import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import React from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";

function Chat() {
  const { isWriting, setİsWriting } = useState(false);

  return (
    <ChatC>
      <div className="chat-header">
        <Avatar src="https://avatars.githubusercontent.com/u/77416371?v=4" />

        <div className="chat-headerInfo">
          <p>Carlo Lombardi</p>
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
        <p className="chat-message">
          This is a message Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Tempora eaque aliquam provident. Ex officiis molestiae alias
          ratione, voluptates, facere hic esse beatae velit cum inventore? Est
          dolorem voluptatum porro quaerat!
        </p>
        <p className="chat-receiver chat-message">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
          corporis debitis itaque dolor sapiente. Libero nam fugit corporis
          nobis, aliquam nulla maxime velit id, quisquam animi, quo soluta amet
          sapiente?
        </p>
        <p className="chat-message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem dolores iusto reprehenderit cumque ad nam, est, minima
          autem adipisci commodi hic eligendi illum, tempora quis tempore nulla
          qui omnis molestiae.
        </p>
        <p className="chat-message chat-receiver">
          Lorem ipsum dolor, sit amet consectetur ?
        </p>
        <p className="chat-message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem dolores iusto reprehenderit cumque ad nam, est, minima
          autem adipisci commodi hic eligendi illum, tempora quis tempore nulla
          qui omnis molestiae.
        </p>
      </div>

      <div className="chat-footer">
        <InsertEmoticonIcon />
        <AttachFile className="attach" />
        <form>
          <input placeholder="Type a message" type="text" />
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
  }

  .chat-message {
    position: relative;
    font-size: 14px;
    padding: 8px;
    width: fit-content;
    border-radius: 10px;
    background-color: #fff;
    margin-bottom: 30px;
    max-width: 50%;
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
