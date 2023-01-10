import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import DrawerList from './DrawerList'
import BreadCrumb from './BreadCrumb';
import GenderTabs from './GenderTabs'
const drawerWidth = 300;

export default function DrawerDesktop(props) {
  const {categories,keywordgroup,gender,tabValue}=props

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 2}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          <Typography variant="h6" noWrap component="div">
            BİRARADAMODA
            <Typography variant="body2" style={{ fontSize: 14, opacity: 0.7 }}>Kadın ve Erkek Marka Giyimler</Typography>
          </Typography>
          <GenderTabs tabValue={tabValue}/>
          <div></div>
        </Toolbar>
  
      </AppBar>
      <Drawer 
        variant="permanent"
        PaperProps={{style: {border: 'none'}}}
        sx={{
          width: drawerWidth,
          zIndex:0,
          flexShrink: 0,
    
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', paddingLeft:10, paddingTop:5,scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: 6,
            height: 4,
            /* width of vertical scrollbar */
            border: '1px solid #d5d5d5'
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
       
            backgroundColor: "#9e9e9e",
      
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#cfd8dc",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#cfd8dc",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#cfd8dc",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#cfd8dc",
          }, 
          "&::-webkit-scrollbar-track": {
            background: '#cfd8dc'
          }, 
          }} >
         <DrawerList categories={categories} />
      
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, paddingTop:4 }}>
   
      <Container>
      <div style={{paddingTop:50}}>
        <BreadCrumb keywordgroup={keywordgroup} gender={gender}/>
      
        {props.children}
        </div>
    

      </Container>
      
       
      </Box>
    </Box>
  );
}