import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['500', '400', '900'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return <MantineProvider
    theme={{
      fontFamily: poppins.style.fontFamily,
      colorScheme: 'dark'
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    <Component {...pageProps} />
  </MantineProvider>;
}

export default MyApp;
