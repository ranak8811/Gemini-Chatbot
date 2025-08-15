// src/helpers/typingEffect.jsx
// Note: GSAP is not directly used for the individual character typing here,
// but if you had more complex animations for message entry, it would be included.
// For this simple typing effect, plain JS setTimeout is efficient.

import { convertMarkdownToHtml } from "../utils/utils"; // Import markdown converter

export const animateTyping = async (messageContentElement, text) => {
  messageContentElement.innerHTML = `<strong class="text-base">ChatbotAI</strong><div class="mt-1 text-sm sm:text-base"></div>`;
  const textContainer = messageContentElement.querySelector("div");
  const cursor = document.createElement("span");
  cursor.classList.add("blinking-cursor");
  textContainer.appendChild(cursor);

  const characters = text.split("");
  for (let i = 0; i < characters.length; i++) {
    textContainer.textContent += characters[i];
    textContainer.appendChild(cursor);

    // Small pauses for more natural typing feel
    if ([".", "!", "?", "\n"].includes(characters[i])) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    } else if (i % 50 === 0 && i !== 0) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  cursor.remove();
  textContainer.innerHTML = convertMarkdownToHtml(text); // Apply markdown conversion after typing
};
