export interface AIPlatform {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
  color: string;
  category: 'chat' | 'coding' | 'creative' | 'research';
}

export interface AIWindow {
  id: string;
  platform: string;
  url: string;
  isActive?: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  defaultWindowSize: {
    width: number;
    height: number;
  };
  autoStart: boolean;
  notifications: boolean;
}
