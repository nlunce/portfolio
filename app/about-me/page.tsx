import React from 'react';
import AboutMeSidebar from '@/components/sidebars/AboutMeSidebar';

export default function AboutMePage() {
  return (
    <div className='flex w-full h-full'>
      <AboutMeSidebar />

      <section className='flex-1  p-6'>
        <h1 className='text-foreground text-2xl mb-4'>Coming soon</h1>
      </section>
    </div>
  );
}
