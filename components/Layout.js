
import ScrollButton from './ScrollToTopBtn'

export default function Layout({ children }) {

	return <div >



		
		{children}

		<div style={{ position: "relative" }}>
			<ScrollButton />
		</div>

	</div>

}