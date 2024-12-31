import React from 'react';
import ContactMeSidebar from '@/components/sidebars/ContactMeSidebar';

export default function ContactMePage() {
  return (
    <div className='flex w-full h-full'>
      <ContactMeSidebar />

      <section className='flex-1  p-6'>
        <h1 className='text-foreground text-2xl mb-4'>Coming soon</h1>
      </section>
    </div>
  );
}
