import logo from '../assets/wallet-icon.png';
import {MainButton} from './reusable/MainButton';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import { useState } from 'react';
import { Link } from 'react-router-dom';


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
        <div className="home-background home-template">
            <div className="home-header">
                <img style={{marginLeft: 50}} src={logo} alt="" />
                <div className="home-header-nav">
                    <MainButton color="primary" variant="text" onClick={handleLogin} >Login</MainButton>
                    <MainButton variant="contained" color="secondary" onClick={handleSignUp}>Sign Up</MainButton>
                    <Link style={{textDecoration: 'none'}} to="/about"><MainButton color="secondary" variant="text">About</MainButton></Link>
                </div>
            </div>
            <div className="home-content">
                {!login && !signUp && <h1 className="main-title">Flamber</h1>}
                {!login && signUp && <SignUp setSignUp={setSignUp}/>}
                {login && !signUp && <Login setLogin={setLogin}/>}
            </div>
          
        </div>
           
     );
}
 
export default Home;