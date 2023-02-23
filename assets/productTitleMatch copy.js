
function productTitleMatch({ kw, title, nws }) {

    if (title.match(/Ipek Karışımlı Tunik Elbise/i) && kw.includes('elbise')) {
        debugger
    }

    if (title) {



        const match = kw.split(',').some(function (keyword) {
            const keywordTest = new RegExp(keyword, 'i')

            if (title.match(/Ipek Karışımlı Tunik Elbise/i) && kw.includes('elbise')) {

                const reg = new RegExp(keyword, 'i')
                const test = reg.test(title)
                debugger
            }




            if (nws.length > 0) {


                if (nws.filter((f) => {

                    const exists = title.toLowerCase().indexOf(f.toLowerCase()) !== -1
                    //const exists = title.toLowerCase().split(' ').find(t=> t===f.toLowerCase())
                    return exists
                }).length > 0) {

                    return false
                } else {

                    if (title.match(/Ipek Karışımlı Tunik Elbise/i) && kw.includes('elbise')) {
                        debugger
                    }
                    // if (exactmatch) {
                    // return  title.toLowerCase().indexOf(keyword.toLowerCase()) !==-1
                    return keywordTest.test(title)
                    // } else {

                    //   return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
                    //  }
                }

            } else {
                if (title.match(/Ipek Karışımlı Tunik Elbise/i) && kw.includes('elbise')) {
                    debugger
                }

                //title.toLowerCase().indexOf(keyword.toLowerCase()) !==-1
                // if (exactmatch) {
                //  return title.toLowerCase().split(' ').find(t=> t===keyword.toLowerCase())//.replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
                //}// else {
                //  return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
                //  }
                // return title.toLowerCase().indexOf(keyword.toLowerCase()) !==-1
                return keywordTest.test(title)
            }


        })
        if (title.match(/Ipek Karışımlı Tunik Elbise/i) && kw.includes('elbise')) {
            debugger
        }
        return match
    } else {

        return false
    }
}




module.exports = {
    productTitleMatch
};