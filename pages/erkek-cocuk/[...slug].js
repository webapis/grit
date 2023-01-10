
import Products from '../../components/Products'
import getStaticPagePaths from '../../assets/getStaticProductPagePaths';
import getStaticPageProps from '../../assets/getStaticProductPageProps'

function productsPage(props) {


    const { placeholder,role, navKeywords, products, categories, functionName, keywordgroup, selectedNavIndex, pageNumber, pageTitle,gender } = props
    return <Products tabValue={3} gender={gender} role={role} placeholder={placeholder} pageTitle={pageTitle} pageNumber={pageNumber} selectedNavIndex={selectedNavIndex} keywordgroup={keywordgroup} navKeywords={navKeywords} products={products} categories={categories} functionName={functionName} />
}


export async function getStaticProps(context) {

    return getStaticPageProps({context,host: 'https://erkek-cocuk.netlify.app',gender:'erkek-cocuk'})

}


export async function getStaticPaths() {

    return getStaticPagePaths({GENDER:'erkek-cocuk',host: 'https://erkek-cocuk.netlify.app'})
}


export default productsPage