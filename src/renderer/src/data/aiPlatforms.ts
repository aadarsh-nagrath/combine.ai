import { AIPlatform } from '@/types';

export const aiPlatforms: AIPlatform[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'OpenAI\'s conversational AI assistant',
    icon: '',
    color: 'bg-green-500',
    category: 'chat'
  },
  {
    id: 'claude',
    name: 'Claude',
    url: 'https://claude.ai',
    description: 'Anthropic\'s AI assistant for complex tasks',
    icon: '',
    color: 'bg-orange-500',
    category: 'chat'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    url: 'https://gemini.google.com',
    description: 'Google\'s multimodal AI model',
    icon: '',
    color: 'bg-blue-500',
    category: 'chat'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    description: 'Advanced AI for coding and reasoning',
    icon: '',
    color: 'bg-purple-500',
    category: 'coding'
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    url: 'https://github.com/features/copilot',
    description: 'AI pair programmer for code generation',
    icon: '',
    color: 'bg-gray-500',
    category: 'coding'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    url: 'https://www.perplexity.ai',
    description: 'AI-powered search and research tool',
    icon: '',
    color: 'bg-indigo-500',
    category: 'research'
  },
  {
    id: 'grok',
    name: 'Grok',
    url: 'https://x.ai',
    description: 'X\'s AI assistant with real-time knowledge',
    icon: '',
    color: 'bg-red-500',
    category: 'chat'
  },
  {
    id: 'pi',
    name: 'Pi',
    url: 'https://pi.ai',
    description: 'Inflection\'s personal AI assistant',
    icon: '',
    color: 'bg-cyan-500',
    category: 'chat'
  }
];

export const getPlatformsByCategory = (category: string) => {
  return aiPlatforms.filter(platform => platform.category === category);
};

export const getPlatformById = (id: string) => {
  return aiPlatforms.find(platform => platform.id === id);
};
