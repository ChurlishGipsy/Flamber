import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';

const Navigation = () => {
    return ( 
        <div className="navigation">
                <div className="nav-link">
                    <p>Wallet</p>
                    <AccountBalanceWalletIcon/>
                </div>
                <div className="nav-link">
                    <p>History</p>
                    <TimelineIcon/>
                </div>
                <div className="nav-link">
                    <p>Settings</p>
                    <SettingsIcon/>
                </div>
        </div>
     );
}
 
export default Navigation;