import Head from 'next/head'
import HomeComponent from '../../components/HomeComponent'
import getStaticCategoryPageProps from '../../assets/getStaticCategoryPageProps'
export default function CategoryPage({ data, placeholder, role,gender }) {

  return <>
    <Head>
      <title>Erkek Marka Giyim Kategorileri | BİRARADAMODA</title>
      <meta name="description"
        content={new Date().toLocaleDateString() + " Erkek Marka Giyimleri tek yerde ara. İstediğin giyim ürünü hızlı ve anında bul. Fiyat karşılaştır. Markadan satın al."} />
    </Head>
    <HomeComponent tabValue={1} role={role} categories={data} placeholder={placeholder}gender={gender} />
  </>

}




export async function getStaticProps(context) {
  return getStaticCategoryPageProps({ host: 'https://erkek.netlify.app',gender:'erkek' })
}

