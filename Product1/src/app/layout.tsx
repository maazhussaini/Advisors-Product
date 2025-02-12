import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import StoreProvider from '@/lib/Provider/StoreProvider';
import { SideNav } from '@/common/components/SideNav';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Next Redux Typescript Tailwind',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex min-h-screen">
        <StoreProvider>
          {/* Sidebar */}
          <aside className="w-64 h-screen text-white fixed">
            <SideNav />
          </aside>

          {/* Main content */}
          <main className="ml-64 flex-1 p-4">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
