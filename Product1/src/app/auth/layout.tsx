import { Poppins } from 'next/font/google';
import '@/styles/globals.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      <ToastContainer />

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}
