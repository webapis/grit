import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import NextLink from 'next/link'
import { Typography } from '@mui/material';
import Footer from './Footer';
import placeholders from "../assets/placeholders.json";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Categories({ categories,placeholder, offset = 200, trigger = true,gender }) {



    
    useEffect(() => {
        const scrollToHashElement = () => {
            const { hash } = window.location;
            const elementToScroll = document.getElementById(hash?.replace("#", ""));

            if (!elementToScroll) return;

            window.scrollTo({
                top: elementToScroll.offsetTop - offset,
                behavior: "smooth"
            });
        };

        if (!trigger) return;

        scrollToHashElement();
        window.addEventListener("hashchange", scrollToHashElement);
        return window.removeEventListener("hashchange", scrollToHashElement);
    }, [trigger]);
    useEffect(() => {


        const headings = document.querySelectorAll('h4[id]');

        window.addEventListener('scroll', (e) => {

            headings.forEach(ha => {
                const rect = ha.getBoundingClientRect();
            

                if (rect.top > 0 && Math.round(rect.top) < 150) {

                    const location = window.location.toString().split('#')[0];
                    history.replaceState(null, null, location + '#' + ha.id);
                }
            });
        });

    }, [])


    return <div>{categories && categories.map(m => {
        const { groupName, images, totalGroup } = m
        let groupNameId = groupName.replace(' ', '-').toLowerCase().replace(/ö/g, "o")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ç/g, "c")
            .replace(/ğ/g, "g")
            if (totalGroup===0)
            return null
        return <div key={groupName}>
      
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><Typography id={groupNameId} variant="h4" gutterBottom>{groupName}</Typography><Typography style={{ color: '#bdbdbd' }} variant="h4" gutterBottom>{new Intl.NumberFormat().format(totalGroup)} adet</Typography></div>
            <Grid spacing={2} container>
                {images.map((m, i) => {
                    const urlGroupName = groupName.replace(' ', '-').toLowerCase()
                    const imageUrls=m.imageUrls? m.imageUrls:[{marka:'defacto',src:'',title:''}]
                    const url = `/${decodeURI(gender)}/${urlGroupName}/${m.title}/sayfa/1`
                    return <Grid key={i} item xs={6} sm={3} md={3} lg={2} xg={1} ><Paper elevation={0} style={{ display: 'flex', flexDirection: 'column', padding: 2, overflow: 'hidden',height:'100%' }}>
                        <CategoryImage imageUrls={imageUrls} title={m.title} url={url} count={m.count} placeholder={placeholder}/>
                    </Paper></Grid>
                })}
            </Grid></div>
    })}
    <Grid item><Footer/></Grid>
    </div>
}




function CategoryImage({ title, url, count,placeholder,imageUrls }) {

    const imageEl = useRef(null);

    const {marka,src:imageUrl,title:prodTitle}=imageUrls[0]

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
console.log('marka',marka)
    const imageSource =
    placeholders[marka].imagePrefix.trim() +
    placeholders[marka].imageHost.trim() +
    imageUrl +
    placeholders[marka].imgPostFix;

 


    return <div style={{ textDecoration: 'none',height:'100%',display:'flex',flexDirection:'column', justifyContent:'space-between' }}>
             <div  hidden>{prodTitle}</div>   
 <a  href={url}>
              
            <img  ref={imageEl} src={placeholder} style={{ width: '100%', borderRadius: 6 }} data-src={imageSource} />
         
           
        </a>
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{textAlign:'center',color:'#9e9e9e',fontSize:12}}>{new Intl.NumberFormat().format(count)}</div>
                <Button endIcon={<ArrowRightAltIcon/>} component={NextLink} underline="hover" href={url} style={{ textTransform: 'uppercase' }} ><Typography>{title}</Typography></Button>
               
            </div>
    </div>

}