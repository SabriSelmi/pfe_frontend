import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import { api, socketApi } from '../config';

const socket = io(socketApi);

const Chat = () => {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Récupérer l'ID du client WebSocket lors de la connexion
    socket.on('connect', () => {
      setUserId(socket.id);
    });

    const handleMessage = (message) => {
      // Vérifier si le message existe déjà dans la liste
      const isMessageUnique = !messages.find(msg => msg.text === message.text && msg.senderId === message.senderId);
      if (isMessageUnique) {
        setMessages(prevMessages => [...prevMessages, message]);
        scrollToBottom();
      }
    };

    socket.on('message', handleMessage);

    // Nettoyer l'écouteur d'événements lors du démontage du composant
    return () => {
      socket.off('message', handleMessage);
    };
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
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
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
