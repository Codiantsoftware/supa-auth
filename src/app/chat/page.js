"use client"

import React, { useState } from 'react';
import { marked } from 'marked';

function Page() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };

    setMessages([...messages, newMessage]);
    
    try {
      const response = await fetch('/api/ai/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issue: inputMessage }),
      });

      const data = await response.json();
      
      const aiResponse = {
        id: messages.length + 2,
        text: data.suggestion || 'Sorry, I could not process your request.',
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse = {
        id: messages.length + 2,
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorResponse]);
    }

    setInputMessage('');
  };

  const formatMessage = (text) => {
    try {
      // Parse markdown and convert to HTML
      const formattedText = marked(text);
      return (
        <div 
          dangerouslySetInnerHTML={{ 
            __html: formattedText 
          }} 
          className="markdown-content"
        />
      );
    } catch (error) {
      return text; // Fallback to plain text if parsing fails
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            {msg.sender === 'ai' ? formatMessage(msg.text) : msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input 
          type="text" 
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="chat-input"
          placeholder="Type your message..."
        />
        <button 
          onClick={handleSendMessage} 
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Page;