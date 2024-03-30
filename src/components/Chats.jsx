import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import { api } from '../config';

const socket = io(api);

const Chats = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleMessage = (message) => {
      // Vérifiez si le message est déjà présent dans la liste des messages
      const isMessageUnique = messages.every(msg => msg.text !== message.text || msg.senderId !== message.senderId);
      if (isMessageUnique) {
        // Ajoutez le nouveau message à la liste des messages uniquement s'il est unique
        setMessages(prevMessages => [...prevMessages, message]);
        scrollToBottom();
      }
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('message', { senderId: userId, text: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="chat-container">
            <div className="chat">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}>
                  <div className="message-content">{msg.text}</div>
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
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
