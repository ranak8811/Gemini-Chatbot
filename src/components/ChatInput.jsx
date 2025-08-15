/* eslint-disable react/prop-types */
// src/components/ChatInput.jsx
import { useState } from "react";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input bg-transparent p-2.5 rounded-lg border border-gray-700 flex items-center justify-between w-[calc(100%-2rem)] max-w-2xl mx-auto mb-5">
      <div className="flex-1 flex gap-1.5 items-center pl-2.5">
        <span className="text-white cursor-pointer text-xl">🎙️</span>
        <input
          type="text"
          id="chatInput"
          placeholder="Message ChatbotAI..."
          className="p-2.5 outline-none border-none flex-1 bg-transparent text-white text-base resize-none overflow-hidden"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
      </div>
      <button
        id="sendBtn"
        onClick={handleSend}
        disabled={isLoading || !inputValue.trim()}
        className="w-10 h-10 bg-blue-600  flex items-center justify-center rounded-lg cursor-pointer hover:bg-blue-500 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        <span className="text-white text-xl">➤</span>
      </button>
    </div>
  );
};

export default ChatInput;
