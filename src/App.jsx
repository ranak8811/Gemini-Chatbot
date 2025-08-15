// src/App.jsx
import { useState, useEffect, useRef } from "react";

import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

import { copyToClipboard } from "./utils/utils"; // Import from utils
import { animateTyping } from "./helpers/typingEffect"; // Import the new typing helper

const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      parts: [
        {
          text: "Hey there, I'm ChatbotAI. What creative ideas are you brewing today?",
        },
      ],
    },
  ]);
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open for desktop
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Check initial screen size

  const chatAreaWrapperRef = useRef(null); // Ref for the scrollable chat area

  // Effect to scroll to bottom of chat messages
  useEffect(() => {
    if (chatAreaWrapperRef.current) {
      chatAreaWrapperRef.current.scrollTop =
        chatAreaWrapperRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]); // Dependency on chatHistory and isLoading to re-scroll

  // Handle window resize for sidebar responsiveness
  useEffect(() => {
    const handleResize = () => {
      const newIsSmallScreen = window.innerWidth < 768;
      setIsSmallScreen(newIsSmallScreen);
      if (!newIsSmallScreen) {
        setIsSidebarOpen(true); // Always open sidebar on desktop
      } else {
        setIsSidebarOpen(false); // Always close sidebar on mobile by default
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✨ AI INTERGRATION PART
  // ⚙️ Function to handle sending messages
  // This function sends the user's message to the AI model and updates the chat history
  // It also handles the loading state and displays a temporary loading message while waiting for the AI response.
  // It uses the Google Generative AI API to get the AI's response based on the user's input and the chat history.
  // The AI's response is then displayed in the chat window with a typing effect.
  // If an error occurs during the API call, it updates the chat history with an error message.
  // The function also manages the initial chat state and ensures the chat history is updated correctly.
  // This function is called when the user sends a message from the ChatInput component.
  // It also handles the initial welcome message and the chat history display.
  const handleSendMessage = async (userMessage) => {
    if (!userMessage) return;

    if (!hasChatStarted) {
      setHasChatStarted(true);
    }

    // Add user message to history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", parts: [{ text: userMessage }] },
    ]);
    setIsLoading(true);

    // Add a temporary loading message for the model
    const loadingMessage = {
      role: "ai",
      parts: [
        { text: '<span class="loading-spinner mr-2"></span> Thinking...' },
      ],
      isTemporary: true, // Custom flag to identify loading message
    };
    setChatHistory((prevHistory) => [...prevHistory, loadingMessage]);

    try {
      const payload = {
        contents: [
          ...chatHistory,
          { role: "user", parts: [{ text: userMessage }] },
        ],
      };

      // 🗝️ KEY CONFIGURATION 🔐
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${response.status} - ${
            errorData.error.message || "Unknown error"
          }`
        );
      }

      const result = await response.json();

      let aiResponseText =
        "Oops! My creative circuits are a bit jammed. Can you try rephrasing?";
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        aiResponseText = result.candidates[0].content.parts[0].text;
      }

      setChatHistory((prevHistory) => {
        const newHistory = prevHistory.filter((msg) => !msg.isTemporary); // Remove loading message
        return [
          ...newHistory,
          { role: "model", parts: [{ text: aiResponseText }] },
        ];
      });

      // To apply typing effect, we need to get the DOM element *after* React has rendered it.
      // A small timeout ensures the DOM is updated.
      setTimeout(() => {
        if (chatAreaWrapperRef.current) {
          const lastAiMessageDiv = chatAreaWrapperRef.current.lastChild;
          if (
            lastAiMessageDiv &&
            lastAiMessageDiv.classList.contains("chat-message") &&
            lastAiMessageDiv.classList.contains("ai")
          ) {
            const contentDiv =
              lastAiMessageDiv.querySelector(".message-content");
            if (contentDiv) {
              // Use the imported animateTyping function
              animateTyping(contentDiv, aiResponseText);
            }
          }
        }
      }, 0);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prevHistory) => {
        const newHistory = prevHistory.filter((msg) => !msg.isTemporary); // Remove loading message
        return [
          ...newHistory,
          { role: "model", parts: [{ text: `Error: ${error.message}` }] },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (question) => {
    handleSendMessage(question);
  };

  return (
    <div className="bg-[#1a1a1a] text-gray-50 font-[nevermind_hand] leading-relaxed min-h-screen flex items-center justify-center">
      <section className="home flex items-center justify-center w-full h-full relative">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

        <div className="h-screen w-full rounded-md overflow-hidden flex items-center z-10 sm:rounded-none">
          {/* Sidebar */}
          <Sidebar
            isSmallScreen={isSmallScreen}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <div className="flex-1 w-full h-full bg-black/10 flex flex-col relative">
            {/* NavBar for small screens */}
            {isSmallScreen && (
              <NavBar onOpenSidebar={() => setIsSidebarOpen(true)} />
            )}

            {/* MESSAGES WINDOW */}
            <div
              ref={chatAreaWrapperRef}
              className="message-window-wrapper flex-1 overflow-y-auto pt-[50px] pb-[40px] px-4 md:mt-10 relative"
            >
              {!hasChatStarted && (
                <WelcomeScreen onCardClick={handleCardClick} />
              )}

              {hasChatStarted && (
                <div
                  id="chatMessages"
                  className="flex flex-col items-center w-full h-full md:px-8 lg:px-50"
                >
                  {chatHistory.map((message, index) =>
                    // Render loading message directly if it's temporary
                    message.isTemporary ? (
                      <div
                        key={index}
                        className="chat-message ai loading-message"
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 self-start bg-[url(https://placehold.co/48x48/emerald-700/white?text=BOT)] bg-cover bg-center"></div>
                        <div className="flex-1 message-content bg-purple-600 border-2 animate-border text-white rounded-lg rounded-bl-sm p-3">
                          <strong className="text-base">ChatbotAI</strong>
                          <p className="mt-1 text-sm sm:text-base flex items-center">
                            <span className="loading-spinner mr-2"></span>{" "}
                            Thinking...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <ChatMessage
                        key={index}
                        message={message}
                        onCopy={copyToClipboard}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
