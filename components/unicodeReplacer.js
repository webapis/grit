export default function unicodeReplacer(array) {


    // str.  replace(/ö/g, "o")
    // .replace(/ş/g, "s")
    // .replace(/ı/g, "i")
    // .replace(/ç/g, "c")
    // .replace(/ğ/g, "g")  

    // return array.map(m => m.replace(/%C3%A7/g, "ç").replace(/%C3%B6/g, "ö")
    //     .replace(/%C5%9F/g, "ş")
    //     .replace(/%C3%BC/g, "ü")
    //     .replace(/%C4%B1/g, "ı")
    //     .replace(/%C4%9F/g, "ğ"))
      return array.map(m => decodeURI( m).replace('_',' '))

}