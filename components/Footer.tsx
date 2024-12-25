'use client';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='flex items-center justify-between border-t border-border bg-background h-12 text-sm font-mono px-6'>
      {/* Left Section */}
      <div className='flex items-center gap-4 border-r pr-6 h-full border-border'>
        <span>find me on:</span>
        <Link
          href='https://twitter.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
            width='16'
            height='16'
            className='hover:scale-110 transition-transform'
          >
            <path d='M24 4.557a9.94 9.94 0 01-2.828.775A4.93 4.93 0 0023.337 3a9.874 9.874 0 01-3.127 1.194A4.916 4.916 0 0016.616 3c-2.735 0-4.952 2.224-4.952 4.961 0 .39.042.768.127 1.134C7.728 8.82 4.1 6.882 1.671 3.9a4.96 4.96 0 00-.671 2.492c0 1.719.872 3.234 2.188 4.122a4.902 4.902 0 01-2.24-.616c-.055 2.002 1.411 3.908 3.498 4.328a4.93 4.93 0 01-2.23.085c.626 1.967 2.444 3.403 4.598 3.444A9.864 9.864 0 010 19.54a13.946 13.946 0 007.548 2.213c9.142 0 14.307-7.721 14.307-14.418 0-.22-.005-.44-.014-.658A10.243 10.243 0 0024 4.557z' />
          </svg>
        </Link>
        <Link
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
            width='16'
            height='16'
            className='hover:scale-110 transition-transform'
          >
            <path d='M22.675 0H1.326C.595 0 0 .597 0 1.333v21.333C0 23.404.595 24 1.326 24h11.49v-9.333H9.896v-3.645h2.92V8.49c0-2.888 1.745-4.477 4.298-4.477 1.222 0 2.27.089 2.576.13v2.983h-1.768c-1.386 0-1.654.658-1.654 1.622v2.125h3.307l-.431 3.645h-2.876V24h5.647c.73 0 1.325-.596 1.325-1.333V1.333C24 .597 23.405 0 22.675 0z' />
          </svg>
        </Link>
      </div>

      {/* Right Section */}
      <div className='flex items-center h-full pl-6 border-l border-border'>
        <Link
          href='https://github.com/nlunce'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center hover:scale-110 transition-transform hover:text-white'
        >
          {/* GitHub Text */}
          <span>@nlunce</span>

          {/* GitHub Icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
            width='16'
            height='16'
            className='ml-2' // Add spacing between the text and the icon
          >
            <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.763-1.605-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.302-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.241 2.874.118 3.176.768.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.476 5.921.43.37.815 1.102.815 2.222v3.293c0 .319.218.694.825.577C20.565 22.092 24 17.593 24 12.297c0-6.627-5.373-12-12-12z' />
          </svg>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
