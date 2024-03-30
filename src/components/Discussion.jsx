// Discussion.jsx

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import { api } from '../config';

const socket = io(api);

const Discussion = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, []);

  const handleMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const token = user.tokens.accessToken;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        await axios.post(`http://localhost:3001/chat/${user.id}/newMessage`, { text: newMessage }, { headers });
        setNewMessage('');
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="chat-container">
            <div className="chat">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}>
                  <div className="message-content">
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
