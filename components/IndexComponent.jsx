
import * as React from 'react';
import Card from '@mui/material/Card';
import AppBar from '../components/AppBar';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import ResponsiveComponent from './ResponseComponent'
import Link from 'next/link'
export default function IndexComponent() {

    return <div>
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


function GenderCategoryCard({ gender, img }) {
    return (
        <Card >
                     <Link href={`/${gender.toLowerCase().replace(' ','-')}`} style={{textDecoration:'none'}}>
            <CardActionArea>
       
                <CardMedia
                    component="img"
                    image={img}
                    alt="green iguana"
                />
               
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {gender}
                    </Typography>

                </CardContent>
            </CardActionArea>
   </Link>
        </Card>
    );
}

function GenderCategoryList() {

    return <Container center sx={{marginTop:20}}><Grid container gap={2} sx={{ display: 'flex', justifyContent: 'center' }}>{[{ gender: 'kadın', img: 'imgs/kadin.webp' }, { gender: 'ERKEK', img: 'imgs/erkek.webp' }, { gender: ' KIZ ÇOCUK', img: 'imgs/kc.webp' }, { gender: 'ERKEK ÇOCUK', img: 'imgs/ec.webp' }].map(m => {
        return <Grid item xs={5} md={2}> <GenderCategoryCard gender={m.gender} img={m.img} /></Grid>
    })}
    </Grid></Container>
}