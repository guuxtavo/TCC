import './globals.css';
import type { Metadata } from 'next';
// import { Poppins } from 'next/font/google';

// const mainFontFamily = Poppins(
//   {
//     weight: ['300', '400', '500', '700'],
//     subsets: ['latin'],
//   }
// );

export const metadata: Metadata = {
  title: 'Login',
  description: 'Tela para realizar o login',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-br" >
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
