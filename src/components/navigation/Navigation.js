import {NavLink, Link} from 'react-router-dom';
import {useState} from 'react';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import logo2 from '../../assets/wallet-icon.png';
import {NavData} from './NavData';
import SubNav from './SubNav';

const Navigation = () => {

    return ( 
        <div className="navigation">
                <div className="logo-background">
                    <img src={logo2} alt="Logo" style={{ color: '#E6AF2E'}}/>
                </div>
                {/* <NavLink exact={true} activeClassName='is-active' to="/" className="nav-link">
                    <p>Wallet</p>
                    <AccountBalanceWalletIcon className="nav-icon"/>
                </NavLink>
                <NavLink activeClassName='is-active' to="/overview" className="nav-link">
                    <p>Overview</p>
                    <TimelineIcon className="nav-icon"/>
                </NavLink>
                <NavLink activeClassName='is-active' to="/settings" className="nav-link">
                    <p>Settings</p>
                    <SettingsIcon className="nav-icon"/>
                </NavLink> */}
                {NavData.map((item, index) => {
                    return <SubNav item={item} key={index}/>
                })}
        </div>
     );
}
 
export default Navigation;