/* eslint-disable react/prop-types */
// / src/components/ChatMessage.jsx

import { useState } from "react";
import { convertMarkdownToHtml } from "../utils/utils"; // Import the helper

const ChatMessage = ({ message, onCopy }) => {
  const isUser = message.role === "user";
  const rawText = message.parts[0].text;
  const displayContent = isUser ? rawText : convertMarkdownToHtml(rawText);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(rawText, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`chat-message flex gap-4 mb-10 items-start w-full max-w-4xl relative ${
        isUser
          ? "user flex-row-reverse pl-8 pr-0 self-end"
          : "ai pr-8 self-start"
      }`}
    >
      {/* PLACE CHAT WINDOW CUSTOM ICONS HERE */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 self-start bg-cover bg-center ${
          isUser ? "bg-[url(/images/user.svg)]" : "bg-[url(/images/Bot.svg)]"
        }`}
      ></div>
      <div
        className={`message-content flex-1 max-w-[450px] ${
          isUser
            ? "bg-gradient-to-br from-blue-600  to-blue-800 text-white rounded-lg rounded-bl-sm"
            : "bg-gradient-to-br from-purple-700 to-purple-900 text-white rounded-lg rounded-bl-sm"
        }`}
      >
        <strong className="text-base">{isUser ? "You" : "ChatbotAI"}</strong>
        {/* Using dangerouslySetInnerHTML for Markdown converted HTML */}
        <div
          className="mt-1 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        ></div>
        <button
          onClick={handleCopy}
          className={`copy-button absolute -bottom-8 md:bottom-0  md:right-2 lg:right-30 bg-white bg-opacity-10 text-gray-50 px-2 py-1 rounded-md text-xs cursor-pointer opacity-0 transition-opacity duration-200 hover:bg-opacity-20 ${
            copied ? "copied bg-blue-600 opacity-100" : ""
          } ${isUser ? "right-auto left-2" : ""}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ChatMessage;
