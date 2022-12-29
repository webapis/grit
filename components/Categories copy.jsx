import React, { useEffect,useRef } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import BreadCrumb from './BreadCrumb';
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import { Typography } from '@mui/material';


export default function Categories({ categories }) {
    useEffect(() => {
        if (location.hash !== '') {
            setTimeout(() => {
                const hash = decodeURI(location.hash)
                let groupNameId = hash.replace(' ', '-').toLowerCase().replace(/ö/g, "o")
                    .replace(/ş/g, "s")
                    .replace(/ı/g, "i")
                    .replace(/ç/g, "c")
                    .replace(/ğ/g, "g")
                console.log('groupNameId', groupNameId)
                document.querySelector(groupNameId).scrollIntoView({ block: "center" })
            }, 200)

        }
    }, [])


    return <div>{categories && categories.map(m => {
        const { groupName, images, totalGroup } = m
        let groupNameId = groupName.replace(' ', '-').toLowerCase().replace(/ö/g, "o")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ç/g, "c")
            .replace(/ğ/g, "g")
        return <div key={groupName}>
            <div style={{marginTop:20}}>
            <BreadCrumb />
            </div>
          
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><Typography id={groupNameId} variant="h4" gutterBottom>{groupName}</Typography><Typography style={{ color: '#bdbdbd' }} variant="h4" gutterBottom>{new Intl.NumberFormat().format(totalGroup)} adet</Typography></div>
            <Grid spacing={2} container>
                {images.map((m, i) => {
                    const urlGroupName = groupName.replace(' ', '-').toLowerCase()
                    const url = `/${urlGroupName}/${m.title}/?page=1`
                    return <Grid key={i} item xs={6} sm={3} md={3} lg={2} xg={1} ><Paper elevation={0} style={{display: 'flex', flexDirection: 'column', padding: 2,overflow:'hidden' }}>
                        <a href={url}>
                            <img style={{height:200 }} src={`https://res.cloudinary.com/codergihub/image/upload/w_200/categories/${m.title}.jpg`} alt={`kadin ${m.title}`} />
                        </a>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Link   underline="hover" href={url} style={{ textTransform: 'uppercase' }} >{m.title}</Link>
                            <span>{m.count}</span>
                        </div>
                    </Paper></Grid>
                })}
            </Grid></div>
    })}</div>
}




function CategoryImage({ title, url }) {

    const imageEl = useRef(null);

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
        window.obz.observe(imageEl.current)
      }
  
  
  
  
    }, []);
    return <a href={url}>

        <img ref={imageEl} src={window.placeholder} style={{ width: '100%', borderRadius: 6 }} data-src={`https://res.cloudinary.com/codergihub/image/upload/w_200/categories/${title}.jpg`} alt={`kadin ${title}`} />
    </a>

}