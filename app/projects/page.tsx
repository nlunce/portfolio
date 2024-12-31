/* app/projects/page.tsx */
'use client';

import React from 'react';
import ProjectsSidebar from '@/components/sidebars/projects-sidebar/ProjectsSidebar';
import {
  ProjectsSidebarProvider,
  useProjectsSidebar,
} from '@/components/sidebars/projects-sidebar/ProjectsSidebarContext';
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
  const { checkedItems } = useProjectsSidebar();

  return (
    <div className='flex-1 text-sm text-foreground'>
      <div className='flex items-center'>
        <div className='flex border-b border-r border-border pr-2 w-40 lg:w-48 items-center bg-background'>
          <span className='py-2 pl-3 pr-8 lg:pr-14 whitespace-nowrap'>
            projects.tsx
          </span>
          <IoMdClose />
        </div>
        <div className='flex border-b border-border w-full h-[2.30625rem] items-center bg-background'></div>
      </div>

      <Projects />
    </div>
  );
};
