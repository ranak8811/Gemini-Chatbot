/* eslint-disable react/prop-types */
// src/components/Sidebar.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap"; // Import GSAP

const Sidebar = ({ isSmallScreen, isOpen, onClose, onToggle }) => {
  const sidebarRef = useRef(null);
  const sidebarTitleRef = useRef(null);
  const sidebarContentRef = useRef(null);

  useEffect(() => {
    // GSAP animations for sidebar width and content opacity
    if (sidebarRef.current) {
      if (isOpen) {
        gsap.to(sidebarRef.current, {
          width: "20%",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(sidebarTitleRef.current, {
          opacity: 1,
          duration: 0.3,
          delay: 0.05,
          onStart: () => sidebarTitleRef.current.classList.remove("hidden"),
        });
        gsap.to(sidebarContentRef.current, {
          opacity: 1,
          duration: 0.3,
          delay: 0.05,
          onStart: () => sidebarContentRef.current.classList.remove("hidden"),
        });
      } else {
        gsap.to(sidebarRef.current, {
          width: "80px",
          duration: 0.3,
          ease: "power2.out",
        }); // 80px = w-20
        gsap.to(sidebarTitleRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => sidebarTitleRef.current.classList.add("hidden"),
        });
        gsap.to(sidebarContentRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => sidebarContentRef.current.classList.add("hidden"),
        });
      }
    }
  }, [isOpen]);

  // Placeholder for chat history items (can be dynamic later)
  const historyItems = [
    {
      date: "Today",
      items: ["Digital Art Concepts...", "Character Design Prompts..."],
    },
    {
      date: "Yesterday",
      items: ["Logo Brainstorm...", "Color Palette Suggestions..."],
    },
  ];

  return (
    <>
      {/* Small-Screen-Sidebar (Overlay) */}
      <div
        id="smallScreenSidebar"
        className={`absolute inset-0 p-2.5 z-[99] bg-zinc-900/90 backdrop-blur-md transition-all duration-300 ease-in-out ${
          isSmallScreen && isOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
              {/* LOGO */}
              {/* Placeholder_URL */}
              {/* <img
                src="https://placehold.co/48x48/zinc-900/white?text=BOT"
                alt="chatbot_logo"
                className="w-12"
              /> */}
              <img src="/images/Bot.svg" alt="chatbot_logo" className="w-12" />
            </div>
            <p className="text-lg">
              Chatbot<strong>AI</strong>
            </p>
          </div>
          <p className="font-bold text-lg cursor-pointer" onClick={onClose}>
            <img
              src="/images/close_icon.svg"
              alt="close_icon"
              className="w-10"
            />
          </p>
        </div>

        {historyItems.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="mt-10 flex flex-col items-start cursor-pointer"
          >
            <p className="text-gray-400 mb-2.5">{group.date}</p>
            {group.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`w-full h-10 flex items-center p-2.5 mb-2.5 rounded-lg ${
                  groupIndex === 0 && itemIndex === 0
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600 bg-white bg-opacity-10 backdrop-blur-md text-zinc-800"
                }`}
              >
                <p className=" text-sm">{item}</p>
              </div>
            ))}
          </div>
        ))}

        <div className="absolute bottom-5 text-sm text-gray-400 w-full px-2.5">
          <p className="text-center md:text-left">
            @<strong>Chatbot</strong>AI | 2025
          </p>
        </div>
      </div>

      {/* Main Sidebar (Desktop) */}
      <div
        id="mainSidebar"
        ref={sidebarRef}
        className={`sidebar  h-full p-2.5 glass2 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSmallScreen ? "hidden" : "block"
        }`}
        style={{ width: isOpen ? "20%" : "80px" }} // Initial width set by style prop
      >
        <div className="flex items-center gap-2.5 h-[50px]">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={onToggle}
          >
            {/* PlaceHolder */}
            {/* <img
              src="https://placehold.co/48x48/zinc-900/white?text=BOT"
              alt="logo"
              className="w-12"
            /> */}

            <img src="/images/Bot.svg" alt="logo" className="w-12" />
          </div>
          <p
            ref={sidebarTitleRef}
            className={`text-lg text-white whitespace-nowrap overflow-hidden transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Chatbot<strong>AI</strong>
          </p>
        </div>
        <div
          ref={sidebarContentRef}
          className={`overflow-hidden transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          {historyItems.map((group, groupIndex) => (
            <>
              <div
                key={groupIndex}
                className="mt-10 flex flex-col items-start cursor-pointer"
              >
                <p className="text-gray-400 mb-2.5">
                  {isOpen ? group.date : ""}
                </p>
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`w-full h-10 flex items-center p-2.5 mb-2.5 rounded-lg ${
                      groupIndex === 0 && itemIndex === 0
                        ? "bg-gradient-to-r from-blue-400 to-purple-500 "
                        : "hover:bg-gradient-to-r from-blue-400 to-purple-500  hover:text-white transition bg-white bg-opacity-10 backdrop-blur-md text-zinc-800"
                    }`}
                  >
                    <p className=" text-sm whitespace-nowrap overflow-hidden">
                      {isOpen ? item : ""}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ))}

          <div className="space-y-16">
            <div className="test mt-[115%] flex items-center w-full gap-4">
              <img
                src="/images/settings.svg"
                alt="settings_icon"
                className="settings-icon w-10"
              />
              <p className={isOpen ? `md:block` : `hidden`}>Settings</p>
            </div>
            <div className="absolute bottom-5 text-sm text-gray-400 w-full px-2.5 text-center md:text-left whitespace-nowrap overflow-hidden">
              <p>{isOpen ? `@ChatbotAI | 2025` : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
