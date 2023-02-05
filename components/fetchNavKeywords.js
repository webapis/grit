import placeholders from '../assets/placeholders.json'
export default async function fetchNavKeywords({selectedCatIndex, functionName, selectedNavIndex, host, keywordgroup }) {

  let productImgIndexes = {}
  if (selectedNavIndex !== '0-') {

    const indexes = selectedNavIndex.split('-').filter(f => f !== '')

    let indexFound = null


    for (let b in keywordgroup) {
      const currentIndex = b.split('-').filter(f => f !== '')
      indexFound = indexes.find(f => {

        return currentIndex.includes(f)
      })
     // if (indexFound) {
    
        const imageIndexesResponse = await fetch(`${host}/image-indexes/${selectedCatIndex.replace('-','')}.json`)
        productImgIndexes = await imageIndexesResponse.json()
   //   }


    }

    debugger
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

  const keywordsDataResponse = await fetch(url)
  const keywordsData = await keywordsDataResponse.json()
  debugger

  const { keywords } = keywordsData;

  const grouped = {};

  for (let kw of keywords) {
    try {


      const keywordIndex = kw[1];


      if (keywordgroup[keywordIndex]) {
        const groupName = keywordgroup[keywordIndex]["groupName"];
        const keywordType = keywordgroup[keywordIndex]['keywordType']

        if (keywordType === 'keyword') {

          const keywordTitle = keywordgroup[keywordIndex]["title"];

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

    } catch (error) {
      console.log('error', error)


    }

  }

  debugger
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
  }).filter(d => d.groupName === 'Seçenekler').map((m, a) => {
    const { groupName, keywords } = m
    return {
      groupName,
      keywords: keywords.map((m) => {


          const { keywordTitle, imageUrl: { title, src: imageSrc, marka } } = productImgIndexes[m[1]]

          const total = m[0]
          const index = m[1]
          const imageSource = placeholders[marka].imagePrefix.trim() + placeholders[marka].imageHost.trim() + imageSrc + placeholders[marka].imgPostFix
          const groupNameTitle = keywordTitle.toLowerCase() === groupName.toLowerCase() ? (keywordTitle).toLowerCase() : (keywordTitle).toLowerCase()

          return { total, index, imageSource, groupNameTitle, title, keywordTitle }
       

      })
    }

  })
  debugger
  return { navKeywords, keywordsIndexImages }

}