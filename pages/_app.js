import '../styles/globals.css'
import Script from 'next/script'
import Layout from '../components/Layout'


import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
const clientSideEmotionCache = createEmotionCache();
export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache, }) {

  return <CacheProvider value={emotionCache}>
    <Script strategy="beforeInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1960990522971470" crossorigin="anonymous" />
    <Script strategy="beforeInteractive" src="/adapter.js" />
    <Script strategy="beforeInteractive" src="/intersection-observer.js" />
    <Script strategy="beforeInteractive" onLoad={() => {
      console.log('Script has loaded analitics')
    }} id="show-banner">{`(function (w, d, s, l, i) {
			w[l] = w[l] || []; w[l].push({
			  'gtm.start':
				new Date().getTime(), event: 'gtm.js'
			}); var f = d.getElementsByTagName(s)[0],
			  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
				'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
		  })(window, document, 'script', 'dataLayer', 'GTM-MMJQR6C')`}</Script>
    <ThemeProvider theme={theme}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </CacheProvider>
}
