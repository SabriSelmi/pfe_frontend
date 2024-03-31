import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./conversations.css";
import MessageServices from "../services/MessageServices";

const Conversations = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  // Sample data for conversations

  const [conversations, setConversation] = useState([]);

  useEffect(() => {
    (async () => {
      const messagesData = await MessageServices.GetAll(userId);
      const conversations = getConversation(messagesData.data, userId);
      setConversation(Object.values(conversations));
    })();
  }, []);

  const getConversation = (messages, userId) => {
    // Filter messages where the sender or reciever is the specified userId

    // Group messages by conversation partner (sender or reciever)
    const groupedConversation = {};
    messages.forEach((msg) => {
      const partnerData = msg.sender._id === userId ? msg.reciever : msg.sender;
      if (!groupedConversation[partnerData._id]) {
        groupedConversation[partnerData._id] = {
          partner: partnerData.username,
          id: partnerData._id,
          messages: [partnerData],
        };
      } else {
        groupedConversation[partnerData._id].messages.push(partnerData);
      }
    });

    return groupedConversation;
  };

  return (
    <div className="conversations-container">
      <h1 className="conversations-heading">Conversations</h1>
      <div className="conversation-list">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            to={`/Home/chat/${conversation.id}`}
            className="conversation-item"
          >
            {conversation.partner}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
