import React, { useState } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const predefinedAnswers = {
    "hi": "Hello! How can I assist you today?",
    "how to order": "To place an order, just add items to your cart and checkout.",
    "where is my order": "Check your order status in your profile.",
    "bye": "Goodbye! Have a great day!",
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    const botResponse = predefinedAnswers[userInput.toLowerCase()] || 
      "I'm not sure how to answer that. Try something else.";

    setMessages((prev) => [...prev, userMessage, { sender: "bot", text: botResponse }]);
    setUserInput("");
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen ? (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>The Helper</span>
            <button onClick={() => setIsOpen(false)}>&#10005;</button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle-btn" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBot;
