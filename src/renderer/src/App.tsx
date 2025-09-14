import React, { useState, useEffect } from 'react';
import { SettingsDialog } from '@/components/SettingsDialog';
import { SplashScreen } from '@/components/SplashScreen';
import { Sidebar } from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent';
import { aiPlatforms } from '@/data/aiPlatforms';
import { AIPlatform, AIWindow, AppSettings } from '@/types';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [openWindows, setOpenWindows] = useState<AIWindow[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'system',
    defaultWindowSize: { width: 1200, height: 800 },
    autoStart: false,
    notifications: true,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Load open windows on startup
    loadOpenWindows();
    
    // Set up event listeners
    if (window.electronAPI) {
      window.electronAPI.onWindowClosed((windowId: string) => {
        setOpenWindows(prev => prev.filter(w => w.id !== windowId));
      });

      window.electronAPI.onMenuNewWindow(() => {
        // Could implement a quick window picker here
        console.log('New window requested from menu');
      });

      window.electronAPI.onMenuSettings(() => {
        setSettingsOpen(true);
      });
    }

    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('window-closed');
        window.electronAPI.removeAllListeners('menu-new-window');
        window.electronAPI.removeAllListeners('menu-settings');
      }
    };
  }, []);

  const loadOpenWindows = async () => {
    if (window.electronAPI) {
      try {
        const windows = await window.electronAPI.getOpenWindows();
        setOpenWindows(windows);
      } catch (error) {
        console.error('Failed to load open windows:', error);
      }
    }
  };

  const handleOpenWindow = async (platform: AIPlatform) => {
    if (window.electronAPI) {
      try {
        setIsLoading(true);
        const windowId = await window.electronAPI.openAIWindow(platform.name, platform.url);
        const newWindow: AIWindow = {
          id: windowId,
          platform: platform.id,
          url: platform.url,
        };
        setOpenWindows(prev => [...prev, newWindow]);
      } catch (error) {
        console.error('Failed to open window:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFocusWindow = async (windowId: string) => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.focusWindow(windowId);
      } catch (error) {
        console.error('Failed to focus window:', error);
      }
    }
  };

  const handleCloseWindow = async (windowId: string) => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.closeAIWindow(windowId);
        setOpenWindows(prev => prev.filter(w => w.id !== windowId));
      } catch (error) {
        console.error('Failed to close window:', error);
      }
    }
  };


  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="h-screen flex bg-slate-900">
      {/* Sidebar */}
      <Sidebar
        platforms={aiPlatforms}
        openWindows={openWindows}
        onOpenWindow={handleOpenWindow}
        onFocusWindow={handleFocusWindow}
        onCloseWindow={handleCloseWindow}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <MainContent
        openWindows={openWindows}
        onFocusWindow={handleFocusWindow}
        onCloseWindow={handleCloseWindow}
        onOpenSettings={handleOpenSettings}
      />

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
}

export default App;
