# Combined AI Desktop Wrapper

A beautiful cross-platform desktop application that aggregates multiple AI chat platforms into a single, unified interface. Access ChatGPT, Claude, Gemini, DeepSeek, and other AI services with stunning particle animations and modern UI design.

## Features

- 🚀 **Unified Interface**: Access all your favorite AI platforms in one application
- 🖥️ **Desktop Native**: Built with Electron for a native desktop experience
- 🔄 **Multi-Window Support**: Open multiple AI platforms simultaneously
- 🎨 **Stunning UI**: Beautiful interface with particle animations and modern design
- ✨ **Splash Screen**: Animated particle text effect on startup
- 🎯 **Smart Status**: Real-time status indicators and loading states
- ⚡ **Lightweight**: Wraps official web applications without rebuilding functionality
- 🌍 **Cross-Platform**: Works on Windows, macOS, and Linux
- 🎭 **Interactive**: Hover effects, animations, and smooth transitions

## Supported AI Platforms

### Chat & Conversation
- **ChatGPT** - OpenAI's conversational AI assistant
- **Claude** - Anthropic's AI assistant for complex tasks
- **Gemini** - Google's multimodal AI model
- **Character.AI** - Chat with AI characters and personalities

### Coding & Development
- **DeepSeek** - Advanced AI for coding and reasoning
- **GitHub Copilot** - AI pair programmer for code generation

### Creative & Design
- **Midjourney** - AI image generation and art creation

### Research & Analysis
- **Perplexity** - AI-powered search and research tool

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-desktop-wrapper
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Building for Production

Build for all platforms:
```bash
npm run dist
```

Build for specific platforms:
```bash
npm run dist:win    # Windows
npm run dist:mac    # macOS
npm run dist:linux  # Linux
```

## Usage

1. **Launch the Application**: Start the AI Desktop Wrapper
2. **Select AI Platform**: Choose from the categorized list of available AI platforms
3. **Open Window**: Click "Open Window" to launch the selected AI platform in a new window
4. **Multi-Window Management**: 
   - View all open windows in the sidebar
   - Focus on specific windows
   - Close windows as needed
5. **Settings**: Configure preferences like auto-start and notifications

## Architecture

- **Main Process**: Electron main process handles window management and IPC
- **Renderer Process**: React-based UI with shadcn/ui components
- **WebView Integration**: Each AI platform runs in its own Electron BrowserWindow
- **Cross-Platform**: Built with Electron for native desktop experience

## Development

### Project Structure

```
src/
├── main/           # Electron main process
│   ├── main.ts     # Main application entry point
│   ├── preload.ts  # Preload script for secure IPC
│   └── utils.ts    # Utility functions
└── renderer/       # React renderer process
    ├── components/ # UI components
    ├── data/       # Static data and configurations
    ├── lib/        # Utility functions
    ├── types/      # TypeScript type definitions
    └── src/        # Main React application
```

### Key Technologies

- **Electron**: Cross-platform desktop app framework
- **React**: UI library for the renderer process
- **TypeScript**: Type-safe development
- **shadcn/ui**: Modern UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Roadmap

- [ ] Add more AI platforms
- [ ] Implement window tabs within the main app
- [ ] Add keyboard shortcuts
- [ ] Implement session persistence
- [ ] Add theme customization
- [ ] Implement AI platform favorites
- [ ] Add search functionality
- [ ] Implement notification system
