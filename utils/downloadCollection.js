require('dotenv').config()
const fs = require('fs')
const fetch = require('node-fetch')
const makeDir = require('make-dir')
const path = require('path')

const decompress = require('decompress');
const decompressTargz = require('decompress-targz');

async function downloadIndexFolder() {

    const gender = process.env.GENDER

    debugger
    const response = await fetch(`https://github.com/${process.env.REPO}/blob/${gender}/public/indexes.tar.gz?raw=true`, { method: 'get' })

    debugger
    var file = fs.createWriteStream('assets/indexes.tar.gz');
    debugger
    return new Promise((resolve, reject) => {
        file.on('close', () => {
            console.log('fetched')
            resolve()

        })
        response.body.on('error', (error) => {
            reject(error)

        })

        response.body.pipe(file)
    })

}

function decompressIndexFolder() {

    return new Promise((resolve, reject) => {

        decompress('assets/indexes.tar.gz', process.env.GENDER, {
            plugins: [
                decompressTargz()
            ]
        }).then(() => {
            console.log('Files decompressed');
            resolve(true)
        }).catch(error => {
            console.log('Files decompressed error');
            reject(error)
        })


    })

}




async function getContent(filepath) {
    const fileName = path.basename(filepath)
    debugger
    await makeDir(`assets/${process.env.gender}`)
    const response = await fetch(filepath, { method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token ${process.env.GH_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" } })

    var file = fs.createWriteStream(`assets/${fileName}`);



    return new Promise((resolve, reject) => {
        file.on('close', () => {
            console.log('fetched')
            resolve()

        })
        response.body.on('error', (error) => {
            reject(error)

        })

        response.body.pipe(file)
    })

}




(async () => {
    await downloadIndexFolder()
    await decompressIndexFolder()
    await getContent(`https://raw.githubusercontent.com/${process.env.REPO}/${process.env.GENDER}/public/category-nav-counter.json`)
    await getContent(`https://raw.githubusercontent.com/${process.env.REPO}/${process.env.GENDER}public/keywords.json`)
})()
