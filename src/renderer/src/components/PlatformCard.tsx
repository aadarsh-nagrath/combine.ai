import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIPlatform } from '@/types';
import { ExternalLink, Monitor } from 'lucide-react';

interface PlatformCardProps {
  platform: AIPlatform;
  onOpenWindow: (platform: AIPlatform) => void;
  isOpen?: boolean;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ 
  platform, 
  onOpenWindow, 
  isOpen = false 
}) => {
  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group ${
      isOpen ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
    }`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${platform.color} transition-all duration-300 group-hover:h-2`} />
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {platform.icon}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                {platform.name}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {platform.description}
              </CardDescription>
            </div>
          </div>
          {isOpen && (
            <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full animate-pulse">
              <Monitor className="w-3 h-3" />
              <span>Open</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex space-x-2">
          <Button 
            onClick={() => onOpenWindow(platform)}
            className="flex-1 transition-all duration-200 hover:scale-105"
            variant={isOpen ? "secondary" : "default"}
          >
            {isOpen ? 'Focus Window' : 'Launch AI'}
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => window.open(platform.url, '_blank')}
            title="Open in browser"
            className="transition-all duration-200 hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
