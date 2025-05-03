import React, { useState } from 'react';
import { users } from '../data/users';
import '../styles/styles.css';
import '../styles/messages-page.css';

const currentUser = users.find(u => u.username === 'liar_01');
const otherUsers = users.filter(user => user.username !== 'liar_01');

const initialMessages = {
  2: [
    { id: 1, text: 'Hey liar_01!', sender: 'user_02' },
    { id: 2, text: 'How are you?', sender: 'user_02' },
  ],
  3: [
    { id: 1, text: 'Hi liar_01!', sender: 'user_03' },
    { id: 2, text: 'What have you been up to?', sender: 'user_03' },
  ],
  1: [],
};

const MessagesPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleUserClick = (userId) => setSelectedUserId(userId);

  const sendMessage = () => {
    if (!input.trim() || !selectedUserId) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: currentUser.username,
    };

    setMessages(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMessage],
    }));

    // message response
    setTimeout(() => {
      const responseUser = users.find(u => u.id === selectedUserId);
      const responseMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm busy right now.",
        sender: responseUser.username,
      };

      setMessages(prev => ({
        ...prev,
        [selectedUserId]: [...prev[selectedUserId], responseMessage],
      }));
    }, 1000);

    setInput('');
  };

  const selectedUser = users.find(u => u.id === selectedUserId);

  return (
    <div className="messages-page">
      <div className="conversations-list">
        {otherUsers.map(user => (
          <div
            key={user.id}
            className={`conversation-item ${selectedUserId === user.id ? 'active' : ''}`}
            onClick={() => handleUserClick(user.id)}
          >
            <img src={user.avatar} alt={user.username} className="user-avatar" />
            <div className="user-info">
              <h4 className="user-name">{user.name}</h4>
              <p className="user-username">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-container">
        {selectedUserId ? (
          <>
            <div className="chat-header">
              <img src={selectedUser.avatar} alt={selectedUser.username} className="chat-avatar" />
              <div>
                <h3>{selectedUser.name}</h3>
                <p>@{selectedUser.username}</p>
              </div>
            </div>
            
            <div className="messages-container">
              {(messages[selectedUserId] || []).map(msg => (
                <div key={msg.id} className={`message ${msg.sender === currentUser.username ? 'sent' : 'received'}`}>
                  {msg.sender !== currentUser.username && (
                    <img src={selectedUser.avatar} alt={msg.sender} className="message-avatar" />
                  )}
                  <div className="message-content">
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="message-input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage} className="send-button">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <h2>Select a conversation</h2>
            <p>Choose a user from the list to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;