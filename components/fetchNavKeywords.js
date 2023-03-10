import placeholders from '../assets/placeholders.json'
import { promises as fs } from 'fs';
import path from 'path';
import commonNavHandler  from '../assets/commonNavHandler'
export default async function fetchNavKeywords({ selectedCatIndex, functionName, selectedNavIndex, host, keywordgroup, gender }) {

  const jsonDirectory = path.join(process.cwd(), gender);
  //Read the json data file data.json

  let productImgIndexes=[]

    const productImgIndexesRaw = await fs.readFile(jsonDirectory + `/image-indexes/${selectedCatIndex.replace('-', '')}.json`, 'utf8')
    
     productImgIndexes = JSON.parse(productImgIndexesRaw)

  

  if (selectedNavIndex !== '0-') {

    const indexes = selectedNavIndex.split('-').filter(f => f !== '')

    let indexFound = null


    for (let b in keywordgroup) {
      const currentIndex = b.split('-').filter(f => f !== '')
      indexFound = indexes.find(f => {

        return currentIndex.includes(f)
      })
    }



  } else {

  }
  let url;

  var fnName = functionName
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g");
  // fetch navKeywords
  const fn = parseInt(selectedNavIndex.replace(/-/g, "").trim()) % 2;

  if (fn === 1) {
    url = `${host}/.netlify/functions/${fnName}-navsecond?navindex=${selectedNavIndex}`;
  } else {
    url = `${host}/.netlify/functions/${fnName}-navfirst?navindex=${selectedNavIndex}`;
  }

  const keywordsData = await commonNavHandler({subcategory:fnName,gender,navindex:selectedNavIndex,keyOrder:fn})
  
  //const keywordsData = await keywordsDataResponse.json()


  const { keywords } = keywordsData;

  const grouped = {};

  for (let kw of keywords) {



      const keywordIndex = kw[1];
    const matchFound =keywordgroup.find(f=>f.index===keywordIndex.replace('-',''))

      if (matchFound) {
        const groupName = matchFound.groupName;
        const keywordType = matchFound.keywordType

        if (keywordType === 'keyword') {

          const keywordTitle = matchFound["title"];

          const keywordWithTitle = [...kw, keywordTitle];

          if (grouped[groupName] === undefined) {
            grouped[groupName] = { keywords: [keywordWithTitle] };
          } else {
            grouped[groupName].keywords = [
              ...grouped[groupName].keywords,
              keywordWithTitle,
            ];
          }

        }
      }



  }


  const navKeywords = Object.entries(grouped)
    .map((m) => {
      return { groupName: m[0], keywords: m[1].keywords };
    })
    .sort(function (a, b) {
      var textA = a.groupName;
      var textB = b.groupName;

      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });


  const keywordsIndexImages = navKeywords.sort(function (a, b) {
    const akeywords = a['keywords']
    const bkeywords = b['keywords']

    return bkeywords.length - akeywords.length;

  }).filter(d => d.groupName !== 'Dış giyim' && d.groupName !== 'Alt giyim' && d.groupName !== 'Ev giyim' && d.groupName !== 'İç giyim' && d.groupName !== 'Üst giyim' ).map((m, a) => {
    const { groupName, keywords } = m
    return {
      groupName,
      keywords: keywords.map((m) => {

        if (productImgIndexes[m[1]] !== undefined) {
          const { keywordTitle, imageUrl: { title, src: imageSrc, marka } } = productImgIndexes[m[1]]

          const total = m[0]
          const index = m[1]
          const imageSource = placeholders[marka].imagePrefix.trim() + placeholders[marka].imageHost.trim() + imageSrc + placeholders[marka].imgPostFix
          const groupNameTitle = keywordTitle.toLowerCase() === groupName.toLowerCase() ? (keywordTitle).toLowerCase() : (keywordTitle).toLowerCase()

          return { total, index, imageSource, groupNameTitle, title, keywordTitle }
        } else {
          return null
        }

      }).filter(f => f !== null)
    }

  })

  return { navKeywords, keywordsIndexImages }

}