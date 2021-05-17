import logo from '../assets/wallet-icon.png';
import {MainButton} from './reusable/MainButton';
import Welcome from './auth/Welcome';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import { useState } from 'react';


const Home = () => {

    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);

    const handleLogin = () => {
        setLogin(true);
        setSignUp(false);
    }

    const handleSignUp = () => {
        setSignUp(true);
        setLogin(false);
    }

    return ( 
        <div className="home-background">
            <div className="home-header">
                <img style={{marginLeft: 50}} src={logo} alt="" />
                <div className="home-header-nav">
                    <MainButton color="primary" variant="text" onClick={handleLogin} >Login</MainButton>
                    <MainButton variant="contained" color="secondary" onClick={handleSignUp}>Sign Up</MainButton>
                </div>
            </div>
            {!login && !signUp && <Welcome/>}
            {!login && signUp && <SignUp setSignUp={setSignUp}/>}
            {login && !signUp && <Login setLogin={setLogin}/>}
        </div>
           
     );
}
 
export default Home;