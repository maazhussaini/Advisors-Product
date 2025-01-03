import { Poppins } from 'next/font/google';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}
