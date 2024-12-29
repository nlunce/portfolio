/* eslint-disable */

export default function Home() {
  return (
    <section className='flex h-full md:h-auto flex-col items-start justify-center text-foreground p-10 pt-20 md:px-28 md:py-32 lg:pl-64 lg:pt-48'>
      <p className=' text-xl md:text-sm lg:text-base text-off-white'>
        Hi all. I am
      </p>

      <h1 className=' text-6xl md:text-5xl lg:text-6xl text-off-white w-[80%] '>
        Nathan Lunceford
      </h1>

      <h2 className=' w-[80%] text-accent-tertiary text-xl md:text-xl lg:text-2xl md:text-accent mt-2'>
        &gt; Full-Stack Software Engineer and Mathematician
      </h2>

      <div className='mt-48 md:mt-4 hidden md:block'>
        <p className=' text-lg md:text-base lg:text-base text-foreground'>
          // complete the game to continue
        </p>

        <p className=' text-lg md:text-base lg:text-base text-foreground'>
          // you can also see it on my GitHub page
        </p>

        <p className=' hidden md:block text-lg md:text-base lg:text-base mt-3'>
          <span className='text-accent-tertiary'>const</span>{' '}
          <span className='text-accent'>githubLink</span> ={' '}
          <a
            href='https://github.com/nlunce/url'
            target='_blank'
            rel='noopener noreferrer'
            className='text-accent-secondary hover:underline'
          >
            “https://github.com/nlunce/url”
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
            “https://github.com/nlunce”
          </a>
        </p>
      </div>
    </section>
  );
}
