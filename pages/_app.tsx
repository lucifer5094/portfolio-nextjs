import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeProvider } from "@/context/ThemeContext";
import "../styles/globals.css";
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark">
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </NextThemeProvider>
  );
}
