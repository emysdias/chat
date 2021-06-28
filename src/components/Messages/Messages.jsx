import React, { useEffect, useRef } from "react";
import Rating from "../Rating/Rating";
import Icons from "../../shared/assets";
import "./Messages.css";

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className="messagesSection">
      {messages.map((message, index) => {
        return (
          <div className="messagesContainer" key={index}>
            <div>
              {message.isBot ? (
                <div className="botContainerCard">
                  <img src={Icons.spider} alt="spider" />
                  <div className="botCard">
                    <p>{message.text}</p>
                    {message.rating && <Rating data={messages} />}
                  </div>
                </div>
              ) : (
                <div className="userCard">
                  <p>{message.text}</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
