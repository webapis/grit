import Head from 'next/head'
import HomeComponent from '../../components/HomeComponent'
import getStaticCategoryPageProps from '../../assets/getStaticCategoryPageProps'
export default function CategoryPage({ data, placeholder, role,gender }) {

  return <>
    <Head>
      <title>Erkek Çocuk Marka Giyim Kategorileri</title>
      <meta name="description"
        content={new Date().toLocaleDateString() + " Moda markaları tek yerde ara. İstediğin giyim ürünü hızlı ve anında bul. Fiyat karşılaştır. Markadan satın al."} />
    </Head>
    <HomeComponent role={role} categories={data} placeholder={placeholder} gender={gender} />
  </>

}




export async function getStaticProps(context) {
  return getStaticCategoryPageProps({ host: 'https://erkek-cocuk.netlify.app',gender:'erkek-cocuk' })
}

// export async function getStaticPaths() {

//   const paths = [{ params: { gender: 'kadin' } }, { params: { gender: 'erkek' } }, { params: { gender: 'kiz-cocuk' } }, { params: { gender: 'erkek-cocuk' } }]
//   return { paths, fallback: 'blocking' }
// }