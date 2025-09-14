import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIWindow } from '@/types';
import { Monitor, ExternalLink, X, Zap, Settings } from 'lucide-react';
import { getPlatformById } from '@/data/aiPlatforms';

interface MainContentProps {
  openWindows: AIWindow[];
  onFocusWindow: (windowId: string) => void;
  onCloseWindow: (windowId: string) => void;
  onOpenSettings: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  openWindows,
  onFocusWindow,
  onCloseWindow,
  onOpenSettings
}) => {
  if (openWindows.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to Combined AI
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
            Select an AI platform from the sidebar to get started. Open multiple platforms simultaneously for enhanced productivity.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Ready to launch AI platforms</span>
            </div>
            <Button
              variant="outline"
              onClick={onOpenSettings}
              className="mt-4"
            >
              <Settings className="w-4 h-4 mr-2" />
              Open Settings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Active AI Sessions
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your open AI platform windows
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onOpenSettings}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Windows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openWindows.map((window) => {
            const platform = getPlatformById(window.platform);
            return (
              <Card key={window.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{platform?.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{platform?.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {platform?.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                      <Monitor className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      {window.url}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => onFocusWindow(window.id)}
                        className="flex-1"
                        size="sm"
                      >
                        Focus Window
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(window.url, '_blank')}
                        title="Open in browser"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCloseWindow(window.id)}
                        title="Close window"
                        className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {openWindows.length}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">
                    Active Windows
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {new Set(openWindows.map(w => w.platform)).size}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-300">
                    Unique Platforms
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    Ready
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-300">
                    System Status
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
