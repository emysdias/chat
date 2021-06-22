import React, { useState } from "react";

import "../shared/styles/style.css";
import Messages from "../components/Messages";
import { DefaultMessages } from "../shared";
import Icons from "../shared/assets";

const ChatFeed = () => {
  const [responses, setResponses] = useState([
    { text: DefaultMessages.first, isBot: true },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageSubmit = (message) => {
    const data = {
      message,
    };
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    };
    if (event.key === "Enter" || event.type === "click") {
      setResponses((responses) => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage("");
    }
  };

  return (
    <div className="chatSection">
      <div className="botContainer">
        <div className="messagesContainer">
          <Messages messages={responses} />
        </div>

        <div className="inputSection">
          <input
            type="text"
            value={currentMessage}
            onKeyDown={handleSubmit}
            onChange={handleMessageChange}
            className="messageInputField"
            placeholder="Digite algo..."
          />
          <div onClick={handleSubmit} className="inputImage">
            <img src={Icons.send} alt="send" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFeed;
