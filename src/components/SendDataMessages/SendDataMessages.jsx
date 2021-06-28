import React from "react";
import api from "../../services/api";
import "./SendDataMessages.css";

const SendDataMessages = (messages) => {
  const sendMessages = async () => {
    const message = {
      name: messages.data.data[1].text,
      city: messages.data.data[3].text,
      birthday: messages.data.data[5].text,
      email: messages.data.data[7].text,
      rating: messages.rating,
    };
    try {
      await api.post("/v1", message);
      let resultString = "";
      for (const [key, value] of Object.entries(message)) {
        resultString += `${key}: ${value}\n`;
      }
      setTimeout(function () {
        alert(resultString + "Dados salvos com sucesso!");
        window.location.reload();
      });
    } catch (err) {
      console.log("Ocorreu um erro!");
    }
  };
  return (
    <div className="button">
      <button className="sendButton" onClick={() => sendMessages()}>
        Enviar
      </button>
    </div>
  );
};

export default SendDataMessages;
