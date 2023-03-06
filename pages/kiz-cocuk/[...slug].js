

import Products from '../../components/Products'
import getStaticPagePaths from '../../assets/getStaticProductPagePaths';
import getStaticPageProps from '../../assets/getStaticProductPageProps'

function productsPage(props) {

    const { selectedNavKeywords,groupName, selectedCat, placeholder,role, navKeywords, products, categories, functionName,keywordsIndexImages, keywordgroup, selectedNavIndex, pageNumber, pageTitle,gender } = props
    return <Products selectedNavKeywords={selectedNavKeywords} groupName={groupName} selectedCat={selectedCat}  tabValue={2} gender={gender} role={role} placeholder={placeholder} pageTitle={pageTitle} pageNumber={pageNumber} selectedNavIndex={selectedNavIndex} keywordgroup={keywordgroup}keywordsIndexImages={keywordsIndexImages} navKeywords={navKeywords} products={products} categories={categories} functionName={functionName} />
}


export async function getStaticProps(context) {

    return getStaticPageProps({context,host: process.env.HOST_KC,gender:'kiz-cocuk'})

}


export async function getStaticPaths() {

    return getStaticPagePaths({GENDER:'kiz-cocuk',host: process.env.HOST_KC})
}


export default productsPage