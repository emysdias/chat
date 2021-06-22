import React, { useState } from "react";

import "../shared/styles/style.css";
import Messages from "../components/Messages";
// import api from "../services/api";
import { DefaultMessages } from "../shared";
import Icons from "../shared/assets";

const ChatFeed = () => {
  const [responses, setResponses] = useState([
    { text: DefaultMessages.first, isBot: true },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [timeMessage, setTimeMessage] = useState(0);

  const handleMessageSubmit = (message) => {
    var responseData = {};

    if (timeMessage === 0) {
      responseData = {
        text: `Que satisfação ${message}. Agora que sei seu nome, qual a cidade e estado que você mora?`,
        isBot: true,
      };
    } else if (timeMessage === 1) {
      responseData = {
        text: DefaultMessages.third,
        isBot: true,
      };
    } else if (timeMessage === 2) {
      responseData = {
        text: DefaultMessages.fourth,
        isBot: true,
      };
    } else if (timeMessage === 3) {
      responseData = {
        text: DefaultMessages.fifth,
        isBot: true,
      };
    } else {
      responseData = {
        text: DefaultMessages.reload,
        isBot: true,
      };
    }
    setResponses((responses) => [...responses, responseData]);
    setTimeMessage((timeMessage) => timeMessage + 1);
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
            id="name"
            name="name"
            type="email"
            onChange={handleMessageChange}
            value={currentMessage}
            placeholder="Digite algo..."
            onKeyDown={handleSubmit}
            className="messageInputField"
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
