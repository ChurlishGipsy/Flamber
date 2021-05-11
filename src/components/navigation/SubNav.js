import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';


const SubNav = ({item}) => {
    
    const [subnav, setSubnav] = useState(false);  
    
    useEffect(() => {
        console.log(subnav)
    }, [subnav])

    const showSubnav = () => setSubnav(!subnav);
    
    return (
        <div>
            <NavLink  className="sidebar-link" to={item.path} onClick={item.subNav && showSubnav}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h4>{item.title}</h4>
                    <div style={{color: '#E6AF2E', marginLeft: '10px'}}>{item.icon}</div>
                </div>     
                    <div>
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav 
                            ? item.iconClosed
                            : null}
                    </div>
                    </NavLink>
                    {subnav && item.subNav.map((item,index) => {
                        return (
                            <NavLink className="sidebar-link" to={item.path} key={index}>
                                <h4>{item.title}</h4>
                                <div style={{color: '#E6AF2E', marginLeft: '10px'}}>{item.icon}</div>
                            </NavLink>
                        )
                    })}
        </div>              
                         
                    
        
    )
}

export default SubNav;