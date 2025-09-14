# Development Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Create distributables:**
   ```bash
   npm run dist        # All platforms
   npm run dist:win    # Windows only
   npm run dist:mac    # macOS only
   npm run dist:linux  # Linux only
   ```

## Project Structure

```
ai-desktop-wrapper/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── main.ts          # Main application entry
│   │   ├── preload.ts       # Secure IPC bridge
│   │   └── utils.ts         # Utility functions
│   └── renderer/            # React renderer process
│       ├── src/
│       │   ├── components/  # UI components
│       │   ├── data/        # Static data
│       │   ├── lib/         # Utilities
│       │   ├── types/       # TypeScript types
│       │   ├── App.tsx      # Main React app
│       │   └── main.tsx     # React entry point
│       └── index.html       # HTML template
├── assets/                  # App icons and resources
├── scripts/                 # Development scripts
├── dist/                    # Build output
└── release/                 # Distribution packages
```

## Key Features Implemented

### ✅ Core Functionality
- **Multi-Platform Support**: Windows, macOS, Linux
- **AI Platform Integration**: 8+ popular AI services
- **Window Management**: Open multiple AI platforms simultaneously
- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **Settings**: Basic preferences and configuration

### ✅ AI Platforms Supported
- **Chat & Conversation**: ChatGPT, Claude, Gemini, Character.AI
- **Coding & Development**: DeepSeek, GitHub Copilot
- **Creative & Design**: Midjourney
- **Research & Analysis**: Perplexity

### ✅ Technical Features
- **Electron Integration**: Secure IPC communication
- **TypeScript**: Full type safety
- **Hot Reload**: Development with Vite
- **Cross-Platform Build**: Electron Builder configuration
- **Modern React**: Hooks, functional components

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run dev:renderer` | Start only the Vite dev server |
| `npm run build` | Build both main and renderer processes |
| `npm run build:main` | Build only the Electron main process |
| `npm run build:renderer` | Build only the React renderer |
| `npm run dist` | Create distribution packages |
| `npm run clean` | Clean build artifacts |

## Architecture

### Main Process (Electron)
- **Window Management**: Creates and manages AI platform windows
- **IPC Communication**: Secure bridge between main and renderer
- **Menu System**: Native application menus
- **Multi-Window Support**: Handle multiple AI platform instances

### Renderer Process (React)
- **UI Components**: Modern, accessible interface
- **State Management**: React hooks for application state
- **Platform Selection**: Categorized AI platform browser
- **Window Tracking**: Real-time open window management

### Security
- **Context Isolation**: Enabled for security
- **Node Integration**: Disabled in renderer
- **Preload Script**: Secure IPC bridge
- **External Links**: Properly handled with shell.openExternal

## Customization

### Adding New AI Platforms
1. Edit `src/renderer/src/data/aiPlatforms.ts`
2. Add new platform object with required fields
3. Platform will automatically appear in the UI

### Styling
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Pre-built component library
- **CSS Variables**: Theme customization support
- **Dark Mode**: Built-in theme switching

### Build Configuration
- **Electron Builder**: Cross-platform packaging
- **Vite**: Fast build tool for renderer
- **TypeScript**: Type-safe development
- **ESLint**: Code quality and consistency

## Troubleshooting

### Common Issues

1. **Build Fails**: Run `npm run clean` then `npm install`
2. **Electron Won't Start**: Check Node.js version (18+ required)
3. **Styling Issues**: Ensure Tailwind CSS is properly configured
4. **IPC Errors**: Verify preload script is correctly set up

### Development Tips

1. **Hot Reload**: Changes to renderer code auto-reload
2. **DevTools**: Available in development mode
3. **Console Logs**: Check both main and renderer console
4. **Network Issues**: AI platforms require internet connection

## Next Steps

### Potential Enhancements
- [ ] Add more AI platforms
- [ ] Implement window tabs within main app
- [ ] Add keyboard shortcuts
- [ ] Implement session persistence
- [ ] Add theme customization
- [ ] Implement AI platform favorites
- [ ] Add search functionality
- [ ] Implement notification system
- [ ] Add window state restoration
- [ ] Implement auto-updater

### Performance Optimizations
- [ ] Lazy loading for AI platform data
- [ ] Window pooling for better memory management
- [ ] Optimize bundle size
- [ ] Implement service worker for offline support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
