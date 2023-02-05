

import getSelectedNavIndex from '../components/getSelectedNavIndex';
import fetchNavKeywords from '../components/fetchNavKeywords'
export default async function getStaticProductPageProps({ context, host, gender }) {

    const placeholder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAIQABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKAEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8IAEQgCRQGaAwEiAAIRAQMRAf/EACcAAQEAAAAAAAAAAAAAAAAAAAAIAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAACnQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAACw/9oACAEBAAE/AG1P/8QAFBEBAAAAAAAAAAAAAAAAAAAAkP/aAAgBAgEBPwBwv//EABQRAQAAAAAAAAAAAAAAAAAAAJD/2gAIAQMBAT8AcL//2Q=="
    const { params: { slug } } = context

    const groupName = slug[0].replace('-', ' ')


    const keywordgroupResponse = await fetch(`${host}/keywords.json`)
    const keywordgroup = await keywordgroupResponse.json()
    const keywordsArray = Object.entries(keywordgroup)
    debugger
    const selectedCat=slug[1]

console.log('selectedCat',selectedCat)
let  selectedCatIndex =keywordsArray.find(f=> f[1].title ===selectedCat)[0]

debugger
    const responseCat = await fetch(`${host}/category-nav-counter.json`)
    const categories = await responseCat.json()
    debugger
    if (process.env.ROLE === 'USER') {
        delete categories['diger']
    }
    const data = Object.values(categories).flat(2);
    const selectedGroup = data.find(f => f.groupName.toLowerCase() === groupName.toLowerCase())
    debugger
    const functionName = selectedGroup ? selectedGroup.functionName : ''
    const fnName = functionName
        .replace(/ö/g, "o")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g");
    //const host = process.env.SERVERLESS
    const pageNumber = slug[slug.length - 1].toString()
    debugger
    let selectedNavIndex = ''
    if (groupName === 'diger') {
        selectedNavIndex = '0-'
    } else {
        selectedNavIndex = getSelectedNavIndex({ keywordgroup, slug })
    }
    let selectedNavKeywords=''
    let selectedNavIndexArr =selectedNavIndex.split('-').filter(f=>f!=='')
    debugger
    if(selectedNavIndex.length>2 && selectedNavIndexArr.length>0){
        selectedNavKeywords =keywordsArray.filter(f=>selectedNavIndexArr.find(d=>d===f[0].replace('-','')) ).map(m=>m[1].keywords).reduce((p,c,i)=>[...p,c.split(',')],[]).flat(1)
        debugger
    }
   
    var url = `${host}/.netlify/functions/${fnName}/?start=${pageNumber}&selectedNavIndex=${selectedNavIndex}&search=`;

    let products = []
    try {
        const response = await fetch(url);
        products = await response.json()
    } catch (error) {
        console.log('product fetch error', error)
    }

    let navKeywords = []
    let keywordsIndexImages = []
    if (selectedNavIndex !== '-') {
        try {
         const  navKeywordsResponse = await fetchNavKeywords({
                functionName,
                selectedNavIndex,
                host,
                keywordgroup,
                selectedCatIndex
            });

            navKeywords = navKeywordsResponse.navKeywords
            keywordsIndexImages = navKeywordsResponse.keywordsIndexImages

            debugger;
        } catch (error) {
            console.log('fetchNavKeywords error', error)
        }

    }
    const pageTitle = `Kadın ${slug.slice(0, slug.indexOf('sayfa')).join(' ').replace(/-/g, ' ')}`
    debugger
  console.log('groupName',groupName)
debugger
  //const reducedData = 
  if(keywordsIndexImages.length>0){
    const kwds =keywordsIndexImages[0].keywords
    kwds.forEach(k=>{
      const random = getRandomArbitrary(2, products.data.length)
      debugger
      products.data.splice(random,0,k)
        
    })
  }

debugger
    return {
        props: {selectedNavKeywords,groupName:groupName.replace(' ','-'),selectedCat, gender, role: process.env.ROLE, placeholder, navKeywords, keywordsIndexImages, products, categories, functionName, keywordgroup, selectedNavIndex, pageNumber: parseInt(pageNumber), pageTitle }, // will be passed to the page component as props
        revalidate: 60
    }
}

function getRandomArbitrary(min, max) {
    return Math.ceil( Math.random() * (max - min) + min);
}