import React, { useState } from "react";

import "../shared/styles/style.css";
import Messages from "../components/Messages";
// import api from "../services/api";
import { DefaultMessages } from "../shared";
import Icons from "../shared/assets";
import { useFormik } from "formik";
import * as Yup from "yup";

const ChatFeed = () => {
  const [responses, setResponses] = useState([
    { text: DefaultMessages.first, isBot: true },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [timeMessage, setTimeMessage] = useState(0);
  const [inputType, setInputType] = useState("text");

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      text: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Nome muito curto!")
        .max(45, "Máxio 45 caracteres")
        .required("Campo requerido"),
      text: Yup.string()
        .min(3, "Muito curto!")
        .max(45, "Máxio 45 caracteres")
        .required("Campo requerido"),
      email: Yup.string().email("Email inválido").required("Campo requerido"),
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const handleMessageSubmit = (message) => {
    const messageChoice = {
      0: {
        text: `Que satisfação ${message}. Agora que sei seu nome, qual a cidade e estado que você mora?`,
        isBot: true,
      },

      1: {
        text: DefaultMessages.second,
        isBot: true,
      },
      2: {
        text: DefaultMessages.third,
        isBot: true,
      },
      3: {
        text: DefaultMessages.fourth,
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

    if (messageChoice[timeMessage].text === DefaultMessages.second) {
      setInputType("date");
    } else if (messageChoice[timeMessage].text === DefaultMessages.third) {
      setInputType("email");
    } else {
      setInputType("text");
    }
    if (timeMessage !== 4) {
      setTimeMessage((timeMessage) => timeMessage + 1);
    }
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
    <form onSubmit={formik.handleSubmit}>
      <div className="chatSection">
        <div className="botContainer">
          <div className="messagesContainer">
            <Messages messages={responses} />
          </div>
          <div className="inputSection">
            <input
              type={inputType}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleSubmit}
              placeholder="Digite Algo..."
              className="messageInputField"
            />
            {formik.touched[inputType] && formik.errors[inputType] ? (
              <div>{formik.errors[inputType]}</div>
            ) : null}
            <div onClick={handleSubmit} className="inputImage">
              <img src={Icons.send} alt="send" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatFeed;
