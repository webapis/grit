
import Products from '../../components/Products'
import getStaticPagePaths from '../../assets/getStaticProductPagePaths';
import getStaticPageProps from '../../assets/getStaticProductPageProps'

function productsPage(props) {


    const { selectedNavKeywords,groupName, selectedCat, placeholder,role, navKeywords, products, categories, functionName,keywordsIndexImages, keywordgroup, selectedNavIndex, pageNumber, pageTitle,gender } = props
    return <Products selectedNavKeywords={selectedNavKeywords} groupName={groupName} selectedCat={selectedCat}  tabValue={3} gender={gender} role={role} placeholder={placeholder} pageTitle={pageTitle} pageNumber={pageNumber} selectedNavIndex={selectedNavIndex} keywordgroup={keywordgroup}keywordsIndexImages={keywordsIndexImages} navKeywords={navKeywords} products={products} categories={categories} functionName={functionName} />
}


export async function getStaticProps(context) {

    return getStaticPageProps({context,host: process.env.HOST_EC,gender:'erkek-cocuk'})

}


export async function getStaticPaths() {

    return getStaticPagePaths({GENDER:'erkek-cocuk',host: process.env.HOST_EC})
}


export default productsPage