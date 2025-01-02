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
  files: FileProps[];
};

// Explicitly type the folderData array
const folderData: FolderData[] = [
  {
    name: 'bio',
    iconColor: 'text-red-500',
    files: [{ name: 'bio', fileType: 'md', onClick: undefined }],
  },
  {
    name: 'education',
    iconColor: 'text-green-500',
    files: [{ name: 'education', fileType: 'md', onClick: undefined }],
  },
  {
    name: 'interests',
    iconColor: 'text-yellow-500',
    files: [{ name: 'interests', fileType: 'md', onClick: undefined }],
  },
  {
    name: 'resume',
    iconColor: 'text-blue-500',
    files: [{ name: 'resume', fileType: 'pdf', onClick: undefined }],
  },
];

export default function AboutMeSidebar() {
  const { selectFile } = useAboutMeSidebar();

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
            >
              {folder.files.map((file) => (
                <File
                  key={file.name}
                  name={file.name}
                  fileType={file.fileType}
                  onClick={() => selectFile(file.name)} // Pass the onClick handler
                />
              ))}
            </Folder>
          ))}
        </div>
      </nav>
    </aside>
  );
}
