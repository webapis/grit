import Script from 'next/script'
import ScrollButton from './ScrollToTopBtn'
export default function Layout({children,title}){

    return <div >
		<Script   onLoad={() => {
          console.log('Script has loaded ads')
        }}  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1960990522971470"
		crossorigin="anonymous"/>


		<Script   onLoad={() => {
          console.log('Script has loaded analitics')
        }} id="show-banner">{`(function (w, d, s, l, i) {
			w[l] = w[l] || []; w[l].push({
			  'gtm.start':
				new Date().getTime(), event: 'gtm.js'
			}); var f = d.getElementsByTagName(s)[0],
			  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
				'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
		  })(window, document, 'script', 'dataLayer', 'GTM-MMJQR6C')`}</Script>
        {children}

		<div style={{position:"relative"}}>
				<ScrollButton/>
			</div>
    </div>

}