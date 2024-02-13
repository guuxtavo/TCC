import { Providers } from '@/providers/providers';
import '@/styles/globals.css'
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
  description: 'Tela de Login',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-br" >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
