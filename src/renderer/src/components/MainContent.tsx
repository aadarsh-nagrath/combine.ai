import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIPlatform } from '@/types';
import { Zap, Settings } from 'lucide-react';
import { AIIcon } from '@/components/AIIcon';

interface MainContentProps {
  platforms: AIPlatform[];
  onOpenPlatform: (platform: AIPlatform) => void;
  onOpenSettings: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  platforms,
  onOpenPlatform,
  onOpenSettings
}) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center max-w-4xl mx-auto p-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Welcome to Combined AI
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
          Select an AI platform from the sidebar to get started. All platforms open embedded within the app for seamless integration.
        </p>
        
        {/* Platform Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {platforms.map((platform) => (
            <Card 
              key={platform.id} 
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => onOpenPlatform(platform)}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <AIIcon platformId={platform.id} size={32} />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                  {platform.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {platform.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

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
};
