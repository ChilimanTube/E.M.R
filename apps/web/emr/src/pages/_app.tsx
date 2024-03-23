import '@mantine/core/styles.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
 
});

//TODO: Sort the white theme
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme='dark' forceColorScheme='dark'>
      <Component {...pageProps} />
    </MantineProvider>
  );
}