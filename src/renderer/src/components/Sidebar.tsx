import React, { useState } from "react";
import { AIPlatform, AIWindow } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AIIcon } from '@/components/AIIcon';
import { 
  Search as SearchIcon,
  ChevronDown as ChevronDownIcon,
  ExternalLink,
  Monitor,
  X,
  Settings as SettingsIcon,
  User as UserIcon
} from 'lucide-react';

interface SidebarProps {
  platforms: AIPlatform[];
  openWindows: AIWindow[];
  onOpenWindow: (platform: AIPlatform) => void;
  onFocusWindow: (windowId: string) => void;
  onCloseWindow: (windowId: string) => void;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  platforms,
  openWindows,
  onOpenWindow,
  onFocusWindow,
  onCloseWindow,
  isLoading
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isWindowOpen = (platformId: string) => {
    return openWindows.some(w => w.platform === platformId);
  };

  const getOpenWindow = (platformId: string) => {
    return openWindows.find(w => w.platform === platformId);
  };

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemKey)) next.delete(itemKey);
      else next.add(itemKey);
      return next;
    });
  };

  const toggleCollapse = () => setIsCollapsed((s) => !s);

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-row">
      {/* Icon Navigation */}
      <aside className="bg-black flex flex-col gap-2 items-center p-4 w-16 h-screen border-r border-neutral-800">
        {/* Logo */}
        <div className="mb-2 size-10 flex items-center justify-center">
          <div className="size-7 bg-white rounded"></div>
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col gap-2 w-full items-center">
          {platforms.slice(0, 6).map((platform) => {
            const isOpen = isWindowOpen(platform.id);
            return (
              <button
                key={platform.id}
                onClick={() => onOpenWindow(platform)}
                className={`flex items-center justify-center rounded-lg size-10 min-w-10 transition-colors duration-200 ${
                  isOpen 
                    ? "bg-green-600/20 text-green-400 border border-green-500/30" 
                    : "hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
                }`}
                title={platform.name}
              >
                <AIIcon platformId={platform.id} size={20} />
              </button>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* Bottom section */}
        <div className="flex flex-col gap-2 w-full items-center">
          <button className="flex items-center justify-center rounded-lg size-10 min-w-10 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300">
            <SettingsIcon size={16} />
          </button>
          <div className="size-8 rounded-full bg-neutral-800 flex items-center justify-center">
            <UserIcon size={16} className="text-neutral-50" />
          </div>
        </div>
      </aside>

      {/* Detail Sidebar */}
      <aside
        className={`bg-black flex flex-col gap-4 items-start p-4 transition-all duration-500 h-screen ${
          isCollapsed ? "w-16 min-w-16 !px-0 justify-center" : "w-80"
        }`}
      >
        {/* Brand Badge */}
        {!isCollapsed && (
          <div className="relative shrink-0 w-full">
            <div className="flex items-center p-1 w-full">
              <div className="h-10 w-8 flex items-center justify-center pl-2">
                <div className="size-7 bg-white rounded"></div>
              </div>
              <div className="px-2 py-1">
                <div className="font-semibold text-[16px] text-neutral-50">
                  Combined AI
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Title */}
        <div className="w-full overflow-hidden transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center h-10">
              <div className="px-2 py-1">
                <div className="font-semibold text-[18px] text-neutral-50 leading-[27px]">
                  AI Platforms
                </div>
              </div>
            </div>
            <div className="pr-1">
              <button
                type="button"
                onClick={toggleCollapse}
                className="flex items-center justify-center rounded-lg size-10 min-w-10 transition-all duration-500 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
                aria-label="Collapse sidebar"
              >
                <ChevronDownIcon size={16} className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative shrink-0 w-full">
          <div className="bg-black h-10 relative rounded-lg flex items-center transition-all duration-500 w-full">
            <div className="flex items-center justify-center shrink-0 px-1">
              <div className="size-8 flex items-center justify-center">
                <SearchIcon size={16} className="text-neutral-50" />
              </div>
            </div>
            <div className="flex-1 relative transition-opacity duration-500 overflow-hidden opacity-100">
              <div className="flex flex-col justify-center size-full">
                <div className="flex flex-col gap-2 items-start justify-center pr-2 py-1 w-full">
                  <input
                    type="text"
                    placeholder="Search AI platforms..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-[14px] text-neutral-50 placeholder:text-neutral-400 leading-[20px]"
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-lg border border-neutral-800 pointer-events-none" />
          </div>
        </div>

        {/* Platform List */}
        <div className="flex flex-col w-full overflow-y-auto transition-all duration-500 gap-4 items-start">
          <div className="flex flex-col w-full">
            <div className="relative shrink-0 w-full overflow-hidden h-10 opacity-100">
              <div className="flex items-center h-10 px-4">
                <div className="text-[14px] text-neutral-400">
                  Available Platforms
                </div>
              </div>
            </div>

            {filteredPlatforms.map((platform, index) => {
              const isOpen = isWindowOpen(platform.id);
              const window = getOpenWindow(platform.id);
              const itemKey = `platform-${index}`;
              const isExpanded = expandedItems.has(itemKey);
              
              return (
                <div key={platform.id} className="w-full flex flex-col">
                  <div className="relative shrink-0 w-full transition-all duration-500">
                    <div
                      className={`rounded-lg cursor-pointer transition-all duration-500 flex items-center relative ${
                        isOpen ? "bg-neutral-800" : "hover:bg-neutral-800"
                      } w-full h-10 px-4 py-2`}
                      onClick={() => onOpenWindow(platform)}
                    >
                      <div className="flex items-center justify-center shrink-0">
                        <AIIcon platformId={platform.id} size={24} />
                      </div>
                      <div className="flex-1 relative transition-opacity duration-500 overflow-hidden opacity-100 ml-3">
                        <div className="text-[14px] text-neutral-50 leading-[20px] truncate">
                          {platform.name}
                        </div>
                      </div>
                      {isOpen && (
                        <div className="flex items-center justify-center shrink-0 transition-opacity duration-500 opacity-100 ml-2">
                          <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                            Open
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {isOpen && window && (
                    <div className="flex flex-col gap-1 mb-2">
                      <div className="w-full pl-9 pr-1 py-[1px]">
                        <div className="h-10 w-full rounded-lg cursor-pointer transition-colors hover:bg-neutral-800 flex items-center px-3 py-1">
                          <div className="flex-1 min-w-0 flex items-center justify-between">
                            <div className="text-[14px] text-neutral-300 leading-[18px] truncate">
                              {platform.name} Window
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onFocusWindow(window.id);
                                }}
                                className="h-6 w-6 p-0 hover:bg-neutral-700"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onCloseWindow(window.id);
                                }}
                                className="h-6 w-6 p-0 hover:bg-red-600/20"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="w-full mt-auto pt-2 border-t border-neutral-800">
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="size-8 rounded-full bg-neutral-800 flex items-center justify-center">
                <UserIcon size={16} className="text-neutral-50" />
              </div>
              <div className="text-[14px] text-neutral-50">AI Assistant</div>
              <button
                type="button"
                className="ml-auto size-8 rounded-md flex items-center justify-center hover:bg-neutral-800"
                aria-label="More"
              >
                <svg className="size-4" viewBox="0 0 16 16" fill="none">
                  <circle cx="4" cy="8" r="1" fill="#FAFAFA" />
                  <circle cx="8" cy="8" r="1" fill="#FAFAFA" />
                  <circle cx="12" cy="8" r="1" fill="#FAFAFA" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
