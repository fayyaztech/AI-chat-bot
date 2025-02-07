# AI Chat Assistant

An interactive chat application that provides context-aware responses using the Deepseek language model. The application features a modern, responsive UI with real-time message streaming and markdown support.

## Features

### Chat Interface
- 💬 Real-time message streaming
- 🔄 Context-aware responses (bot remembers conversation history)
- ⌨️ Multi-line input support (Shift+Enter for new line)
- 🔴 Stop generation button
- 🗑️ Clear chat functionality

### Message Formatting
- ✨ Markdown support
- 📝 LaTeX math formula rendering
- 🎨 Syntax highlighting for code blocks
- 📏 Auto-resizing input area

### UI/UX
- 👤 User and AI avatars
- ⏳ Typing indicator animation
- 📱 Responsive design
- 🌊 Smooth scrolling
- 💅 Modern styling with Tailwind CSS

## Tech Stack

- **Frontend**:
  - EJS (Embedded JavaScript templates)
  - Tailwind CSS for styling
  - KaTeX for math formula rendering
  - Marked.js for Markdown parsing

- **Backend**:
  - Node.js
  - Express.js
  - Deepseek language model
  - Server-Sent Events (SSE) for streaming

## Prerequisites

- Node.js 14+ installed
- Running instance of Deepseek model on localhost:11434
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-chat-assistant.git
cd ai-chat-assistant
```

2. Install dependencies:

```bash
npm install
```

3. Create necessary directories and files:

```bash
mkdir -p public/css
touch public/css/style.css
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development Scripts

- `npm run dev`: Start development server and Tailwind compiler concurrently
- `npm run server`: Start server with hot-reload using nodemon
- `npm run tailwind`: Start Tailwind CSS compiler in watch mode
- `npm start`: Start production server

## Project Structure

```
.
├── public/
│   └── css/
│       ├── style.css      # Tailwind CSS input
│       └── output.css     # Generated CSS (gitignored)
├── views/
│   └── index.ejs         # Main chat interface
├── server.js             # Express server
├── tailwind.config.js    # Tailwind configuration
├── nodemon.json          # Nodemon configuration
├── .gitignore           # Git ignore configuration
└── package.json         # Project dependencies and scripts
```

## Usage

1. Start the application using `npm run dev`
2. Open your browser to `http://localhost:3000`
3. Start chatting with the AI assistant
4. Use Shift+Enter for multi-line messages
5. Click the Stop button to cancel response generation
6. Use the Clear Chat button to reset the conversation

## Features in Detail

### Context-Aware Responses
The bot maintains conversation history and provides responses based on previously discussed information. It will:
1. Use information from previous messages when answering questions
2. Indicate when information wasn't previously discussed
3. Provide consistent and contextual responses

### Message Formatting
- **Markdown**: Supports headers, bold, italic, lists, code blocks
- **Math**: Renders LaTeX formulas using KaTeX
- **Code**: Syntax highlighting for code blocks
- **Line Breaks**: Preserves formatting and spacing

### Real-Time Interaction
- Immediate user message display
- Typing indicator while generating response
- Ability to stop response generation
- Smooth message transitions

## Environment Variables

No environment variables are required for basic setup. The server runs on port 3000 by default.

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- Requires a running instance of Deepseek model
- No message persistence (messages are lost on page refresh)
- Limited to text-based interactions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Deepseek for the language model
- Tailwind CSS for the styling framework
- KaTeX for math rendering
- Marked.js for markdown parsing
