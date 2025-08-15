/* eslint-disable react/prop-types */
// src/components/NavBar.jsx

const NavBar = ({ onOpenSidebar }) => {
  return (
    <div className="TOPBAR h-[70px] p-2.5 flex items-center justify-between border-b border-blue-400 md:hidden">
      <div className="flex items-center gap-2.5">
        {/* LOGO */}
        {/* Placeholder */}
        {/* <img
          src="https://placehold.co/48x48/zinc-900/white?text=BOT"
          alt="chatbot_logo"
          className="w-12"
        /> */}
        <img src="/images/Bot.svg" alt="chatbot_logo" className="w-12" />
        <p className="text-lg text-white">
          Chatbot<strong>AI</strong>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
          F
        </div>
        <div
          className="w-[34px] h-[34px] flex items-center justify-center cursor-pointer"
          onClick={onOpenSidebar}
        >
          {/* Placeholder */}
          {/* <img
            src="https://placehold.co/40x40/zinc-900/white?text=MENU"
            alt="menu"
            className="w-10 cursor-pointer"
          /> */}
          <img
            src="/images/menu_white.svg"
            alt="menu"
            className="w-14 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
