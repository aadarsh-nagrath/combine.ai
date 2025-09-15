import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // AI Window management
  openAIWindow: (platform: string, url: string) => 
    ipcRenderer.invoke('open-ai-window', platform, url),
  
  closeAIWindow: (windowId: string) => 
    ipcRenderer.invoke('close-ai-window', windowId),
  
  getOpenWindows: () => 
    ipcRenderer.invoke('get-open-windows'),
  
  focusWindow: (windowId: string) => 
    ipcRenderer.invoke('focus-window', windowId),

  // Main window navigation
  navigateToURL: (url: string) => 
    ipcRenderer.invoke('navigate-to-url', url),
  
  navigateToApp: () => 
    ipcRenderer.invoke('navigate-to-app'),

  // Event listeners
  onWindowClosed: (callback: (windowId: string) => void) => {
    ipcRenderer.on('window-closed', (event, windowId) => callback(windowId));
  },

  onMenuNewWindow: (callback: () => void) => {
    ipcRenderer.on('menu-new-window', callback);
  },

  onMenuSettings: (callback: () => void) => {
    ipcRenderer.on('menu-settings', callback);
  },

  // Remove listeners
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },

  // Open URL in system browser (for OAuth that blocks embeds)
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),

  // Open auth popup window that shares the same session
  openAuthPopup: (url: string) => ipcRenderer.invoke('open-auth-popup', url),
});

// Type definitions for the exposed API
declare global {
  interface Window {
    electronAPI: {
      openAIWindow: (platform: string, url: string) => Promise<string>;
      closeAIWindow: (windowId: string) => Promise<boolean>;
      getOpenWindows: () => Promise<Array<{id: string, platform: string, url: string}>>;
      focusWindow: (windowId: string) => Promise<boolean>;
      navigateToURL: (url: string) => Promise<void>;
      navigateToApp: () => Promise<void>;
      onWindowClosed: (callback: (windowId: string) => void) => void;
      onMenuNewWindow: (callback: () => void) => void;
      onMenuSettings: (callback: () => void) => void;
      removeAllListeners: (channel: string) => void;
      openExternal: (url: string) => Promise<void>;
      openAuthPopup: (url: string) => Promise<void>;
    };
  }
}
