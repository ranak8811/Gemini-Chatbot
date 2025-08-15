# Gemini Chatbot

This is a beginner-friendly React-based chatbot application designed to provide an interactive conversational experience. It leverages modern web technologies to deliver a smooth and responsive user interface.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## About the Project

This project is a simple yet effective chatbot application built with React. It demonstrates how to create a dynamic user interface for conversational agents, including input fields, message displays, and basic navigation. The goal is to provide a clear and understandable codebase for beginners interested in React and front-end development.

## Live link:

- Click here to see live demo: [Gemini Chatbot](https://gemini-chatbot-741475.netlify.app/)

## Features

- Interactive chat interface
- Responsive design
- Easy to understand code structure
- Integration with modern styling and animation libraries

## Technologies Used

This project is built using the following key technologies and libraries:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides a lightning-fast development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **GSAP (GreenSock Animation Platform)**: A powerful JavaScript animation library for creating high-performance animations.
- **Locomotive Scroll**: A library for smooth scrolling effects.
- **React Icons**: A collection of popular icon packs as React components.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

## Project Structure

The project is organized into the following main directories and files:

- `public/`: Contains static assets.
  - `public/vite.svg`: Vite logo.
  - `public/fonts/`: Custom font files.
    - `public/fonts/NEVERMINDHAND-REGULAR.TTF`: Custom font.
  - `public/images/`: Image assets.
    - `public/images/bot.png`: Bot avatar image.
    - `public/images/Bot.svg`: Bot SVG icon.
    - `public/images/chatbot.png`: Screenshot of the chatbot interface.
    - `public/images/close_icon.svg`: Close icon.
    - `public/images/icon1.png` to `icon7.png`: Various icons.
    - `public/images/menu_white.svg`: White menu icon.
    - `public/images/menu.svg`: Menu icon.
    - `public/images/moon.svg`: Moon icon (for dark mode).
    - `public/images/response.png`: Screenshot of a response example.
    - `public/images/settings.svg`: Settings icon.
    - `public/images/sun.svg`: Sun icon (for light mode).
    - `public/images/user.svg`: User avatar image.
- `src/`: Contains the core source code for the React application.
  - `src/App.jsx`: The main application component, orchestrating the chatbot's functionality.
  - `src/index.css`: Global CSS styles for the application.
  - `src/main.jsx`: The entry point of the React application, responsible for rendering the `App` component.
  - `src/components/`: Reusable React components.
    - `src/components/ChatInput.jsx`: Component for handling user input and sending messages.
    - `src/components/ChatMessage.jsx`: Component for displaying individual chat messages.
    - `src/components/NavBar.jsx`: Navigation bar component.
    - `src/components/notes2.md`: (Potentially temporary) notes file.
    - `src/components/Sidebar.jsx`: Sidebar component for additional navigation or features.
    - `src/components/WelcomeScreen.jsx`: Component for the initial welcome display to the user.
  - `src/helpers/`: Contains helper functions or utilities.
    - `src/helpers/typingEffect.jsx`: Logic for simulating typing animation effects for bot responses.
  - `src/screenshots/`: Directory for screenshots (though images are in `public/images`).
    - `src/screenshots/Bot.svg`: Duplicate bot SVG icon.
  - `src/utils/`: Contains general utility functions.
    - `src/utils/utils.js`: Various utility functions used across the application.
- `.gitignore`: Specifies intentionally untracked files and directories to be ignored by Git.
- `eslint.config.js`: ESLint configuration file for code linting.
- `index.html`: The main HTML file that serves as the entry point for the web application.
- `LICENSE`: The project's license file.
- `package-lock.json`: Records the exact versions of dependencies used in the project.
- `package.json`: Defines project metadata, scripts, and lists all dependencies and devDependencies.
- `README.md`: This file, providing a comprehensive overview of the project.
- `vite.config.js`: Vite configuration file for development and build processes.
- `.env`: Environment variables for configuration (e.g., API keys).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have Node.js and npm (Node Package Manager) installed on your system.

- **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) (npm is included with Node.js installation)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ranak8811/Gemini-Chatbot.git
   cd Gemini-Chatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

This project uses environment variables for sensitive information or configuration. You need to create a `.env` file in the root directory of the project.

1. **Create `.env` file:**
   Create a file named `.env` in the root of your project directory.

2. **Add your variables:**
   Add the necessary environment variables to this file. The application expects the `VITE_GEMINI_API_KEY` variable.

   ```
   VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
   ```

   Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key.

### Running the Application

To run the application in development mode:

```bash
npm run dev
```

This command will start the Vite development server, and you can access the application in your web browser, usually at `http://localhost:5173/`.

To build the application for production:

```bash
npm run build
```

This command will compile the project into static files in the `dist` directory, which can then be deployed to a web server.

## Screenshots

Here are some screenshots of the Gemini Chatbot in action:

### Chatbot Interface

![Chatbot Interface](public/images/chatbot.png)

### Response Example

![Response Example](public/images/response.png)

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
