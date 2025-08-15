/* eslint-disable react/prop-types */
// src/components/WelcomeScreen.jsx

const WelcomeScreen = ({ onCardClick }) => {
  const cardData = [
    {
      _id: "001",
      question:
        "How can I practice my painting skills in Photoshop using basic forms and shapes?",
      icon: "/images/icon2.png", // Placeholder for icon/image
    },
    {
      _id: "002",
      question: "Suggest some beginner-friendly Blender 3D modeling projects.",
      icon: "/images/icon3.png", // Placeholder for icon/image
    },
    {
      _id: "003",
      question: "What are some fundamental principles of good graphic design?",
      icon: "/images/icon7.png", // Placeholder for icon/image
    },
    {
      _id: "004",
      question: "Generate a concept for a futuristic cityscape art piece.",
      icon: "/images/icon6.png", // Placeholder for icon/image
    },
  ];

  return (
    <div
      id="initialWelcomeScreen"
      className="absolute inset-0 flex flex-col items-center p-4 bg-black/10 z-10 transition-opacity duration-500 opacity-100 overflow-y-auto"
    >
      <div className="w-full max-w-6xl pt-8 md:pt-14 lg:pt-20 px-4 lg:px-4">
        <div className="top text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white">
            <span className="grad1">Hi there,</span> <br />
            What creative ideas are you brewing?
          </h1>
          <p className="text-gray-300 md:text-lg md:mt-4 lg:leading-6">
            I&#39;m ChatbotAI, your creative assistant. I can help you with:
            <br className="hidden md:block" />
            Ideation, style exploration, concept development, and more!
          </p>
        </div>

        <div
          id="cardGrid"
          className="middle mt-4 px-4 lg:px-0 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:mt-10"
        >
          {cardData.map((card) => (
            <div
              key={card._id}
              className="card-item p-4 aspect-square flex flex-col justify-between rounded-lg cursor-pointer transition-all duration-200 bg-white bg-opacity-5 hover:bg-opacity-10 hover:translate-y-[-2px] ease-out"
              onClick={() => onCardClick(card.question)}
            >
              <h3 className="text-white font-semibold text-2xl leading-7 lg:text-xl lg:leading-6">
                {card.question}
              </h3>
              <div className="w-16 h-16 bg-zinc-40 flex items-center justify-center rounded-md">
                <img src={card.icon} alt="3d_icon" className="" />
              </div>{" "}
              {/* Placeholder for icon/image */}
            </div>
          ))}
        </div>

        <div className="bottom py-10 md:px-12 lg:mt-8 lg:px-20">
          <p className="text-sm text-zinc-500/80 mt-2 md:mt-4 md:text-base text-center">
            ChatbotAI can generate creative content. Always review for accuracy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
