import React, { useState } from "react";

import "../shared/styles/style.css";
import Messages from "../components/Messages";
// import api from "../services/api";
import { DefaultMessages } from "../shared";
import Icons from "../shared/assets";
import { Formik } from "formik";
import * as Yup from "yup";

const ChatFeed = () => {
  const [responses, setResponses] = useState([
    { text: DefaultMessages.first, isBot: true },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [timeMessage, setTimeMessage] = useState(0);
  const [inputType, setInputType] = useState("text");

  const SignupSchema = Yup.object().shape({
    text: Yup.string()
      .min(3, "Muito curto!")
      .max(45, "Máxio 45 caracteres")
      .required("Campo requerido"),
    date: Yup.date().required(),
    email: Yup.string().email("Email inválido").required("Campo requerido"),
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

  const handleSubmitMessage = (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    };

    if (event.key === "Enter" || event.type === "click") {
      setResponses((responses) => [...responses, message]);
      handleMessageSubmit(message.text);
    }
  };

  return (
    <Formik
      initialValues={{
        text: "",
        email: "",
        date: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
      validateOnBlur={false}
    >
      {({ errors, resetForm, values, handleChange }) => {
        return (
          <div className="chatSection">
            <div className="botContainer">
              <div className="messagesContainer">
                <Messages messages={responses} />
              </div>
              <div className="inputSection">
                <input
                  type={inputType}
                  name={inputType}
                  value={values[inputType]}
                  onChange={(e) => {
                    handleChange(e);
                    setCurrentMessage(e.target.value);
                  }}
                  onKeyDown={handleSubmitMessage}
                  placeholder="Digite Algo..."
                  className="messageInputField"
                />
                {errors[inputType] && <div>{errors[inputType]}</div>}
                <button onClick={handleSubmitMessage} type="reset" className="inputButton">
                  <div onClick={resetForm} className="inputImage">
                    <img src={Icons.send} alt="send" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ChatFeed;
