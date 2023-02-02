
export default async  function fetchNavKeywords({functionName,selectedNavIndex,host,keywordgroup}){
debugger
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
  
   const keywordsDataResponse =  await   fetch(url)
   const keywordsData= await keywordsDataResponse.json()
   debugger

   const { keywords } = keywordsData;

   const grouped = {};

   for (let kw of keywords) {
    try {
      
   
     const keywordIndex = kw[1];

 
      if(keywordgroup[keywordIndex]){
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
      console.log('error',error)

      
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
  return navKeywords
      
}