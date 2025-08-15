/* eslint-disable no-useless-escape */
export const convertMarkdownToHtml = (markdownText) => {
  let html = markdownText;

  // Handle code blocks (multi-line)
  html = html.replace(/```(.*?)```/gs, (match, content) => {
    return `<pre><code>${content.trim()}</code></pre>`;
  });

  // Handle inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Handle bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

  // Handle italics
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Handle headings (H1, H2, H3)
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  // Handle lists (unordered)
  html = html.replace(/^\s*[\-\*] (.*)/gm, "<li>$1</li>");
  html = html.replace(/(<ul>)?(<li>.*<\/li>)+(<\/ul>)?/gs, "<ul>$2</ul>");
  // Handle lists (ordered)
  html = html.replace(/^\s*\d+\. (.*)/gm, "<li>$1</li>");
  html = html.replace(/(<ol>)?(<li>.*<\/li>)+(<\/ol>)?/gs, "<ol>$2</ol>");

  // Ensure paragraphs and newlines are handled
  html = html
    .split("\n")
    .map((line) => {
      if (line.trim() === "" || line.match(/<h[1-3]>|<pre>|<ul>|<ol>|<li>/)) {
        return line;
      }
      return `<p>${line}</p>`;
    })
    .join("");

  // Clean up multiple <p></p> or empty <p>
  html = html.replace(/<p><\/p>/g, "");
  html = html.replace(/<\/p><p>/g, "");
  html = html.replace(/<\/li><p>/g, "</li>");

  return html;
};

export const getImageUrl = (imageName) => {
  return new URL(`/images/${imageName}`, import.meta.url).href;
};

export const copyToClipboard = async (text, callback) => {
  try {
    await navigator.clipboard.writeText(text);
    callback(); // Call the component's state update (e.g., setCopied(true))
  } catch (err) {
    console.error("Failed to copy text: ", err);
    // You could also dispatch a global toast/notification here
  }
};
