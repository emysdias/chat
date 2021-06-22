import React from "react";
import "../shared/styles/style.css";

const Messages = ({ messages }) => {
  return (
    <div className="messagesSection">
      {messages.map((message, index) => {
        return (
          <div className="messagesContainer" key={index}>
            <div className="messageCard">
              {message.isBot ? (
                <div className="botCard">
                  <p>{message.text}</p>
                </div>
              ) : (
                <div className="userCard">
                  <p>{message.text}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
