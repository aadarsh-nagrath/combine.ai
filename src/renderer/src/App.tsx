import React, { useState, useEffect, useRef } from 'react';
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
  const webviewRef = useRef<any>(null);

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

  useEffect(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    const isAuthUrl = (url: string) => /accounts\.google\.com|apis\.google\.com|oauth2|gsi/.test(url);

    const onDomReady = () => {
      console.log('webview dom-ready');
    };
    const onNewWindow = (e: any) => {
      const url = e.url || '';
      console.log('webview new-window', url);
      if (isAuthUrl(url)) {
        window.electronAPI?.openAuthPopup(url);
      } else if (url) {
        webview.src = url;
      }
    };
    const onDidCreateWindow = (e: any) => {
      const url = e?.url || e?.newGuest?.getURL?.() || '';
      console.log('webview did-create-window', url);
      if (isAuthUrl(url)) {
        window.electronAPI?.openAuthPopup(url);
      }
    };
    const onWillNavigate = (e: any) => {
      const url = e.url || '';
      if (isAuthUrl(url)) {
        e.preventDefault?.();
        window.electronAPI?.openAuthPopup(url);
      }
    };
    const onConsole = (e: any) => console.log('webview console:', e.message);

    webview.addEventListener('dom-ready', onDomReady);
    webview.addEventListener('new-window', onNewWindow);
    webview.addEventListener('did-create-window', onDidCreateWindow as any);
    webview.addEventListener('will-navigate', onWillNavigate);
    webview.addEventListener('console-message', onConsole);

    return () => {
      webview.removeEventListener('dom-ready', onDomReady);
      webview.removeEventListener('new-window', onNewWindow);
      webview.removeEventListener('did-create-window', onDidCreateWindow as any);
      webview.removeEventListener('will-navigate', onWillNavigate);
      webview.removeEventListener('console-message', onConsole);
    };
  }, [activePlatform]);


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
              ref={webviewRef}
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
