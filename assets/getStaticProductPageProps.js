

import getSelectedNavIndex from '../components/getSelectedNavIndex';
import fetchNavKeywords from '../components/fetchNavKeywords'
export default async function getStaticProductPageProps({context,host,gender}){
    const placeholder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAIQABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKAEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8IAEQgCRQGaAwEiAAIRAQMRAf/EACcAAQEAAAAAAAAAAAAAAAAAAAAIAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAACnQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAACw/9oACAEBAAE/AG1P/8QAFBEBAAAAAAAAAAAAAAAAAAAAkP/aAAgBAgEBPwBwv//EABQRAQAAAAAAAAAAAAAAAAAAAJD/2gAIAQMBAT8AcL//2Q=="
    const { params: { slug } } = context
 
    const category = slug[0]
    console.log('category-----',category)
    console.log('slug',slug[0])
debugger
    const keywordgroup = await fetch(`${host}/keywords.json`).then(
        (response) => response.json()
    );

    const categories = await fetch(`${host}/category-nav-counter.json`).then((response) => response.json())
    debugger
    if (process.env.ROLE === 'USER') {
        delete categories['diger']
    }
    const data = Object.values(categories).flat(2);
    const selectedCat = data.find(f => f.groupName.toLowerCase() === category.toLowerCase())
    debugger
    const functionName = selectedCat.functionName
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
    if (category === 'diger') {
        selectedNavIndex = '0-'
    } else {
        selectedNavIndex = getSelectedNavIndex({ keywordgroup, slug })
    }
    debugger
    var url = `${host}/.netlify/functions/${fnName}/?start=${pageNumber}&selectedNavIndex=${selectedNavIndex}&search=`;
    const response = await fetch(url);
    const products = await response.json()
    let navKeywords = []
    if (selectedNavIndex) {
        navKeywords = await fetchNavKeywords({
            functionName,
            selectedNavIndex,
            host,
            keywordgroup,
        });
        debugger;
    }
    const pageTitle = `Kadın ${slug.slice(0, slug.indexOf('sayfa')).join(' ').replace(/-/g, ' ')}`
    return {
        props: {gender,role:process.env.ROLE, placeholder, navKeywords, products, categories, functionName, keywordgroup, selectedNavIndex, pageNumber: parseInt(pageNumber), pageTitle }, // will be passed to the page component as props
        revalidate: 60
    }
}