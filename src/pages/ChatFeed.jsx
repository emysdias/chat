import React, { useState } from "react";

import "../shared/styles/style.css";
import { Messages } from "../components";
import { DefaultMessages } from "../shared";
import Icons from "../shared/assets";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

const ChatFeed = (test) => {
  const [responses, setResponses] = useState([
    { text: DefaultMessages.first, isBot: true },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [timeMessage, setTimeMessage] = useState(0);
  const [inputType, setInputType] = useState("text");
  const [showInput, setShowInput] = useState(false);

  const SignupSchema = Yup.object().shape({
    text: Yup.string()
      .min(3, "Muito curto!")
      .max(45, "Máximo 45 caracteres")
      .required("Campo requerido"),
    date: Yup.date()
      .max(new Date(), "Data inválida")
      .required("Escolha a data"),
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
        rating: true,
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

    setTimeMessage((timeMessage) => timeMessage + 1);
    if (timeMessage === 3) {
      setShowInput(true);
    }
  };

  const handleSubmitMessage = (event, { resetForm, errors }) => {
    const message = {
      text: currentMessage,
      isBot: false,
    };

    if (
      (event.key === "Enter" || event.type === "click") &&
      currentMessage.length > 2 &&
      currentMessage.length < 46
    ) {
      if (
        errors.email !== "Email inválido" &&
        errors.date !== "Data inválida"
      ) {
        setResponses((responses) => [...responses, message]);
        handleMessageSubmit(message.text);
        setCurrentMessage("");
        resetForm();
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      text: "",
      email: "",
      date: "",
    },
  });

  return (
    <Formik
      initialValues={formik.initialValues}
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
              {showInput ? null : (
                <div className="inputSection">
                  <input
                    type={inputType}
                    name={inputType}
                    value={values[inputType]}
                    onChange={(e) => {
                      handleChange(e);
                      setCurrentMessage(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      handleSubmitMessage(e, { resetForm, errors });
                    }}
                    placeholder="Digite Algo..."
                    className="messageInputField"
                  />
                  {errors[inputType] && errors[inputType] ? (
                    <div>{errors[inputType]}</div>
                  ) : (
                    <button
                      onClick={(e) => {
                        handleSubmitMessage(e, { resetForm, errors });
                      }}
                      type="reset"
                      className="inputButton"
                    >
                      <div className="inputImage">
                        <img src={Icons.send} alt="send" />
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ChatFeed;
