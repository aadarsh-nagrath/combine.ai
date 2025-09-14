import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';
import * as path from 'path';
import { isDev } from './utils';

interface AIWindow {
  id: string;
  window: BrowserWindow;
  platform: string;
  url: string;
}

class AIWrapperApp {
  private mainWindow: BrowserWindow | null = null;
  private aiWindows: Map<string, AIWindow> = new Map();
  private windowCounter = 0;

  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    app.whenReady().then(() => {
      this.createMainWindow();
      this.setupMenu();
      this.setupIPC();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
      }
    });
  }

  private createMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
        webviewTag: true, // Enable webview tag
      },
      titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
      show: false,
    });

    // Load the renderer
    if (isDev()) {
      this.mainWindow.loadURL('http://localhost:5173');
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }

  private setupMenu(): void {
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'File',
        submenu: [
          {
            label: 'New AI Window',
            accelerator: 'CmdOrCtrl+N',
            click: () => {
              this.mainWindow?.webContents.send('menu-new-window');
            },
          },
          { type: 'separator' },
          {
            label: 'Settings',
            accelerator: 'CmdOrCtrl+,',
            click: () => {
              this.mainWindow?.webContents.send('menu-settings');
            },
          },
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
            click: () => {
              app.quit();
            },
          },
        ],
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' },
        ],
      },
    ];

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  private setupIPC(): void {
    ipcMain.handle('open-ai-window', async (event, platform: string, url: string) => {
      return this.openAIWindow(platform, url);
    });

    ipcMain.handle('close-ai-window', async (event, windowId: string) => {
      return this.closeAIWindow(windowId);
    });

    ipcMain.handle('get-open-windows', async () => {
      return Array.from(this.aiWindows.values()).map(aiWindow => ({
        id: aiWindow.id,
        platform: aiWindow.platform,
        url: aiWindow.url,
      }));
    });

    ipcMain.handle('focus-window', async (event, windowId: string) => {
      const aiWindow = this.aiWindows.get(windowId);
      if (aiWindow) {
        aiWindow.window.focus();
        return true;
      }
      return false;
    });

    // Main window navigation handlers
    ipcMain.handle('navigate-to-url', async (event, url: string) => {
      if (this.mainWindow) {
        this.mainWindow.loadURL(url);
      }
    });

    ipcMain.handle('navigate-to-app', async () => {
      if (this.mainWindow) {
        if (isDev()) {
          this.mainWindow.loadURL('http://localhost:5173');
        } else {
          this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
        }
      }
    });
  }

  private openAIWindow(platform: string, url: string): string {
    const windowId = `ai-${++this.windowCounter}`;
    
    const aiWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: true,
      },
      title: `${platform} - AI Desktop Wrapper`,
      show: false,
    });

    aiWindow.loadURL(url);

    aiWindow.once('ready-to-show', () => {
      aiWindow.show();
    });

    aiWindow.on('closed', () => {
      this.aiWindows.delete(windowId);
      this.mainWindow?.webContents.send('window-closed', windowId);
    });

    // Handle external links
    aiWindow.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });

    this.aiWindows.set(windowId, {
      id: windowId,
      window: aiWindow,
      platform,
      url,
    });

    return windowId;
  }

  private closeAIWindow(windowId: string): boolean {
    const aiWindow = this.aiWindows.get(windowId);
    if (aiWindow) {
      aiWindow.window.close();
      return true;
    }
    return false;
  }
}

// Initialize the app
new AIWrapperApp();
