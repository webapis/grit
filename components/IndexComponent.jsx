
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AppBar from '../components/AppBar';

import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';
import {CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import ResponsiveComponent from './ResponseComponent'
import Link from 'next/link'
export default function IndexComponent() {

    return <div style={{height:`90vh`}}>
        <ResponsiveComponent maxWidth={800} render={() => <>
            <AppBar showmenu={false}/>
            <GenderCategoryList />
        </>} />
        <ResponsiveComponent minWidth={801} render={() =>  <>
            <AppBar  showmenu={false}/>
            <GenderCategoryList />
        </>} />
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