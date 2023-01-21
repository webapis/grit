
import unicodeReplacer from "./unicodeReplacer";
export default function getSelectedNavIndex({ keywordgroup, slug }) {
    let decodedHref = "";
    let decodedHrefArr = [];
    let keywordsFromUrl = [];
    let sortedKeywords = [];
    let selectedNavIndex;

    function containsNumbers(str) {
        return /\d/.test(str);
    }

        const keywordIndexs = Object.entries(keywordgroup).map((m) => { return { index: m[0], ...m[1] } })
 
        decodedHref = unicodeReplacer(slug);

        decodedHrefArr = decodedHref
            
            .slice(1, decodedHref.length - 1)
            .map((m) => {
                const mm = containsNumbers(m) ? m : m.replace('-', ' ')
                return mm
            });
         
        keywordsFromUrl = keywordIndexs
            .filter((c) =>
                decodedHrefArr.find(
                    (f) => {
    

                        return f === c.title
                    }
                )
            )
            .map((m) => m.index.replace("-", ""));
        sortedKeywords = keywordsFromUrl
            .map((m) => parseInt(m))
            .sort((a, b) => a - b)
            .map((m) => m + "-")
            .join("");


        selectedNavIndex = keywordsFromUrl.join('-') + '-';


      debugger;
    return sortedKeywords
}