import React, { useState, useEffect } from "react";
import Message from "./Message";
import "../../index.scss";

const Messages = ({ messages, name, userId, roomId, roomHost }) => {
  const [messageList, setMessageList] = useState(messages);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  return (
    <div className="messages">
      {messageList.map((message, i) => (
        <div key={i}>
          <Message
            message={message}
            name={name}
            userId={userId}
            roomId={roomId}
            roomHost={roomHost}
          />
        </div>
      ))}
    </div>
  );
};

export default Messages;
