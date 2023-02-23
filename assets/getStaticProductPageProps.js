

import getSelectedNavIndex from '../components/getSelectedNavIndex';
import fetchNavKeywords from '../components/fetchNavKeywords'
import commonDataHandler from './commonDataHandler'


import { promises as fs } from 'fs';
import path from 'path';
export default async function getStaticProductPageProps({ context, host, gender }) {

    const placeholder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAIQABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKAEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8IAEQgCRQGaAwEiAAIRAQMRAf/EACcAAQEAAAAAAAAAAAAAAAAAAAAIAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAACnQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAACw/9oACAEBAAE/AG1P/8QAFBEBAAAAAAAAAAAAAAAAAAAAkP/aAAgBAgEBPwBwv//EABQRAQAAAAAAAAAAAAAAAAAAAJD/2gAIAQMBAT8AcL//2Q=="
    const { params: { slug } } = context

    const groupName = slug[0].replace('-', ' ')

    const jsonDirectory = path.join(process.cwd(), gender);
    const keywordsDirectory = path.join(process.cwd(), `assets`);

    const categoriesRaw = await fs.readFile(jsonDirectory + '/category-nav-counter.json', 'utf8');
    const keywordgroupRaw = await fs.readFile(keywordsDirectory + '/keywords.json', 'utf8');

    const categories = JSON.parse(categoriesRaw)
    const keywordgroup = JSON.parse(keywordgroupRaw)

    const keywordsArray = keywordgroup

    const selectedCat = slug[1]

    console.log('selectedCat', selectedCat)
    let selectedCatIndex = keywordsArray.find(f => f.title === selectedCat).index
 

    // const responseCat = await fetch(`${host}/category-nav-counter.json`,{ next: { revalidate: 3600 } })
    // const categories = await responseCat.json()

    if (process.env.ROLE === 'USER') {
        delete categories['diger']
    }
    const data = Object.values(categories).flat(2);
    const selectedGroup = data.find(f => f.groupName.toLowerCase() === groupName.toLowerCase())

    const functionName = selectedGroup ? selectedGroup.functionName : ''
    const fnName = functionName
        .replace(/ö/g, "o")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g");
    //const host = process.env.SERVERLESS
    const pageNumber = slug[slug.length - 1].toString()

    let selectedNavIndex = ''
    if (groupName === 'diger') {
        selectedNavIndex = '0-'
    } else {
        selectedNavIndex = getSelectedNavIndex({ keywordgroup, slug })
     
    }
    let selectedNavKeywords = ''
    let selectedNavIndexArr = selectedNavIndex.split('-').filter(f => f !== '')

    if (selectedNavIndex.length > 2 && selectedNavIndexArr && selectedNavIndexArr.length > 0) {

        selectedNavKeywords = keywordsArray.filter(f => selectedNavIndexArr.find(d => { return d === f.index.replace('-', '') }))
            .map(m => {

                return m.keywords
            }).reduce((p, c, i, arr) => {

                return [...p, c.split(',')]
            }, []).flat(1)

    }

   // var url = `${host}/.netlify/functions/${fnName}/?start=${pageNumber}&selectedNavIndex=${selectedNavIndex}&search=`;

    let products = []
    try {
        products = await commonDataHandler({ start: pageNumber, search: '', subcategory: fnName, selectedNavIndex, gender })


    } catch (error) {
        console.log('product fetch error', error)
    }

    let navKeywords = []
    let keywordsIndexImages = []

    if (selectedNavIndex !== '-') {
        try {
            const navKeywordsResponse = await fetchNavKeywords({
                functionName,
                selectedNavIndex,
                host,
                keywordgroup,
                selectedCatIndex,
                gender
            });

            navKeywords = navKeywordsResponse.navKeywords
            keywordsIndexImages = navKeywordsResponse.keywordsIndexImages
       
            debugger
                ;
        } catch (error) {
            console.log('fetchNavKeywords error', error)
        }

    }
    const pageTitle = `${gender} ${slug.slice(0, slug.indexOf('sayfa')).join(' ').replace(/-/g, ' ')}`





    return {
        props: { selectedNavKeywords, groupName: groupName.replace(' ', '-'), selectedCat, gender, role: process.env.ROLE, placeholder, navKeywords, keywordsIndexImages, products, categories, functionName, keywordgroup, selectedNavIndex, pageNumber: parseInt(pageNumber), pageTitle }, // will be passed to the page component as props
        revalidate: 60
    }
}

