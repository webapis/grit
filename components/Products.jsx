
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import placeholders from "../assets/placeholders.json";
import DrawerDesktop from './DrawerDesktop'
import DrawerMobile from './DrawerMobile'
import ResponsiveComponent from './ResponseComponent'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import NextLink from 'next/link'
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';
import Head from 'next/head'
import Footer from './Footer';
import BreadCrumb from './BreadCrumb';
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
export default function Products(props) {

  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { selectedNavKeywords, groupName, selectedCat, role, placeholder, categories, products, selectedNavIndex, functionName, keywordsIndexImages, navKeywords, keywordgroup, pageNumber, pageTitle, gender, tabValue } = props
  console.log('keywordsIndexImages...',keywordsIndexImages)
  const mapped = Object.entries(categories).map((g) => {
    const groupName = g[0]
    const images = role === 'USER' ? g[1].filter(f => f.count !== undefined) : g[1].map(m => { return { ...m, count: m.count === undefined ? 0 : m.count } })
    let totalGroup = images.reduce((prev, curr) => {
      return prev + curr.count
    }, 0)
    return { groupName, images: images.sort((a, b) => b.count - a.count), totalGroup }
  }).sort((a, b) => {
    return b.totalGroup - a.totalGroup
  })

  return <>
    <Head>
      <title style={{ textTransform: 'capitalize' }}>{pageTitle + '-| BİRARADAMODA'}</title>
      <meta name="description"
        content={new Date().toLocaleDateString() + pageTitle} />
    </Head>
    <ResponsiveComponent maxWidth={800} render={() => <DrawerMobile tabValue={tabValue} gender={gender} categories={mapped} keywordgroup={keywordgroup}><Content selectedNavKeywords={selectedNavKeywords} keywordgroup={keywordgroup} groupName={groupName} selectedCat={selectedCat} gender={gender} keywordsIndexImages={keywordsIndexImages} placeholder={placeholder} pageNumber={pageNumber} navKeywords={navKeywords} products={products} selectedNavIndex={selectedNavIndex} functionName={functionName} /></DrawerMobile>} />
    <ResponsiveComponent minWidth={801} render={() => <DrawerDesktop tabValue={tabValue} gender={gender} categories={mapped} keywordgroup={keywordgroup}><Content selectedNavKeywords={selectedNavKeywords} keywordgroup={keywordgroup} groupName={groupName} selectedCat={selectedCat} gender={gender} keywordsIndexImages={keywordsIndexImages} placeholder={placeholder} pageNumber={pageNumber} navKeywords={navKeywords} products={products} selectedNavIndex={selectedNavIndex} functionName={functionName} /></DrawerDesktop>} />
  </>
}

function containsNumbers(str) {
  return /\d/.test(str);
}

function Content({ selectedNavKeywords, groupName, selectedCat, gender, placeholder, products, selectedNavIndex, functionName, keywordsIndexImages, navKeywords, keywordgroup, pageNumber }) {

  const [selectedTab, setSelectedTab] = useState(0)


  function handleTabSelection(e, newvalue) {
    setSelectedTab(newvalue)
  }



  return <Grid spacing={1} container style={{ backgrounColor: 'yellow', width: '100%' }}>
    <Grid item xs={12}>
      <TabsContainer selectedTab={selectedTab} handleTabSelection={handleTabSelection} />
    </Grid>

    {selectedTab === 0 && <Page selectedNavIndex={selectedNavIndex} selectedNavKeywords={selectedNavKeywords} keywordgroup={keywordgroup} groupName={groupName} selectedCat={selectedCat} gender={gender} keywordsIndexImages={keywordsIndexImages} placeholder={placeholder} pageNumber={pageNumber} products={products} />}
    {selectedTab === 1 && <Grid xs={12} sm={3} md={6} lg={6} item><Keywords selectedNavIndex={selectedNavIndex} navKeywords={navKeywords} /></Grid>}
  </Grid>
}

function GroupComponent({ keywordsIndexImages, selectedNavIndex, selectedCat, placeholder, gender }) {
  const [filter, setFilter] = useState('Seçenekler')
  debugger
  const groupKeywords = Object.values(keywordsIndexImages)

  function filterGrup(e) {
    debugger
    const id = e.currentTarget.id
    debugger
    setFilter(id)

  }
  debugger
  return <Grid container gap={1}>
    <Grid item xs={12}>{groupKeywords.map((m, i) => {
      const countSelected = selectedNavIndex.split('-').filter(fk => m.keywords.some(s => {
  
        return s.index.replace('-', '') === fk

      })).length

      return <Chip color={filter === m.groupName ? 'warning' : 'default'} onClick={filterGrup} key={i} id={m.groupName} label={<span>{m.groupName} {countSelected > 0 && <span>({countSelected})</span>}</span>} style={{ margin: 1 }} />
    })}</Grid>
    {groupKeywords.filter(f => f.groupName === filter).map(m => {


      return m.keywords.filter(c=>{
        debugger
      return  selectedNavIndex.split('-').find(fk =>fk ===c.index.replace('-',''))===undefined
      
      } ).map((m, i) => {
  

        return <Grid key={i} item xs={6} sm={2} md={2} lg={1} > <GroupImage selectedNavIndex={selectedNavIndex} groupName={m.groupName} selectedCat={selectedCat} gender={gender} placeholder={placeholder}  {...m} /></Grid>
      })
    })}

    {groupKeywords.map(f => {


      return { groupName: f.groupName,keywords:f.keywords.filter(d=>selectedNavIndex.split('-').find(fk =>fk ===d.index.replace('-','')) )}

    }).map(m => {


      return m.keywords.map((m, i) => {
        debugger

        return <Grid key={i} item xs={6} sm={2} md={2} lg={1} > <GroupImage selectedNavIndex={selectedNavIndex} groupName={m.groupName} selectedCat={selectedCat} gender={gender} placeholder={placeholder}  {...m} /></Grid>
      })
    })}
  </Grid>


}
function Page({ selectedNavIndex, selectedNavKeywords, keywordgroup, selectedCat, gender, products, pageNumber, placeholder, keywordsIndexImages }) {

  const [pageData, setPageData] = useState([])


  const { count, data } = products

  useEffect(() => {
    setPageData(data)
  }, [data])



  const totalPages = Math.ceil(count / 100)


  function handleChange(e, pageNumber) {
    const nextUrl = location.href.substring(0, location.href.indexOf('sayfa'))

    location.replace(nextUrl + 'sayfa/' + pageNumber)
  }
  return <>

    <Grid item xs={12} sm={12} md={6} style={{ marginTop: 10 }}><Typography variant="body2" display="block" gutterBottom sx={{ color: '#9e9e9e' }}>Toplam bulunan ürün: {new Intl.NumberFormat().format(count)} adet</Typography></Grid>
    <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', justifyContent: 'end' }}>
      <Pagination count={totalPages} page={pageNumber} onChange={handleChange} />
    </Grid>
    {keywordsIndexImages &&     <GroupComponent keywordsIndexImages={keywordsIndexImages} gender={gender} placeholder={placeholder} selectedCat={selectedCat} selectedNavIndex={selectedNavIndex} />}

    <Grid item xs={12}></Grid>
    {pageData && pageData.length > 0 && pageData.filter(f => f.total === undefined).map((m, i) => {

      return <Grid key={i} item xs={6} sm={3} md={3} lg={2} > <ImageComponent selectedNavKeywords={selectedNavKeywords} selectedCat={selectedCat} placeholder={placeholder} {...m} /></Grid>
    })}
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', marginBottom: 10 }}>
      <Pagination count={totalPages} page={pageNumber} onChange={handleChange} />
    </Grid>
    {pageNumber === totalPages && <Grid item xs={12}><BreadCrumb gender={gender} keywordgroup={keywordgroup} /></Grid>}
    {pageNumber === totalPages && <Grid item xs={12}>Son Sayfa</Grid>}

    <Grid item><Footer /></Grid>
  </>
}

function handleClick({ index, event, keyword, selectedNavIndex }) {
  debugger
  const urlKeywords = containsNumbers(keyword) ? keyword : keyword.replace(' ', '-')
  localStorage.setItem(`${urlKeywords}-index`, index)
  event.preventDefault()


  const indexExist = selectedNavIndex.split('-').find(f => index !== "" && index.replace('-', "") === f)

  let nextUrl;
  let selectedIndex = null
  let locationPathname = location.pathname.substring(0, location.pathname.indexOf('sayfa'))

  if (indexExist) {

    selectedIndex = selectedNavIndex.split('-').filter(f => f !== "" && f !== indexExist).map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')


    nextUrl = `${decodeURI(locationPathname).replace(`/${urlKeywords.toLowerCase()}`, '')}/sayfa/1`

  }
  else {

    selectedIndex = selectedNavIndex.concat(index).split('-').filter(f => f !== "").map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
    nextUrl = `${locationPathname}${urlKeywords.toLowerCase()}/sayfa/1`
  }

  location.replace(nextUrl)
}
function Keywords({ navKeywords, selectedNavIndex }) {

  const sortByKeywordsLength = navKeywords.sort((b, a) => a['keywords'].length - b['keywords'].length)


  return navKeywords && sortByKeywordsLength.map(m => {
    const sortByProductNumber = m.keywords.sort((a, b) => b[0] - a[0])


    return <Accordion elevation={0}>

      <AccordionSummary sx={{ textTransform: 'uppercase' }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      > {m.groupName}</AccordionSummary>

      <AccordionDetails>
        {sortByProductNumber.map(m => {
          const c = m[0]
          const i = m[1]
          const k = m[2]
          const match = selectedNavIndex.split('-').find(f => f === i.replace('-', ''))
          if (match)
            return <div style={{ display: 'flex', justifyContent: 'space-between' }}><Chip sx={{ textTransform: 'capitalize' }} label={k} size="small" onDelete={(e) => handleClick({ index: i, event: e, keyword: k })} /> <Typography>{new Intl.NumberFormat().format(c)}</Typography></div>
          return <Link component={NextLink} onClick={(e) => handleClick({ index: i, event: e, keyword: k, selectedNavIndex })} href="" color="inherit" underline="hover" style={{ marginRight: 20, paddingLeft: 10, display: 'flex', justifyContent: 'space-between', backgroundColor: match ? 'yellow' : '' }}><Typography variant='overline' sx={{ textTransform: "uppercase" }}>{k}</Typography><Typography>{new Intl.NumberFormat().format(c)}</Typography></Link>
        })}
      </AccordionDetails>
    </Accordion>
  })
}
//


function TabsContainer({ selectedTab, handleTabSelection }) {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={selectedTab} onChange={handleTabSelection}>
        <Tab label="Bulunan" />
        <Tab label="Filtre" />

      </Tabs>
    </Box>
  );
}


function ImageComponent({ selectedNavKeywords, title, marka, imageUrl, link, priceNew, timestamp, placeholder }) {


  const imageEl = useRef(null);

  const date2 = timestamp
  const date1 = Date.now()
  const hour = Math.floor(Math.abs(date1 - date2) / 36e5);
  const minutesdiff = Math.abs(new Date(date1) - new Date(date2));
  var minutes = Math.floor((minutesdiff / 1000) / 60);
  var days = Math.floor(minutesdiff / (1000 * 60 * 60 * 24));
  var month = Math.round(minutesdiff / (2e3 * 3600 * 365.25));
  useEffect(() => {
    imageEl.current.src = placeholder
    if (window.IntersectionObserver) {

      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {

            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.50
      });
      window.obz = observer
      window.obz.observe(imageEl.current)
    }




  }, [imageUrl]);

  const imageSource =
    placeholders[marka].imagePrefix.trim() +
    placeholders[marka].imageHost.trim() +
    imageUrl +
    placeholders[marka].imgPostFix;
  const detailHost =
    placeholders[marka].detailHost +
    link +
    placeholders[marka].postfix;
  const trimmedTitle = (title.lastIndexOf("_") > 0) ? title.substr(0, title.lastIndexOf("_")).trim() : title
  const titleWithselectedKeywords = trimmedTitle.replace(marka, '').split(' ').map((m, i) => {
    const matches = (selectedNavKeywords.includes(m.toLowerCase()))
    if (matches) {
      return <span key={i} style={{ fontSize: 11, marginLeft: 2, textTransform: 'capitalize', fontWeight: 700, color: '#ff7043' }}>{m.charAt(0).toUpperCase() + m.slice(1)}{' '} </span>
    }
    return <span style={{ textTransform: 'capitalize', fontSize: 11 }} key={i}>{' '} {m.charAt(0).toUpperCase() + m.slice(1)}</span>


  })
  return <div><a href={detailHost} target="_blank"> <img ref={imageEl} style={{ width: '100%' }} src={placeholder} data-src={imageSource} alt={title} /></a><div style={{ display: 'flex', justifyContent: 'space-between' }}><Typography style={{ textTransform: 'uppercase', fontSize: 11 }} variant="body2">{marka}</Typography><Typography variant="body2" style={{ fontSize: 11 }}>{priceNew} TL</Typography></div><Link color="inherit" underline="hover" variant="body2" href={detailHost} target="_blank" style={{ textTransform: 'capitalize' }}>{titleWithselectedKeywords}</Link>
    <Typography color='#9e9e9e' style={{ textAlign: 'right', fontSize: 9 }} variant="caption" display="block" gutterBottom>{minutes <= 59 ? minutes + ' dakika önce' : hour <= 24 ? hour + ' saat önce' : days <= 31 ? days + ' gün önce' : month + ' ay önce'}</Typography>
  </div>
}




function GroupImage({ groupName, selectedCat, gender, placeholder, groupNameTitle, imageSource, index, keywordTitle, title, total, selectedNavIndex }) {
  const match = selectedNavIndex.split('-').find(f => f === index.replace('-', ''))
  console.log(title, keywordTitle, index)
  debugger
  const imageElm = useRef(null);
  //  const url = `/${gender}/${groupName}/${selectedCat}/${keywordTitle}/sayfa/1`
  useEffect(() => {

    if (window.IntersectionObserver) {

      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {

            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.50
      });
      window.obz = observer
      window.obz.observe(imageElm.current)
    }




  }, [imageSource]);

  // function handleClick(e) {
  //   e.preventDefault()
  //   localStorage.setItem(`${keywordTitle}-index`, index)

  //   location.replace(url)
  // }
  return <div style={{ backgroundColor: match ? ' #ff7043' : '', padding: match ? 2 : 0 }}><Link onClick={(e) => handleClick({ index, event: e, keyword: keywordTitle, selectedNavIndex })}><img ref={imageElm} style={{ width: '100%', borderRadius: 5 }} src={placeholder} data-src={imageSource} /></Link>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}><Link component={NextLink} href='' underline="hover" onClick={(e) => handleClick({ index, event: e, keyword: keywordTitle, selectedNavIndex })} style={{ textTransform: 'capitalize', fontSize: 12, cursor: "pointer", color: match ? 'white' : 'inherit' }}>{keywordTitle}</Link>

    </div>
    <div style={{ fontSize: 9, textAlign: 'center', opacity: 0.5, color: match ? 'white' : 'inherit' }}>{total}</div>
    {match && <IconButton color="primary" aria-label="add to shopping cart" onClick={(e) => handleClick({ index, event: e, keyword: keywordTitle, selectedNavIndex })}>
      <HighlightOffIcon style={{ color: 'white' }} />
    </IconButton>}

  </div>
}



