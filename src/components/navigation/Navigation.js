import logo from '../../assets/wallet-icon.png';
import {NavData} from './NavData';
import SubNav from './SubNav';

const Navigation = () => {

    return ( 
        <div className="navigation">
                <div className="logo-background">
                    <img src={logo} alt="Logo"/>
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