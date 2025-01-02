// Folder.tsx

import React, { useState } from 'react';
import { FolderProps } from './types';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const Folder: React.FC<FolderProps> = ({
  name,
  children,
  iconColor = 'text-yellow-500',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Folder Header */}
      <div
        className='flex items-center cursor-pointer hover:bg-border transition px-5 py-1 group'
        onClick={toggleOpen}
        role='button'
        aria-expanded={isOpen}
        tabIndex={0} // Makes the div focusable
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleOpen();
          }
        }}
      >
        {isOpen ? (
          <MdKeyboardArrowDown className='mr-1' />
        ) : (
          <MdKeyboardArrowRight className='mr-1' />
        )}
        {isOpen ? (
          <FaFolderOpen className={`${iconColor} mr-2`} />
        ) : (
          <FaFolder className={`${iconColor} mr-2`} />
        )}
        <span className='text-foreground group-hover:text-accent text-sm'>
          {name}
        </span>
      </div>

      {/* Folder Content */}
      {isOpen && <div className='flex flex-col'>{children}</div>}
    </div>
  );
};

export default Folder;
