import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Muhammad Hasil - Full-Stack Developer & UI/UX Designer',
  description: 'Personal portfolio website of Muhammad Hasil, Sales Engineer, Full-Stack MERN & Next.js Engineer specializing in high-performance web applications and custom Discord bots.',
  openGraph: {
    title: 'Muhammad Hasil - Full-Stack Developer & UI/UX Designer',
    description: 'Sales Engineer, Full-Stack MERN & Next.js Developer specializing in modern web applications, MongoDB architecture, and custom Discord bots.',
    url: 'https://muhammad-hasil.vercel.app',
    siteName: 'Muhammad Hasil Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#111111] text-white selection:bg-skin selection:text-white relative">
        <Providers>
          <Navbar />
          <ThemeSwitcher />
          <main className="min-h-screen relative">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
