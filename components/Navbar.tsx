/* ./components/Navbar.tsx */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsTwitterX } from 'react-icons/bs';

const desktopLinks = [
  { label: '_hello', href: '/' },
  { label: '_about-me', href: '/about-me' },
  { label: '_projects', href: '/projects' },
];

const mobileLinks = [
  { label: '_hello', href: '/' },
  { label: '_about-me', href: '/about-me' },
  { label: '_projects', href: '/projects' },
  { label: '_contact-me', href: '/contact-me' },
];

const socialLinks = [
  {
    href: 'https://x.com/lunceford_',
    className:
      'flex items-center justify-center w-20 h-full border-r border-border bg-background ',
    icon: (
      <BsTwitterX className='h-6 w-6 text-foreground hover:text-white transition-colors' />
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
        className='h-6 w-6 text-foreground hover:text-white transition-colors'
      >
        <path d='M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.11-.9-2-2-2s-2 .89-2 2v4.5h-3v-9h3v1.27c.88-1.2 2.22-1.77 3.5-1.77 2.21 0 4 1.79 4 4v5.5z' />
      </svg>
    ),
  },
  {
    href: 'https://github.com/nlunce',
    className: 'flex items-center justify-center w-20 h-full  bg-background',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 24 24'
        className='h-6 w-6 text-foreground hover:text-white transition-colors'
      >
        <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.763-1.605-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.302-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.241 2.874.118 3.176.768.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.476 5.921.43.37.815 1.102.815 2.222v3.293c0 .319.218.694.825.577C20.565 22.092 24 17.593 24 12.297c0-6.627-5.373-12-12-12z' />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className='flex space-between border-b border-border bg-background'>
      {/* Navbar Header: Name and Hamburger/X Toggle */}
      <div className='flex items-center h-12 bg-dark pl-5 md:pl-6 w-full relative border-r-[1px] border-r-border'>
        {/* Name Section */}
        <div className='text-foreground flex w-full justify-between items-center text-md md:text-sm md:w-48 lg:w-64 md:border-r-[1px] border-border h-full'>
          <div>nathan-lunceford</div>

          {/* Hamburger Menu Button (Mobile Only) */}
          <div className='md:hidden pr-5'>
            <button onClick={() => setIsOpen(!isOpen)} type='button'>
              {!isOpen && (
                <RxHamburgerMenu className='h-6 w-6 text-foreground' />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        {desktopLinks.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <div
              key={href}
              className='relative md:flex hidden items-center h-full px-6 border-r-[1px] border-r-border'
            >
              <Link
                href={href}
                className={`text-foreground text-sm hover:text-accent transition ${
                  active ? 'text-white' : ''
                }`}
              >
                {label}
              </Link>
              {active && (
                <span className='absolute -bottom-[2px] left-0 w-full h-[2px] bg-accent-secondary rounded-md' />
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Link (Desktop Only) */}
      <div className='relative md:flex hidden items-center justify-center h-12 px-6 border-border whitespace-nowrap'>
        <Link
          href='/contact-me'
          className={`text-foreground text-sm  hover:text-accent transition ${
            pathname === '/contact-me' ? 'text-white' : ''
          }`}
        >
          _contact-me
        </Link>
        {pathname === '/contact-me' && (
          <span className='absolute -bottom-[2px] left-0 w-full h-[2px] bg-accent-secondary rounded-md' />
        )}
      </div>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className='fixed bg-background top-0 left-0 w-full h-full z-50 flex flex-col '>
          {/* Menu Header */}
          <div className='flex justify-between items-center h-12 px-5 border-b border-border'>
            <div className='text-foreground text-md'>nathan-lunceford</div>
            <button onClick={() => setIsOpen(false)} type='button'>
              <IoMdClose className='h-6 w-6 text-foreground' />
            </button>
          </div>

          {/* Mobile Links */}
          <div className='flex flex-col bg-dark w-full'>
            {mobileLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-foreground text-md border-b border-border pl-5 py-4 text-white hover:text-accent ${
                    active ? 'text-accent-secondary' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Footer with Social Icons */}
          <div className='flex mt-auto items-center justify-between border-t border-border bg-background h-12 text-md pl-5'>
            {/* Left Section */}
            <div className='ml-auto border-r border-border h-full w-full flex items-center font-mono text-foreground'>
              find me on:
            </div>

            {/* Social Links */}
            <div className='flex h-full items-center'>
              {socialLinks.map(({ href, className, icon }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={className}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
