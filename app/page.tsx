/* eslint-disable */

import SnakeGame from '@/components/SnakeGame';

export default function Home() {
  return (
    <div className='flex h-full'>
      {/* Left side - Hero content */}
      <section className='flex h-full md:h-auto flex-col items-start justify-center text-foreground p-10 pt-20 md:px-28 md:py-32 lg:pl-64 lg:pt-12 flex-1'>
        <p className=' text-xl md:text-sm lg:text-base text-off-white'>
          Hi all. I am
        </p>

        <h1 className=' text-6xl md:text-5xl lg:text-6xl text-off-white whitespace-nowrap'>
          Nathan Lunceford
        </h1>

        <h2 className=' w-[80%] text-accent-tertiary text-xl md:text-xl lg:text-2xl md:text-accent mt-2 mb-8'>
          &gt; Full-Stack Software Engineer and Mathematician
        </h2>

        <div className='md:mt-4 hidden md:block'>
          <p className=' text-lg md:text-base lg:text-base text-foreground'>
            {'// beat the high score in snake'}
          </p>

          <p className=' text-lg md:text-base lg:text-base text-foreground'>
            {'// find my other work on GitHub'}
          </p>

          <p className=' hidden md:block text-lg md:text-base lg:text-base mt-3'>
            <span className='text-accent-tertiary'>const</span>{' '}
            <span className='text-accent'>githubLink</span> ={' '}
            <a
              href='https://github.com/nlunce'
              target='_blank'
              rel='noopener noreferrer'
              className='text-accent-secondary hover:underline'
            >
              "https://github.com/nlunce"
            </a>
          </p>
        </div>
        <div className='mt-auto block md:hidden pb-36'>
          <p className=' text-lg md:text-base lg:text-base text-foreground'>
            // find my profile on Github:
          </p>

          <p className=' text-lg md:text-base lg:text-base mt-3'>
            <span className='text-accent-tertiary'>const</span>{' '}
            <span className='text-accent'>githubLink</span> ={' '}
            <a
              href='https://github.com/nlunce/url'
              target='_blank'
              rel='noopener noreferrer'
              className='text-accent-secondary hover:underline'
            >
              "https://github.com/nlunce"
            </a>
          </p>
        </div>
      </section>

      {/* Right side - Snake game */}
      <div className='hidden lg:flex items-center justify-center p-16 flex-1'>
        <SnakeGame />
      </div>
    </div>
  );
}
