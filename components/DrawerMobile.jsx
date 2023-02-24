import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BreadCrumb from './BreadCrumb';
import Container from '@mui/material/Container'
import AppBar from './AppBar'
import DrawerList from './DrawerList';
import GenderTabs from './GenderTabs';
import { useRouter } from 'next/router'
export default function DrawerMobile(props) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const { categories, keywordgroup, gender,tabValue,role } = props
  console.log('xxxxx',tabValue)
  const [state, setState] = React.useState();

  function toggleDrawer(event) {


    setState(!state);
  };



  return (

    <React.Fragment >
      <AppBar toggleDrawer={toggleDrawer} keywordgroup={keywordgroup} gender={gender} tabValue={tabValue}/>
      <Drawer
sx={{ [`& .MuiDrawer-paper`]: { width: '80%', boxSizing: 'border-box' }}}
        anchor="left"
        open={state}
        onClose={toggleDrawer}
      >
        <div>
        <GenderTabs tabValue={tabValue}/>
        <DrawerList categories={categories} role={role} gender={gender}/>
        </div>
    
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, paddingTop: 15 }} >
        <Container>

    
          {props.children}

        </Container>


      </Box>
    </React.Fragment>


  );
}