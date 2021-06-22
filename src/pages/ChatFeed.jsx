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
    const messageChoice = {
      0: {
        text: `Que satisfação ${message}. Agora que sei seu nome, qual a cidade e estado que você mora?`,
        isBot: true,
      },

      1: {
        text: DefaultMessages.third,
        isBot: true,
      },
      2: {
        text: DefaultMessages.fourth,
        isBot: true,
      },
      3: {
        text: DefaultMessages.fifth,
        isBot: true,
      },
      4: {
        text: DefaultMessages.reload,
        isBot: true,
      },
    };
    setResponses((responses) => [
      ...responses,
      messageChoice[timeMessage] || [],
    ]);

    if (timeMessage !== 4) {
      setTimeMessage((timeMessage) => timeMessage + 1);
    } else {
      setTimeMessage(4);
    }
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
