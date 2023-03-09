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
    //const dirPath = path.join(`./api/_files/data/${subcategory}`)
    const cr = process.cwd()

    const dirPath = `${process.cwd()}/${gender}/_files/data`

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

    const filterByKeyword = selectedNavIndex === '' ? function () { return true } : function filterByKeyword() {

        let splittedKeywordsIndex = selectedNavIndex.split('-').filter(f => f !== '')
        let foundkeywords = allkeywords.filter(function (f) {
            const includes = splittedKeywordsIndex.includes(f.index)
            return includes
        })


        const title = this.title
        const priceNew = this.priceNew

        const match = foundkeywords.filter(kws => {

            let negwords = kws.exclude
            let exactmatch = kws.exactmatch
            let groupName = kws.groupName
            let index = parseInt(kws.index.replace('-', ''))
            if (groupName === 'Fiyat') {


                const priceRange = kws.keywords.split('-').map(m => parseInt(m).toFixed(2))

                const startPrice = parseFloat(priceRange[0])

                const endPrice = parseFloat(priceRange[1])



                try {
                    const price = priceNew.toString().replace('.', '').replace(',', '.')
                    const productPrice = parseFloat(price)

                    if (endPrice) {

                        if (productPrice >= startPrice && productPrice <= endPrice) {
                            return true
                        } else {
                            return false;
                        }

                    }
                    else {

                        if (productPrice >= startPrice) {
                            return true
                        } else {

                            return false
                        }

                    }
                } catch (error) {

                }

            } else {

                let nws = []

                if (negwords) {
                    nws = negwords.split(',')

                }
                const kw = kws.keywords
                const match = productTitleMatch({ kw, title, exactmatch, nws })
                return match
            }
        })

        return match.length === foundkeywords.length
    }
    let foundkeywords = allkeywords.filter((k) => {
        const test = search.split(' ').some((s)=> s.match(k.keywords)) 
debugger
        return test
       }  )
    debugger
    const searchArr = [...foundkeywords, ...search.split(' ')].length > 0 ? permutator([...foundkeywords, ...search.split(' ')]).map(n => n.join(' ')).map((m, i, arr) => {
        if (arr.length - 1 > i) {
            return `(${m})|`
        }
        return `(${m})`

    }).join('') : search
    const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(searchArr, 'i') } }


    var filteredData = products().filter(filterBySearch).filter(filterByKeyword).get()


    var orderedData = orderData(filteredData)
    var orderedDb = TAFFY(orderedData)

    var d = orderedDb().start(startAt).limit(100).get()
    let count = orderedDb().count()



    console.log('data.length', d.length)


    console.log('search', filterBySearch)

    console.log('startAt', startAt)
    console.log('count1', count)

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