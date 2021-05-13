import logo from '../assets/wallet-icon.png';
import {MainButton} from './reusable/MainButton';




const Home = () => {
    return ( 
        <div className="home-background">
            <div className="home-header">
                <img style={{marginLeft: 50}} src={logo} alt="" />
                <div className="home-header-nav">
                    <MainButton color="primary" variant="text">Sign Up</MainButton>
                    <MainButton variant="contained" color="secondary">Sign In</MainButton>
                </div>
            </div>
        </div>
     );
}
 
export default Home;