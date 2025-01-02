'use client';

import React from 'react';
import AboutMeSidebar from '@/components/sidebars/AboutMeSidebar/AboutMeSidebar';
import {
  AboutMeSidebarProvider,
  useAboutMeSidebar,
} from '@/components/sidebars/AboutMeSidebar/AboutMeSidebarContext';
import FileContent from '@/components/FileContent';
import { IoMdClose } from 'react-icons/io';

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
  const { currentFile } = useAboutMeSidebar(); // Use the hook here

  return (
    <div className='flex-1 text-sm text-foreground'>
      <div className='flex items-center'>
        <div className='flex border-b border-r border-border w-40 lg:w-48 items-center bg-background'>
          <span className='py-2 pl-3 whitespace-nowrap flex-1'>
            {currentFile}.tsx
          </span>
          <IoMdClose className='ml-auto mr-2 cursor-pointer' />
        </div>
        <div className='flex border-b border-border w-full h-[2.30625rem] items-center bg-background'></div>
      </div>

      <FileContent fileName={currentFile} />
    </div>
  );
};
