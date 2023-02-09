
import { promises as fs } from 'fs';
import path from 'path';
var TAFFY = require('taffy');
async function commonNavHandler({ subcategory, keyOrder, navindex, gender }) {
    
console.log('navindex',navindex)
debugger
    const jsonDirectory = path.join(process.cwd(), `${gender}/_files/key/${subcategory}`);
    
    const dataRaw = await fs.readFile(jsonDirectory + `/${keyOrder}-keywords.json`, 'utf8');
    const data = JSON.parse(dataRaw)
    var navkeywords = TAFFY(data);


    console.log('navindex', navindex)

    debugger
    const { k } = navkeywords().filter({ i: navindex }).get()[0]

    debugger
    return { keywords: k }

}

export default commonNavHandler 