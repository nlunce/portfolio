// File.tsx

import React from 'react';
import { FileProps } from './types';
import {
  SiMarkdown,
  SiJavascript,
  SiTypescript,
  SiJson,
  SiCss3,
} from 'react-icons/si';
import { FaFilePdf, FaReact, FaFileAlt } from 'react-icons/fa';

const File: React.FC<FileProps> = ({
  name,
  fileType,
  onClick,
  selected = false,
}) => {
  const getIcon = () => {
    switch (fileType) {
      case 'md':
        return <SiMarkdown className='text-blue-500 mr-2' />;
      case 'js':
        return <SiJavascript className='text-yellow-400 mr-2' />;
      case 'ts':
        return <SiTypescript className='text-blue-400 mr-2' />;
      case 'jsx':
        return <FaReact className='text-blue-400 mr-2' />;
      case 'tsx':
        return <FaReact className='text-purple-500 mr-2' />;
      case 'json':
        return <SiJson className='text-green-400 mr-2' />;
      case 'css':
        return <SiCss3 className='text-blue-400 mr-2' />;
      case 'pdf':
        return <FaFilePdf className='text-red-500 mr-2' />;
      default:
        return <FaFileAlt className='text-foreground mr-2' />;
    }
  };

  return (
    <div
      className={`flex items-center cursor-pointer transition pl-14 py-1 group ${
        selected ? 'bg-border ' : 'hover:bg-border'
      }`}
      onClick={onClick}
      role='button'
      aria-selected={selected}
      tabIndex={0} // Makes the div focusable
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      {getIcon()}
      <span className='text-foreground text-sm group-hover:text-accent'>
        {name}
      </span>
    </div>
  );
};

export default File;
