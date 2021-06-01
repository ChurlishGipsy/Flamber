import currency from '../assets/currency.png';
import monitoring from '../assets/monitoring.png';
import analysis from '../assets/analysis.png';
import { Divider } from '@material-ui/core';
import {CancelButton} from './reusable/CancelButton';
import ClearIcon from '@material-ui/icons/Clear';
import {Link} from 'react-router-dom';

const About = () => {
    return ( 
        <div className="home-background centered-container">
           
            <div className="about-container">
                <Link style={{textDecoration: 'none'}} to="/"><CancelButton style={{marginLeft: '100%'}}><ClearIcon/></CancelButton></Link>
                <h1 className="about-title">About Flamber</h1>
                <Divider/>

                <div className="about-tile">
                    <div>
                        <h4 className="about-p-title">Make Investing Easy</h4>
                        <p className="about-p-text">Flamber allows you to use rebalancing technique
                            <br/> to make your investing easier </p>
                    </div>
                    <img style={{padding: '0 50px'}} src={monitoring} alt="Stock Market Icon"/>
                </div>
                <Divider/>
                <div className="about-tile">
                    <img style={{padding: '0 50px'}} src={analysis} alt="Statistics Icon" />
                    <div>
                        <h4 className="about-p-title">Detailed Wallet Analysis</h4>
                        <p className="about-p-text">Get access to number of charts <br/> and statistics representing your wallet</p>
                    </div>
                </div>
                <Divider/>
                <div className="about-tile">
                    <div>
                        <h4 className="about-p-title">Foreign currencies available</h4>
                        <p className="about-p-text">With Flamber, you can manage your <br/> wallet with currencies such as $, € and £</p>
                    </div>
                    <img style={{padding: '0 50px'}} src={currency} alt="Currency Icon" />
                </div>
                
            </div>
        </div>
     );
}
 
export default About;