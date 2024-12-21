'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='flex space-between border-b border-border'>
      {/* Name and Navigation Link Section */}

      <div className='flex items-center h-12 bg-dark pl-6 w-full relative border-r-[1px] border-r-border'>
        <div className='text-foreground flex items-center font-mono text-sm w-64 border-r-[1px] border-border h-full'>
          nathan-lunceford
        </div>
        <div className='relative flex items-center h-full px-6 border-r-[1px] border-r-border'>
          <Link
            href='/'
            className={`text-foreground text-sm font-mono hover:text-accent transition ${
              pathname === '/' ? 'text-white' : ''
            }`}
          >
            _hello
          </Link>
          {pathname === '/' && (
            <span className='absolute -bottom-[2px] left-0 w-full h-[2px] bg-accent-secondary rounded-md' />
          )}
        </div>
        <div className='relative flex items-center h-full px-6 border-r-[1px] border-r-border'>
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
        <div className='relative flex items-center h-full px-6 border-r-[1px] border-r-border'>
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

      <div className='relative flex items-center justify-center h-12 px-6 border-border whitespace-nowrap'>
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
    </nav>
  );
};

export default Navbar;
