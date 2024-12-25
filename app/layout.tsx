import Navbar from '@/components/Navbar';
import './globals.css';

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
      <body className='bg-dark text-foreground'>
        <Navbar />
        <main className='h-full w-full'>{children}</main>
      </body>
    </html>
  );
}
