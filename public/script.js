const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const stopButton = document.getElementById("stop-button");

let eventSource = null;
let receiving = false;

function appendMessage(text, isUser) {
  const messageElement = document.createElement("div");
  messageElement.className = isUser ? "message user" : "message bot";
  messageElement.textContent = text;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage(`You: ${message}`, true);
  messageInput.value = "";

  sendButton.style.display = "none";
  stopButton.style.display = "inline";
  receiving = true;

  appendMessage("Bot: Loading...", false);

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from DeepSeek R1.");
    }

    const reader = response.body.getReader();
    let responseText = "";

    while (receiving) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const parsedChunk = JSON.parse(chunk.replace("data: ", "").trim());
      responseText += parsedChunk.text;
      chatBox.lastChild.textContent = `Bot: ${responseText}`;
    }
  } catch (error) {
    appendMessage("Error: Failed to fetch response.", false);
  } finally {
    receiving = false;
    sendButton.style.display = "inline";
    stopButton.style.display = "none";
  }
}

function stopMessage() {
  receiving = false;
  sendButton.style.display = "inline";
  stopButton.style.display = "none";
}

sendButton.addEventListener("click", sendMessage);
stopButton.addEventListener("click", stopMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});