import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link'
export default function GenderTabs({tabValue=0}) {


 

    return (
        <Tabs textColor='inherit' indicatorColor='secondary' 
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        style={{width:'100%'}}
        value={tabValue}  aria-label="disabled tabs example">
            <Tab href="/kadin" component={Link} label="KADIN"  style={{fontWeight:700}}/>
             <Tab href="/erkek"  component={Link} label="ERKEK" style={{fontWeight:700}}/>
            <Tab  href="/kiz-cocuk" component={Link} label="KIZ ÇOCUK" style={{fontWeight:700}}/>
            <Tab href="/erkek-cocuk" component={Link} label="ERKEK ÇOCUK" style={{fontWeight:700}}/>
        </Tabs>
    );
}