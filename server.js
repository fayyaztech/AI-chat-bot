const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-r1:1.5b",
      prompt: `Instructions: Please provide direct, concise answers without any thinking process or meta-commentary. Format math with LaTeX notation using \\( \\) for inline and \\[ \\] for display math. Use markdown for formatting.\n\n${message}`,
      stream: true
    }, {
      responseType: "stream"
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Handle client disconnect
    req.on('close', () => {
      if (response.data) {
        response.data.destroy();
      }
    });

    let accumulatedText = '';

    response.data.on("data", (chunk) => {
      try {
        const parsedChunk = JSON.parse(chunk.toString().trim());
        accumulatedText += parsedChunk.response;

        // Check if we have a complete sentence (ends with ., !, or ?)
        if (/[.!?](\s|$)/.test(parsedChunk.response)) {
          res.write(`data: ${JSON.stringify({ text: accumulatedText.trim() })}\n\n`);
          accumulatedText = '';
        }
      } catch (error) {
        console.error("Error parsing response:", error);
      }
    });

    response.data.on("end", () => {
      // Send any remaining text
      if (accumulatedText.trim()) {
        res.write(`data: ${JSON.stringify({ text: accumulatedText.trim() })}\n\n`);
      }
      res.end();
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
