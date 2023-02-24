import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Slide from '@mui/material/Slide';
import GenderTabs from './GenderTabs';
import BreadCrumb from './BreadCrumb';
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  const {toggleDrawer,keywordgroup,gender,tabValue}=props

  
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ zIndex: 2,backgroundColor:'white',color:' #ff7043'}} elevation={0}>
          <Toolbar style={{backgroundColor:' #ff7043',color:'white'}}>
            {toggleDrawer &&      <IconButton
          onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>}
   
         
          <Typography variant="h6" noWrap component="div">
            BİRARADAMODA
            <Typography variant="body2" style={{ fontSize: 14, opacity: 0.7 }}>Kadın ve Erkek Marka Giyimler</Typography>
          </Typography>
         
   
   
      
          </Toolbar>
          <div style={{display:'flex',justifyContent:'center'}}>
      <BreadCrumb keywordgroup={keywordgroup} gender={gender} />
      </div>
          <div style={{display:'flex',justifyContent:'center'}}>
          {!toggleDrawer &&  <GenderTabs tabValue={tabValue}/>}
          </div>
   
        
         
        </AppBar>
   
      </HideOnScroll>
  

    </React.Fragment>
  );
}



// function TabsContainer({ selectedTab, handleTabSelection }) {
//   return (
//     <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
//       <Tabs value={selectedTab} onChange={handleTabSelection}>
//         <Tab label="Bulunan" />
//         <Tab label="Seçenekler" />

//       </Tabs>
//     </Box>
//   );
// }