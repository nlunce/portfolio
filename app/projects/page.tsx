/* app/projects/page.tsx */

import React from 'react';
import ProjectsSidebar from '@/components/sidebar/ProjectsSidebar';

export default function ProjectsPage() {
  return (
    <div className='flex w-full h-full'>
      <ProjectsSidebar />

      <section className='flex-1  p-6'>
        <h1 className='text-foreground text-2xl mb-4'>Projects</h1>
      </section>
    </div>
  );
}
