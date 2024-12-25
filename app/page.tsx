export default function Home() {
  return (
    <section className='flex flex-col items-start justify-center text-foreground px-6 md:px-12 lg:pl-64 lg:pt-48'>
      {/* Greeting */}
      <p className='font-mono text-xs sm:text-sm lg:text-base text-foreground'>
        Hi all. I am
      </p>

      {/* Name */}
      <h1 className='font-mono text-3xl sm:text-5xl lg:text-6xl text-white mt-2'>
        Nathan Lunceford
      </h1>

      {/* Title */}
      <h2 className='font-mono text-base sm:text-xl lg:text-2xl text-accent mt-2'>
        &gt; Software Developer and Mathematician
      </h2>

      {/* Instructions */}
      <div className='mt-4'>
        <p className='font-mono text-xs sm:text-sm lg:text-base text-foreground'>
          // complete the game to continue
        </p>
        <p className='font-mono text-xs sm:text-sm lg:text-base text-foreground'>
          // you can also see it on my GitHub page
        </p>

        {/* GitHub Link */}
        <p className='font-mono text-xs sm:text-sm lg:text-base mt-3'>
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
    </section>
  );
}
