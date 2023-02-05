
import ScrollButton from './ScrollToTopBtn'
import { useEffect } from 'react'
export default function Layout({ children }) {

	// useEffect(() => {

	// 	function handleScroll() {

	// 	}


	// 	var prevScrollpos = window.pageYOffset;
	// 	window.addEventListener('scroll', () => {
	
	// 	  var currentScrollPos = window.pageYOffset;
	// 		if (prevScrollpos > currentScrollPos) {
	// 			document.getElementById("bread-crumb").style.top = "400px";
	// 			document.getElementById('bread-crumb').style.visibility = "visible"
		
		
		
		
	// 		  } else {
		
	// 			document.getElementById("bread-crumb").style.top = "-260px";
	// 			document.getElementById('bread-crumb').style.visibility = "hidden"
		
		
		
	// 		  }

	// 	})

	// },[])
	return <div >




		{children}

		<div style={{ position: "relative" }}>
			<ScrollButton />
		</div>

	</div>

}