import React from 'react';

import DrawerDesktop from './DrawerDesktop'
import DrawerMobile from './DrawerMobile'
import ResponsiveComponent from './ResponseComponent'
import Categories from './Categories';


class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        const {categories}=this.props
        const mapped =categories.filter((f)=>f[0]!=='diger').map((g)=>{
            const groupName = g[0]
            const images = g[1].filter(f=> f.count !==undefined)
            let totalGroup=images.reduce((prev,curr)=>{
              return prev+curr.count
            },0)
            return {groupName,images:images.sort((a,b)=>b.count-a.count),totalGroup}
          }).sort((a,b)=>{
           return b.totalGroup-a.totalGroup})
       
        return <div>
            <ResponsiveComponent maxWidth={800} render={()=><DrawerMobile categories={mapped} ><Categories categories={mapped}/></DrawerMobile>} />
            <ResponsiveComponent minWidth={801} render={()=><DrawerDesktop categories={mapped}><Categories categories={mapped}/></DrawerDesktop>} />
        </div>
    }
}


export default HomeComponent


