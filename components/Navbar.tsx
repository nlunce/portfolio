'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io'; // Importing the close icon from react-icons
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar = () => {
  // State to manage whether the mobile menu is open
  const [isOpen, setIsOpen] = useState(false);

  // Get the current route pathname for active link highlighting
  const pathname = usePathname();

  return (
    <nav className='flex space-between border-b border-border bg-background'>
      {/* Navbar Header: Name and Hamburger/X Toggle */}
      <div className='flex items-center h-12 bg-dark pl-5 md:pl-6 w-full relative border-r-[1px] border-r-border'>
        {/* Name Section */}
        <div className='text-foreground flex w-full justify-between items-center font-mono text-md md:text-sm md:w-48 lg:w-64 md:border-r-[1px] border-border h-full'>
          <div>nathan-lunceford</div>

          {/* Hamburger Menu Button (Mobile Only) */}
          <div className='md:hidden pr-5'>
            {/* Toggle button for opening/closing the menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button' /* Accessibility: Explicit button type */
            >
              {/* Display Hamburger or Close Icon based on menu state */}
              {!isOpen && (
                <RxHamburgerMenu className='h-6 w-6 text-foreground' />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        {/* Links are hidden on smaller screens using 'md:flex hidden' */}
        <div className='relative md:flex hidden items-center h-full px-6 border-r-[1px] border-r-border'>
          <Link
            href='/'
            className={`text-foreground text-sm font-mono hover:text-accent transition ${
              pathname === '/' ? 'text-white' : ''
            }`}
          >
            _hello
          </Link>
          {/* Underline for active link */}
          {pathname === '/' && (
            <span className='absolute -bottom-[2px] left-0 w-full h-[2px] bg-accent-secondary rounded-md' />
          )}
        </div>
        <div className='relative md:flex hidden items-center h-full px-6 border-r-[1px] border-r-border'>
          <Link
            href='/about-me'
            className={`text-foreground text-sm font-mono hover:text-accent transition ${
              pathname === '/about-me' ? 'text-white' : ''
            }`}
          >
            _about-me
          </Link>
          {pathname === '/about-me' && (
            <span className='absolute -bottom-[2px] left-0 w-full h-[2px] bg-accent-secondary rounded-md' />
          )}
        </div>
        <div className='relative md:flex hidden items-center h-full px-6 border-r-[1px] border-r-border'>
          <Link
            href='/projects'
            className={`text-foreground text-sm font-mono hover:text-accent transition ${
              pathname === '/projects' ? 'text-white' : ''
            }`}
          >
            _projects
          </Link>
          {pathname === '/projects' && (
            <span className='absolute -bottom-[2px] left-0 w-full h-[2px] bg-accent-secondary rounded-md' />
          )}
        </div>
      </div>

      {/* Contact Link (Desktop Only) */}
      <div className='relative md:flex hidden items-center justify-center h-12 px-6 border-border whitespace-nowrap'>
        <Link
          href='/contact-me'
          className={`text-foreground text-sm font-mono hover:text-accent transition ${
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
        <div className='fixed bg-background top-0 left-0 w-full   z-50 flex flex-col border-t border-border'>
          {/* Menu Header */}
          <div className='flex justify-between items-center h-12 px-5 border-b border-border'>
            <div className='text-foreground font-mono text-md'>
              nathan-lunceford
            </div>
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              type='button' /* Accessibility: Explicit button type */
            >
              <IoMdClose className='h-6 w-6 text-foreground' />
            </button>
          </div>

          {/* Mobile Links */}
          <div className='flex flex-col bg-dark w-full'>
            <Link
              href='/'
              className={`text-foreground font-mono text-sm border-b border-border pl-5 py-4 text-white hover:text-accent ${
                pathname === '/' ? 'text-accent-secondary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              _hello
            </Link>
            <Link
              href='/about-me'
              className={`text-foreground font-mono text-sm border-b border-border pl-5 py-4 text-white hover:text-accent ${
                pathname === '/about-me' ? 'text-accent-secondary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              _about-me
            </Link>
            <Link
              href='/projects'
              className={`text-foreground font-mono text-sm border-b border-border pl-5 py-4  text-white hover:text-accent ${
                pathname === '/projects' ? 'text-accent-secondary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              _projects
            </Link>
            <Link
              href='/contact-me'
              className={`text-foreground font-mono text-sm border-b border-border pl-5 py-4 text-white hover:text-accent${
                pathname === '/contact-me' ? 'text-accent-secondary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              _contact-me
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
