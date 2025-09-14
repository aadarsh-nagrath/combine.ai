import React from 'react';

interface AIIconProps {
  platformId: string;
  size?: number;
  className?: string;
}

export const AIIcon: React.FC<AIIconProps> = ({ platformId, size = 20, className = "" }) => {
  const iconStyle = {
    width: size,
    height: size,
    borderRadius: '4px',
    objectFit: 'cover' as const,
  };

  const getIcon = () => {
    switch (platformId) {
      case 'chatgpt':
        return (
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png" 
            alt="ChatGPT" 
            style={iconStyle} 
            className={className}
          />
        );
      
      case 'claude':
        return (
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Po3958DsH3mbAF6CdYaH_fRL4aA6K49y-B_diepetSe0WR3SdqEGkZMHoNFv8MONNCE&usqp=CAU" 
            alt="Claude" 
            style={iconStyle} 
            className={className}
          />
        );
      
      case 'gemini':
        return (
          <img 
            src="https://helios-i.mashable.com/imagery/articles/00zEnhbB6mXQs8x5yXw38bT/images-3.fit_lim.size_376x.webp" 
            alt="Gemini" 
            style={iconStyle} 
            className={className}
          />
        );
      
      case 'deepseek':
        return (
          <img 
            src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/deepseek-color.png" 
            alt="DeepSeek" 
            style={iconStyle} 
            className={className}
          />
        );
      
      case 'copilot':
        return (
          <img 
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
            alt="GitHub Copilot" 
            style={iconStyle} 
            className={className}
          />
        );
      
      case 'perplexity':
        return (
          <img 
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png" 
            alt="Perplexity" 
            style={iconStyle} 
            className={className}
          />
        );
      
      case 'grok':
        return (
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOv3K6RevHQCscoWPa2BvxKTq-9ygcQ4mhRA&s" 
            alt="Grok" 
            style={iconStyle} 
            className={className}
          />
        );
      
      case 'pi':
        return (
          <img 
            src="https://styles.redditmedia.com/t5_8uphr9/styles/communityIcon_00qi7rghcxhd1.jpg?format=pjpg&s=af106e5a65a958c92e09f4591bb95a56155323ac" 
            alt="Pi" 
            style={iconStyle} 
            className={className}
          />
        );
      
      default:
        return (
          <div 
            style={iconStyle} 
            className={`bg-gray-500 flex items-center justify-center text-white text-xs font-bold ${className}`}
          >
            AI
          </div>
        );
    }
  };

  return getIcon();
};
