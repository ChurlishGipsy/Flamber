import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AssessmentIcon from '@material-ui/icons/Assessment';

export const NavData = [
    {
        title: 'Wallet', 
        path: '#',
        icon: <AccountBalanceWalletIcon/>,
        iconOpened: <ArrowDropUpIcon/>,
        iconClosed: <ArrowDropDownIcon/>,
        subNav: [
           {
                title: 'Model Wallet',
                path: '/model-assets',
                icon: <AssessmentIcon/>
           },
           {
                title: 'Real Wallet',
                path: '/real-assets',
                icon: <LocalAtmIcon/>
            }
        ]
    },
    {
        title: 'Overview',
        path: '/overview',
        icon: <TimelineIcon/>
    }, 
    {
        title: 'Settings',
        path: '/settings',
        icon: <SettingsIcon/>
    }
]