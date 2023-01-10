
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AppBar from '../components/AppBar';

import CardMedia from '@mui/material/CardMedia';
import DrawerDesktop from './DrawerDesktop'
import DrawerMobile from './DrawerMobile'

import EastIcon from '@mui/icons-material/East';
import {CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import ResponsiveComponent from './ResponseComponent'
import Link from 'next/link'
export default function IndexComponent(props) {
    const {categories,placeholder,role,gender,tabValue}=props
    console.log(`gender--`,gender)
    const mapped =categories.map((g)=>{
        const groupName = g[0]
        const images = role === 'USER' ? g[1].filter(f => f.count !== undefined) : g[1].map(m => { return { ...m, count: m.count === undefined ? 0 : m.count } })
        let totalGroup=images.reduce((prev,curr)=>{
          return prev+curr.count
        },0)
        return {groupName,images:images.sort((a,b)=>b.count-a.count),totalGroup}
      }).sort((a,b)=>{
       return b.totalGroup-a.totalGroup})
    return <div style={{height:`90vh`}}>
     
        <ResponsiveComponent maxWidth={800} render={()=><DrawerMobile tabValue={tabValue} gender={gender} categories={mapped} >  <GenderCategoryList /></DrawerMobile>} />
        <ResponsiveComponent minWidth={801} render={()=><DrawerDesktop tabValue={tabValue} gender={gender} categories={mapped}>  <GenderCategoryList /></DrawerDesktop>} />
    </div>
}


function GenderCategoryCard({ gender, img,title }) {
    return (
        <Card >
                     <Link href={`/${gender.toLowerCase().replace(' ','-')}`} style={{textDecoration:'none'}}>
            <CardActionArea>
       
                <CardMedia
                    component="img"
                    image={img}
                    alt="green iguana"
                />
               
   
            </CardActionArea>
   </Link>
   <CardActions>
      <Button component={Link} size="small" href={`/${gender.toLowerCase().replace(' ','-')}`}>  {title} <EastIcon style={{marginLeft:10}}/></Button>
    </CardActions>
        </Card>
    );
}

function GenderCategoryList() {

    return <Container center sx={{marginTop:20}}><Grid container gap={2} sx={{ display: 'flex', justifyContent: 'center' }}>{[{ gender: 'kadin', img: 'imgs/kadin.webp',title:'KADIN' }, { gender: 'erkek', img: 'imgs/erkek.webp',title:'ERKEK' }, { gender: 'kiz-cocuk', img: 'imgs/kc.webp',title:'KIZ ÇOCUK'  }, { gender: 'erkek-cocuk', img: 'imgs/ec.webp',title:'ERKEK ÇOCUK'  }].map(m => {
        return <Grid item xs={5} md={2}> <GenderCategoryCard title={m.title} gender={m.gender} img={m.img} /></Grid>
    })}
    </Grid></Container>
}