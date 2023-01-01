import Head from 'next/head'
import HomeComponent from '../components/HomeComponent'

function Home({data}) {
  return <>
  <Head>
  <title>Kadın Marka Giyim Kategorileri</title>
  </Head>
    <HomeComponent categories={data}/>
  </>

}

export async function getStaticProps(context) {

  const categories = await fetch(
    `${process.env.HOST}/category-nav-counter.json`
  ).then((response) => response.json())

  const data = Object.entries(categories);

  return {
    props: {data}, // will be passed to the page component as props
  }
}



export default Home