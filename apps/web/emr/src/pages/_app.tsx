import '@mantine/core/styles.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/charts/styles.css';

const theme = createTheme({
 colors: {
   white: ['#fff', '#707070', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
 },
});

//TODO: Sort the white theme
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme='dark' forceColorScheme='dark'>
      <Component {...pageProps} />
    </MantineProvider>
  );
}