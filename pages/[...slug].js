
import getSelectedNavIndex from '../components/getSelectedNavIndex';
import fetchNavKeywords from '../components/fetchNavKeywords'
import { useRouter } from 'next/router';
import Products from '../components/Products'

function productsPage(props) {
    const {placeholder,navKeywords,products,categories,functionName,keywordgroup,selectedNavIndex,pageNumber,pageTitle} =props
    const router = useRouter();

    // console.log(router.pathname);
    // console.log(router.query);
    // console.log('props.....', props)
  
        return <Products placeholder={placeholder} pageTitle={pageTitle} pageNumber={pageNumber} selectedNavIndex={selectedNavIndex}  keywordgroup={keywordgroup} navKeywords={navKeywords} products={products} categories={categories} functionName={functionName}/>
  

}


export async function getStaticProps(context) {
    const placeholder ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAIQABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKAEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8IAEQgCRQGaAwEiAAIRAQMRAf/EACcAAQEAAAAAAAAAAAAAAAAAAAAIAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAACnQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAACw/9oACAEBAAE/AG1P/8QAFBEBAAAAAAAAAAAAAAAAAAAAkP/aAAgBAgEBPwBwv//EABQRAQAAAAAAAAAAAAAAAAAAAJD/2gAIAQMBAT8AcL//2Q=="
    const { params: { slug } } = context
    const category = slug[1]
    debugger
    const keywordgroup = await fetch(`${process.env.HOST}/keywords.json`).then(
        (response) => response.json()
    );
    debugger
    const categories = await fetch(
        `${process.env.HOST}/category-nav-counter.json`
    ).then((response) => response.json())
    debugger
    const data = Object.values(categories).flat(2);
    const selectedCat = data.find(f => f.title === category)
    const functionName = selectedCat.functionName
    const fnName = functionName
        .replace(/ö/g, "o")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g");
    const host = process.env.SERVERLESS
    const pageNumber = slug[slug.length - 1].toString()
    const selectedNavIndex = getSelectedNavIndex({ keywordgroup, slug })
    var url = `${host}/.netlify/functions/${fnName}/?start=${pageNumber}&selectedNavIndex=${selectedNavIndex}&search=`;
    const response = await fetch(url);
    const products = await response.json()
    let navKeywords =[]
    if (selectedNavIndex) {
        navKeywords = await fetchNavKeywords({
          functionName,
          selectedNavIndex,
          host,
          keywordgroup,
        });
        debugger;
      }
     const pageTitle =`Kadın ${slug.slice(0,slug.indexOf('sayfa')).join(' ').replace(/-/g,' ')}`
    return {
        props: {placeholder,navKeywords,products,categories,functionName,keywordgroup,selectedNavIndex,pageNumber:parseInt(pageNumber),pageTitle}, // will be passed to the page component as props
        revalidate: 60
    }
}


export async function getStaticPaths() {

    const categories = await fetch(
        `${process.env.HOST}/category-nav-counter.json`
    ).then((response) => response.json())

    const data = Object.values(categories).flat().filter(f=>f.title !=='fantazi' && f.title!=='diger');

    const paths = data.map(m => {
        return { params: { slug: [m.groupName.toLowerCase().replace(' ', '-'), m.title,'sayfa', '1'] } }

    })

    return { paths, fallback:'blocking' }
}




export default productsPage