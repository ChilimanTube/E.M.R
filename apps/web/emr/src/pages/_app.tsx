import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic';
import { createTheme, ColorSchemeScript } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const MantineProvider = dynamic(
  () => import('@mantine/core').then((mod) => mod.MantineProvider),
  { ssr: false }  // This line will disable server-side rendering for MantineProvider
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <Component {...pageProps} />
    </MantineProvider>
  );
}