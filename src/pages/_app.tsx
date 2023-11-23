import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/index.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script strategy="beforeInteractive" src="/theme-toggler.js" />
    </>
  );
}
