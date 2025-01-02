// AboutMePage.tsx

'use client';

import React from 'react';
import AboutMeSidebar from '@/components/sidebars/AboutMeSidebar/AboutMeSidebar';
import { AboutMeSidebarProvider } from '@/components/sidebars/AboutMeSidebar/AboutMeSidebarContext';
import FileContent from '@/components/FileContent';
import { IoMdClose } from 'react-icons/io';
import { useAboutMeSidebar } from '@/components/sidebars/AboutMeSidebar/AboutMeSidebarContext';

export default function AboutMePage() {
  return (
    <AboutMeSidebarProvider>
      <div className='flex w-full h-full'>
        <AboutMeSidebar />
        <Content />
      </div>
    </AboutMeSidebarProvider>
  );
}

const Content = () => {
  const { selectedFile, selectFile } = useAboutMeSidebar();

  if (!selectedFile) {
    return (
      <div className='flex-1 flex items-center justify-center text-gray-500'>
        <p>Please select a file from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className='flex-1 text-sm text-foreground'>
      <div className='flex items-center'>
        <div className='flex border-b border-r border-border w-40 lg:w-48 items-center bg-background'>
          <span className='py-2 pl-3 whitespace-nowrap flex-1'>
            {selectedFile}
          </span>
          <IoMdClose
            className='ml-auto mr-2 cursor-pointer'
            onClick={() => selectFile(null)}
            aria-label='Close file view'
            role='button'
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                selectFile(null);
              }
            }}
          />
        </div>
        <div className='flex border-b border-border w-full h-[2.30625rem] items-center bg-background'></div>
      </div>

      <FileContent fileName={selectedFile} />
    </div>
  );
};
