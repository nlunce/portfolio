'use client';
import Link from 'next/link';
import React from 'react';
import { BsTwitterX } from 'react-icons/bs';

const leftSocialLinks = [
  {
    href: 'https://x.com/lunceford_',
    className:
      'flex items-center justify-center w-20 h-full border-r border-border bg-background ',
    icon: (
      <BsTwitterX className='h-4 w-4 text-foreground hover:text-off-white transition-colors hover:scale-110' />
    ),
  },
  {
    href: 'https://www.linkedin.com/in/nathan-lunceford/',
    className:
      'flex items-center justify-center w-20 h-full border-r border-border bg-background ',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 24 24'
        className='h-4 w-4 text-foreground hover:text-off-white transition-colors hover:scale-110'
      >
        <path d='M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.11-.9-2-2-2s-2 .89-2 2v4.5h-3v-9h3v1.27c.88-1.2 2.22-1.77 3.5-1.77 2.21 0 4 1.79 4 4v5.5z' />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className='md:flex hidden fixed bottom-0 left-0 w-full z-50 items-center justify-between border-t border-border bg-background h-12 text-sm'>
      {/* Left side with columns */}
      <div className='flex items-center h-full'>
        {/* "find me on:" column */}
        <div className='flex items-center justify-center h-full px-6 border-r border-border'>
          <span>find me on:</span>
        </div>

        {/* Each social link as its own column */}
        {leftSocialLinks.map(({ href, icon }, idx) => (
          <Link
            key={idx}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='group flex items-center justify-center h-full px-4 border-r border-border hover:bg-border transition'
          >
            {/* Icon scales and turns white when the container is hovered */}
            {React.cloneElement(icon, {
              className: `${icon.props.className} group-hover:text-off-white group-hover:scale-110 transition-transform`,
            })}
          </Link>
        ))}
      </div>

      {/* Right side (GitHub) */}
      <div className='flex items-center h-full border-l border-border'>
        <Link
          href='https://github.com/nlunce'
          target='_blank'
          rel='noopener noreferrer'
          className='group flex items-center w-full h-full px-6 hover:bg-border transition'
        >
          {/* Wrapper for scaling effect */}
          <div className='flex items-center gap-2 group-hover:scale-105 transition-transform'>
            {/* GitHub Text */}
            <span className='text-foreground group-hover:text-off-white transition-colors'>
              @nlunce
            </span>

            {/* GitHub Icon */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 24 24'
              width='16'
              height='16'
              className='text-foreground group-hover:text-off-white transition-colors'
            >
              <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.763-1.605-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.302-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.241 2.874.118 3.176.768.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.476 5.921.43.37.815 1.102.815 2.222v3.293c0 .319.218.694.825.577C20.565 22.092 24 17.593 24 12.297c0-6.627-5.373-12-12-12z' />
            </svg>
          </div>
        </Link>
      </div>
    </footer>
  );
}
