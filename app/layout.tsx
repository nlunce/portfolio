import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';
import InteractiveCanvas from '@/components/InteractiveCanvas';
import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

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
    <html lang='en' className={firaCode.className}>
      <body className='bg-dark text-foreground flex flex-col min-h-screen'>
        {/* Navbar */}
        <div className='z-10'>
          <Navbar />
        </div>

        {/* Main Content with Interactive Canvas */}
        <div className='relative flex-grow flex'>
          {/* Interactive Canvas */}
          <div className='absolute inset-0 -z-10'>
            <InteractiveCanvas />
          </div>

          {/* Main Content */}
          <main className='flex-grow'>{children}</main>
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
