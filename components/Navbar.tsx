'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  return (
    <nav className='flex space-between border-b border-border bg-background'>
      {/* Navbar Header: Name and Hamburger/X Toggle */}
      <div className='flex items-center h-12 bg-dark pl-5 md:pl-6 w-full relative border-r-[1px] border-r-border'>
        {/* Name Section */}
        <div className='text-foreground flex w-full justify-between items-center  text-md md:text-sm md:w-48 lg:w-64 md:border-r-[1px] border-border h-full'>
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
            className={`text-foreground text-sm  hover:text-accent transition ${
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
            className={`text-foreground text-sm  hover:text-accent transition ${
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
            className={`text-foreground text-sm  hover:text-accent transition ${
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
        <div className='fixed bg-background top-0 left-0 w-full h-full  z-50 flex flex-col border-t border-border'>
          {/* Menu Header */}
          <div className='flex justify-between items-center h-12 px-5 border-b border-border'>
            <div className='text-foreground  text-md'>nathan-lunceford</div>
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
              className={`text-foreground  text-md border-b border-border pl-5 py-4 text-white hover:text-accent ${
                pathname === '/' ? 'text-accent-secondary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              _hello
            </Link>
            <Link
              href='/about-me'
              className={`text-foreground  text-md border-b border-border pl-5 py-4 text-white hover:text-accent ${
                pathname === '/about-me' ? 'text-accent-secondary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              _about-me
            </Link>
            <Link
              href='/projects'
              className={`text-foreground  text-md border-b border-border pl-5 py-4  text-white hover:text-accent ${
                pathname === '/projects' ? 'text-accent-secondary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              _projects
            </Link>
            <Link
              href='/contact-me'
              className={`text-foreground  text-md border-b border-border pl-5 py-4 text-white hover:text-accent${
                pathname === '/contact-me' ? 'text-accent-secondary' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              _contact-me
            </Link>
          </div>

          <div className='flex mt-auto items-center justify-between border-t border-border bg-background h-12 text-md pl-5'>
            {/* Left Section */}
            <div className='ml-auto border-r border-border h-full w-full flex items-center font-mono text-foreground'>
              find me on:
            </div>

            {/* Social Links */}
            <div className='flex h-full items-center '>
              {/* Twitter */}
              <Link
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center w-20 h-full border-r border-border bg-background '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='h-6 w-6 text-foreground hover:text-white transition-colors'
                >
                  <path d='M24 4.557a9.94 9.94 0 01-2.828.775A4.93 4.93 0 0023.337 3a9.874 9.874 0 01-3.127 1.194A4.916 4.916 0 0016.616 3c-2.735 0-4.952 2.224-4.952 4.961 0 .39.042.768.127 1.134C7.728 8.82 4.1 6.882 1.671 3.9a4.96 4.96 0 00-.671 2.492c0 1.719.872 3.234 2.188 4.122a4.902 4.902 0 01-2.24-.616c-.055 2.002 1.411 3.908 3.498 4.328a4.93 4.93 0 01-2.23.085c.626 1.967 2.444 3.403 4.598 3.444A9.864 9.864 0 010 19.54a13.946 13.946 0 007.548 2.213c9.142 0 14.307-7.721 14.307-14.418 0-.22-.005-.44-.014-.658A10.243 10.243 0 0024 4.557z' />
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center w-20 h-full border-r border-border bg-background '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='h-6 w-6 text-foreground hover:text-white transition-colors'
                >
                  <path d='M22.675 0H1.326C.595 0 0 .597 0 1.333v21.333C0 23.404.595 24 1.326 24h11.49v-9.333H9.896v-3.645h2.92V8.49c0-2.888 1.745-4.477 4.298-4.477 1.222 0 2.27.089 2.576.13v2.983h-1.768c-1.386 0-1.654.658-1.654 1.622v2.125h3.307l-.431 3.645h-2.876V24h5.647c.73 0 1.325-.596 1.325-1.333V1.333C24 .597 23.405 0 22.675 0z' />
                </svg>
              </Link>

              {/* GitHub */}
              <Link
                href='https://github.com/nlunce'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center w-20 h-full  bg-background'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='h-6 w-6 text-foreground hover:text-white transition-colors'
                >
                  <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.763-1.605-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.302-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.241 2.874.118 3.176.768.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.476 5.921.43.37.815 1.102.815 2.222v3.293c0 .319.218.694.825.577C20.565 22.092 24 17.593 24 12.297c0-6.627-5.373-12-12-12z' />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
