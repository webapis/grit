

import Products from '../../components/Products'
import getStaticPagePaths from '../../assets/getStaticProductPagePaths';
import getStaticPageProps from '../../assets/getStaticProductPageProps'

function productsPage(props) {


    const { placeholder,role, navKeywords, products, categories, functionName,keywordsIndexImages, keywordgroup, selectedNavIndex, pageNumber, pageTitle,gender } = props
    return <Products tabValue={0} gender={gender} role={role} placeholder={placeholder} pageTitle={pageTitle} pageNumber={pageNumber} selectedNavIndex={selectedNavIndex} keywordgroup={keywordgroup}keywordsIndexImages={keywordsIndexImages} navKeywords={navKeywords} products={products} categories={categories} functionName={functionName} />
}


export async function getStaticProps(context) {

    return getStaticPageProps({context,host: process.env.HOST_K,gender:'kadin'})

}


export async function getStaticPaths() {

    return getStaticPagePaths({GENDER:'kadin',host: process.env.HOST_K})
}


export default productsPage