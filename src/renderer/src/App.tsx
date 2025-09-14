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
  const [activePlatform, setActivePlatform] = useState<AIPlatform | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'system',
    defaultWindowSize: { width: 1200, height: 800 },
    autoStart: false,
    notifications: true,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Set up event listeners
    if (window.electronAPI) {
      window.electronAPI.onMenuSettings(() => {
        setSettingsOpen(true);
      });
    }

    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('menu-settings');
      }
    };
  }, []);

  const handleOpenPlatform = async (platform: AIPlatform) => {
    console.log('Opening platform:', platform.name, platform.url);
    setIsLoading(true);
    
    // Use Electron's webContents to navigate the main window
    if (window.electronAPI) {
      try {
        await window.electronAPI.navigateToURL(platform.url);
        setActivePlatform(platform);
      } catch (error) {
        console.error('Failed to navigate:', error);
        // Fallback to iframe
        setActivePlatform(platform);
      }
    } else {
      setActivePlatform(platform);
    }
    
    setIsLoading(false);
  };

  const handleClosePlatform = () => {
    setActivePlatform(null);
    // Navigate back to the app's main page
    if (window.electronAPI) {
      window.electronAPI.navigateToApp();
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
      {/* Sidebar - Always visible with high z-index */}
      <div className="relative z-50">
        <Sidebar
          platforms={aiPlatforms}
          activePlatform={activePlatform}
          onOpenPlatform={handleOpenPlatform}
          onClosePlatform={handleClosePlatform}
          isLoading={isLoading}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {activePlatform ? (
          <div className="h-full w-full bg-white">
            <div className="h-12 bg-gray-100 border-b flex items-center justify-between px-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                <span className="font-medium text-gray-700">{activePlatform.name}</span>
                <span className="text-sm text-gray-500">({activePlatform.url})</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => window.open(activePlatform.url, '_blank')}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Open in Browser
                </button>
                <button 
                  onClick={handleClosePlatform}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Back to App
                </button>
              </div>
            </div>
            <div className="h-[calc(100%-3rem)] bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700 mb-2">
                  Loading {activePlatform.name}...
                </div>
                <div className="text-sm text-gray-500">
                  The AI platform should load in the main window above
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MainContent
            platforms={aiPlatforms}
            onOpenPlatform={handleOpenPlatform}
            onOpenSettings={handleOpenSettings}
          />
        )}
      </div>

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
