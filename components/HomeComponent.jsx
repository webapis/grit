import React from 'react';
import {SearchBox} from './SearchBox'
import DrawerDesktop from './DrawerDesktop'
import DrawerMobile from './DrawerMobile'
import ResponsiveComponent from './ResponseComponent'
import Categories from './Categories';


class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {categories,placeholder,role,gender,tabValue,genderTitle}=this.props
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
       
        return <div>
     
            <ResponsiveComponent maxWidth={800} render={()=><DrawerMobile role={role} genderTitle={genderTitle} tabValue={tabValue} gender={gender} categories={mapped} ><Categories gender={gender} categories={mapped} placeholder={placeholder}/></DrawerMobile>} />
            <ResponsiveComponent minWidth={801} render={()=><DrawerDesktop role={role} genderTitle={genderTitle} tabValue={tabValue} gender={gender} categories={mapped}><Categories gender={gender} categories={mapped} placeholder={placeholder}/></DrawerDesktop>} />
        </div>
    }
}


export default HomeComponent


