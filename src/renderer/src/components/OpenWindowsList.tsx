import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIWindow } from '@/types';
import { Monitor, X, ExternalLink } from 'lucide-react';
import { getPlatformById } from '@/data/aiPlatforms';

interface OpenWindowsListProps {
  windows: AIWindow[];
  onFocusWindow: (windowId: string) => void;
  onCloseWindow: (windowId: string) => void;
}

export const OpenWindowsList: React.FC<OpenWindowsListProps> = ({
  windows,
  onFocusWindow,
  onCloseWindow
}) => {
  if (windows.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Monitor className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No AI Windows Open</h3>
          <p className="text-muted-foreground text-sm">
            Click on any AI platform above to open a new window
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Monitor className="w-5 h-5" />
          <span>Open Windows ({windows.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {windows.map((window) => {
          const platform = getPlatformById(window.platform);
          return (
            <div
              key={window.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-lg">{platform?.icon}</div>
                <div>
                  <div className="font-medium">{platform?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {window.url}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFocusWindow(window.id)}
                >
                  Focus
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
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
