import Head from 'next/head'
import HomeComponent from '../../components/HomeComponent'
import getStaticCategoryPageProps from '../../assets/getStaticCategoryPageProps'
export default function CategoryPage({ data, placeholder, role ,gender}) {

  return <>
    <Head>
      <title>Kız Çocuk Marka Giyim Kategorileri | BİRARADAMODA</title>
      <meta name="description"
        content={new Date().toLocaleDateString() + " Kız Çocuk Marka Giyimleri tek yerde ara. İstediğin giyim ürünü hızlı ve anında bul. Fiyat karşılaştır. Markadan satın al."} />
    </Head>
    <HomeComponent tabValue={2} role={role} categories={data} placeholder={placeholder} gender={gender}/>
  </>

}




export async function getStaticProps(context) {
  return getStaticCategoryPageProps({ host: process.env.HOST_KC,gender:'kiz-cocuk' })
}

// export async function getStaticPaths() {

//   const paths = [{ params: { gender: 'kadin' } }, { params: { gender: 'erkek' } }, { params: { gender: 'kiz-cocuk' } }, { params: { gender: 'erkek-cocuk' } }]
//   return { paths, fallback: 'blocking' }
// }