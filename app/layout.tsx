import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';
import InteractiveCanvas from '@/components/InteractiveCanvas';

export const metadata = {
  title: 'Portfolio',
  description: 'Showcasing software and math skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-dark text-foreground flex flex-col min-h-screen relative'>
        {/* Navbar (no canvas effect underneath) */}
        <div className='relative z-10'>
          <Navbar />
        </div>

        {/* Interactive Canvas */}
        <div className='absolute top-[64px] left-0 w-full h-[calc(100%-64px)] -z-10'>
          {/* Adjust top offset to match Navbar height */}
          <InteractiveCanvas />
        </div>

        {/* Main content */}
        <main className='flex-grow'>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
