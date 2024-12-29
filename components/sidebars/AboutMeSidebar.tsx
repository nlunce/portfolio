/* eslint-disable */
/* ./components/sidebar/AboutMeSidebar.tsx */

'use client';
import React from 'react';
// Icons
import { IoCaretDownSharp } from 'react-icons/io5';

export default function AboutMeSidebar() {
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
          <IoCaretDownSharp className='text-off-white h-3 w-3 mr-1' />
          <span className='text-off-white text-sm pl-1'>personal-info</span>
        </div>
      </nav>
    </aside>
  );
}
