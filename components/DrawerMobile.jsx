import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BreadCrumb from './BreadCrumb';
import Container from '@mui/material/Container'
import AppBar from './AppBar'
import DrawerList from './DrawerList';
import Toolbar from '@mui/material/Toolbar';
export default function DrawerMobile(props) {
  const {categories,keywordgroup}=props
  const [state, setState] = React.useState();

  function toggleDrawer (event)  {
 

    setState(!state);
  };



  return (
 
        <React.Fragment >
        <AppBar toggleDrawer={toggleDrawer}/>
          <Drawer
     
            anchor="left"
            open={state}
           onClose={toggleDrawer}
          >
             <DrawerList categories={categories} />
          </Drawer>
          <Box className='cont' component="main" sx={{ flexGrow: 1, paddingTop:10 }} >
            <Container>
         
            <BreadCrumb keywordgroup={keywordgroup}/>
        {props.children}

            </Container>
     
       
      </Box>
        </React.Fragment>
     
  
  );
}