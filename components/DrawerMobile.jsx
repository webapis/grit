import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BreadCrumb from './BreadCrumb';
import Container from '@mui/material/Container'
import AppBar from './AppBar'
import DrawerList from './DrawerList';
import GenderTabs from './GenderTabs';
export default function DrawerMobile(props) {
  const { categories, keywordgroup, gender,tabValue,role } = props
  const [state, setState] = React.useState();
  console.log(`gnd`, gender)
  function toggleDrawer(event) {


    setState(!state);
  };



  return (

    <React.Fragment >
      <AppBar toggleDrawer={toggleDrawer} />
      <Drawer

        anchor="left"
        open={state}
        onClose={toggleDrawer}
      >
        <GenderTabs tabValue={tabValue}/>
        <DrawerList categories={categories} role={role}/>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, paddingTop: 10 }} >
        <Container>

          <BreadCrumb keywordgroup={keywordgroup} gender={gender} />
          {props.children}

        </Container>


      </Box>
    </React.Fragment>


  );
}