import {useContext, useState} from 'react'
import logo from '../../assets/wallet-icon.png';
import {NavData} from './NavData';
import SubNav from './SubNav';
import {MainButton} from '../reusable/MainButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';


const Navigation = () => {

    // const {logout} = useContext(AuthContext);
    const { logout, currentUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const history = useHistory();

    async function handleLogout  () {
        try {
            await logout();
            history.push('/')
        } catch {
            setError('Failed to log out')
        }
    }

    return currentUser ? ( 
        <div className="navigation">
                <div className="logo-background">
                    <img src={logo} alt="Logo"/>
                </div>
                {NavData.map((item, index) => {
                    return <SubNav item={item} key={index}/>
                })}
                    <MainButton 
                    style={{marginTop: 'auto', paddingBottom: 10}} 
                    onClick={handleLogout} 
                    color="primary" 
                    variant="text">Logout 
                    <ExitToAppIcon 
                    style={{marginLeft: 10}} 
                    size="small"/>
                    </MainButton>
                    
        </div>

     ) : <div>
         
     </div>
}
 
export default Navigation;