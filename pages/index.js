
import HomeComponent from '../components/HomeComponent'

function Home({data}) {
  return <>
    <HomeComponent categories={data}/>
  </>

}

export async function getStaticProps(context) {

  const categories = await fetch(
    `${process.env.HOST}/category-nav-counter.json`
  ).then((response) => response.json())
  debugger
  const data = Object.entries(categories);
  debugger
  return {
    props: {data}, // will be passed to the page component as props
  }
}



export default Home