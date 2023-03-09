var TAFFY = require('taffy');


import orderData from './orderData'
import { promises as fss } from 'fs';
import path from 'path';
import { walkSync } from '../utils/walkSync'
const { productTitleMatch } = require('./productTitleMatch')
const fs = require('fs')


async function commonSearchDataHandler({ start, search, selectedNavIndex, subcategory, gender }) {

    //const allkeywords = require( path.join(process.cwd(),`${gender}/_files/nav/keywords.json`))
    const data = []
    const jsonDirectory = path.join(process.cwd(), `assets`);

    const dataRaw = await fss.readFile(jsonDirectory + `/keywords.json`, 'utf8');
    const allkeywords = JSON.parse(dataRaw)

    debugger


    const files = []//fs.readdirSync(dirPath)
    walkSync(`${process.cwd()}/${gender}/_files/data`, (filepath) => {

        files.push(filepath)

    })
    for (let filepath of files) {

        const dataRaw = fs.readFileSync(filepath, { encoding: 'utf8' })

        const dataObjectArr = JSON.parse(dataRaw)

        data.push(...dataObjectArr)
    }

    const startAt = parseInt(start) === 1 ? 0 : (parseInt(start) - 1) * 100
    console.log('startAt----', startAt)
    var products = TAFFY(data);


 
   let categorykeywords = search.split(' ').map((m)=>{

    const result = allkeywords.filter(f=>f.keywordType==='category').filter((f)=>{
        const curr =f
      
      const match =  curr.keywords.match(m)

      return match
        
    })

    return result
   }).filter(f=>f.length >0).map(m=>m.map(n=> n.keywords.split(','))).flat()




    let otherKeywords = search.split(' ').map(k=>k.toLowerCase()).filter((f)=> !categorykeywords.some(d=>d.includes(f)))

    let regexFoundKeywords =categorykeywords.map((m) => {
       if(m.length>1){
            return m.map((n,i,arr)=>{
                debugger
                if (i === 0) {
                    return '(' + n
                }
                if (i === arr.length - 1) {
                    return n + ')'
                }
                return n
            }).join('|')
        }
        else{
            return m[0]
        }
    
    })
debugger
    let regexWithoutDub = regexFoundKeywords

 console.log('regexWithoutDub',regexWithoutDub)
 console.log('otherKeywords',otherKeywords)
   console.log('permutator other',permutator(otherKeywords))
//.map((m, i, arr) => {
//     if (arr.length - 1 > i) {
//         return `(${m}.*)|`
//     }
//     return `(${m}.*)`

// }).join('') )

    const searchArr = [...otherKeywords,...regexWithoutDub].length > 0 ? permutator([...otherKeywords,...regexWithoutDub]).map(n => n.join(' ')).map((m, i, arr) => {
        if (arr.length - 1 > i) {
            return `(${m})|`
        }
        return `(${m})`

    }).join('') : search
    debugger
console.log('searchArr',searchArr)
    const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(searchArr, 'i') } }


    var filteredData = products().filter(filterBySearch).get()

    debugger
    var orderedData = orderData(filteredData)
    var orderedDb = TAFFY(orderedData)

    var d = orderedDb().start(startAt).limit(100).get()
    let count = orderedDb().count()


    return { data: d, count }
}

export default commonSearchDataHandler


const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

      
function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}
  