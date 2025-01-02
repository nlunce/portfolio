/* app/projects/page.tsx */
'use client';

import React from 'react';
import ProjectsSidebar from '@/components/sidebars/ProjectsSidebar/ProjectsSidebar';
import { ProjectsSidebarProvider } from '@/components/sidebars/ProjectsSidebar/ProjectsSidebarContext';
import Projects from '@/components/Projects';
import { IoMdClose } from 'react-icons/io';

export default function ProjectsPage() {
  return (
    <ProjectsSidebarProvider>
      <div className='flex w-full h-full'>
        <ProjectsSidebar />
        <Content />
      </div>
    </ProjectsSidebarProvider>
  );
}
const Content = () => {
  return (
    <div className='flex-1 text-sm text-foreground'>
      <div className='flex items-center'>
        <div className='flex border-b border-r border-border w-40 lg:w-48 items-center bg-background'>
          <span className='py-2 pl-3 whitespace-nowrap flex-1'>
            projects.tsx
          </span>
          <IoMdClose className='ml-auto mr-2 cursor-pointer' />
        </div>
        <div className='flex border-b border-border w-full h-[2.30625rem] items-center bg-background'></div>
      </div>

      <Projects />
    </div>
  );
};
