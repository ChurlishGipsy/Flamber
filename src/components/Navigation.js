import {NavLink} from 'react-router-dom';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';


const Navigation = () => {
    return ( 
        <div className="navigation">
                <NavLink exact={true} activeClassName='is-active' to="/" className="nav-link">
                    <p>Wallet</p>
                    <AccountBalanceWalletIcon/>
                </NavLink>
                <NavLink activeClassName='is-active' to="/statistics" className="nav-link">
                    <p>Statistics</p>
                    <TimelineIcon/>
                </NavLink>
                <NavLink activeClassName='is-active' to="/settings" className="nav-link">
                    <p>Settings</p>
                    <SettingsIcon/>
                </NavLink>
        </div>
     );
}
 
export default Navigation;