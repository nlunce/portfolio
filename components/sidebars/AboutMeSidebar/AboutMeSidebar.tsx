// AboutMeSidebar.tsx

'use client';
import React from 'react';
import { IoCaretDownSharp } from 'react-icons/io5';
import Folder from '../Folder/Folder';
import File from '../File/File';
import { useAboutMeSidebar } from './AboutMeSidebarContext';
import { FileProps } from '../File/types';

// Define the type for folderData
type FolderData = {
  name: string;
  iconColor: string;
  files: Omit<FileProps, 'onClick'>[]; // Exclude 'onClick' from FileProps
  defaultOpen?: boolean; // New property to set default open state
};

// Explicitly type the folderData array
const folderData: FolderData[] = [
  {
    name: 'bio',
    iconColor: 'text-red-500',
    files: [{ name: 'bio', fileType: 'md' }],
    defaultOpen: true, // Open the Bio folder by default
  },
  {
    name: 'education',
    iconColor: 'text-green-500',
    files: [{ name: 'education', fileType: 'md' }],
  },
  {
    name: 'interests',
    iconColor: 'text-yellow-500',
    files: [{ name: 'interests', fileType: 'md' }],
  },
  {
    name: 'resume',
    iconColor: 'text-blue-500',
    files: [{ name: 'resume', fileType: 'pdf' }],
  },
];

export default function AboutMeSidebar() {
  const { selectFile, selectedFile } = useAboutMeSidebar(); // Destructure from context

  return (
    <aside
      className='
        hidden md:block
        bg-background border-r border-border
        md:w-[calc(12rem+1.5rem)]
        lg:w-[calc(16rem+1.5rem)]
        overflow-y-auto
      '
    >
      <nav>
        {/* Heading row */}
        <div className='flex items-center py-2 border-b border-border px-6'>
          <IoCaretDownSharp className='text-off-white h-3 w-3 mr-1 cursor-pointer' />
          <span className='text-off-white text-sm pl-1 cursor-pointer'>
            personal-info
          </span>
        </div>

        {/* Folder structure */}
        <div>
          {folderData.map((folder) => (
            <Folder
              key={folder.name}
              name={folder.name}
              iconColor={folder.iconColor}
              defaultOpen={folder.defaultOpen} // Pass defaultOpen prop
            >
              {folder.files.length > 0 ? (
                folder.files.map((file) => (
                  <File
                    key={file.name}
                    name={`${file.name}.${file.fileType}`} // e.g., 'bio.md'
                    fileType={file.fileType}
                    selected={`${file.name}.${file.fileType}` === selectedFile} // Compare full name
                    onClick={() => selectFile(`${file.name}.${file.fileType}`)} // Pass full name
                  />
                ))
              ) : (
                <div className='pl-20 text-gray-500 text-sm'>
                  No files available.
                </div>
              )}
            </Folder>
          ))}
        </div>
      </nav>
    </aside>
  );
}
