import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AppSettings } from '@/types';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  settings,
  onSettingsChange
}) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your AI Desktop Wrapper preferences.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-start">Auto-start with system</Label>
              <div className="text-sm text-muted-foreground">
                Launch the app when your computer starts
              </div>
            </div>
            <Switch
              id="auto-start"
              checked={localSettings.autoStart}
              onCheckedChange={(checked) =>
                setLocalSettings(prev => ({ ...prev, autoStart: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Enable notifications</Label>
              <div className="text-sm text-muted-foreground">
                Show notifications for AI responses
              </div>
            </div>
            <Switch
              id="notifications"
              checked={localSettings.notifications}
              onCheckedChange={(checked) =>
                setLocalSettings(prev => ({ ...prev, notifications: checked }))
              }
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
