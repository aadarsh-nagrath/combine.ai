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

  const handleOpenPlatform = (platform: AIPlatform) => {
    console.log('Opening platform:', platform.name, platform.url);
    setIsLoading(true);
    setActivePlatform(platform);
    setIsLoading(false);
  };

  const handleClosePlatform = () => {
    setActivePlatform(null);
  };

  const handleWebviewLoad = (event: any) => {
    const webview = event.target;
    if (webview) {
      // Handle new window requests (for OAuth popups)
      webview.addEventListener('new-window', (e: any) => {
        console.log('New window requested:', e.url);
        // Open OAuth popups in the same webview
        webview.src = e.url;
      });
      
      // Handle console messages for debugging
      webview.addEventListener('console-message', (e: any) => {
        console.log('Webview console:', e.message);
      });
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
          <div className="h-full w-full">
            <webview
              src={activePlatform.url}
              className="w-full h-full"
              style={{ display: 'flex' }}
              partition="persist:ai-platforms"
              webpreferences="allowRunningInsecureContent,experimentalFeatures"
              nodeintegration={false}
              plugins={true}
              preload=""
              httpreferrer={activePlatform.url}
              useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
              allowpopups={true}
              onDidAttach={handleWebviewLoad}
            />
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
