import { useState, useEffect, useContext } from 'react';
import ModelAssets from './ModelAssets';
import {CircularProgress} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import modelWallet from '../assets/model-wallet.png'
import {MainButton} from './reusable/MainButton';



const Wallet = () => {

    const {data} = useContext(UserContext);
    const [isPending, setIsPending] = useState(true);
    const [doesWalletExist, setDoesWalletExist] = useState(false);
    const [isBeingCreated, setIsBeingCreated] = useState(false);
    const createWallet = () => {
        setIsBeingCreated(true);
        history.push('/create');
    };
    const history = useHistory();

    useEffect(() => {
        if (!data) return;
        else {
            setIsPending(false);
            if (data.doesWalletExist === true) {
                setDoesWalletExist(true);
            }
        }
      }, [data]);


    return data ? ( 
        <div className="wallet">
            {isPending && <div className="centered"><CircularProgress size='6rem'/></div>}
            {data && !isPending &&  doesWalletExist  &&
             <ModelAssets/>
            }
            {data && !isPending &&  !doesWalletExist && !isBeingCreated &&
            <div className="centered">
                <h1 className="heading-info">MODEL ASSETS</h1>
                <div className="starting-message">
                    <img  src={modelWallet} alt="Percentage Icon" />
                    <p className="starting-info">It seems you don't have a wallet. <br/> Would you like to create it?</p>
                </div>
                <div className="bottom-buttons">
                    <Link style={{textDecoration: 'none'}} to="/create" onClick={createWallet}>
                        <MainButton variant="contained" color="secondary">Create Wallet</MainButton>
                    </Link>
                </div>
            </div>
            }
        </div>
     ): (
        <div className="centered"><CircularProgress size='6rem'/></div>
       );
}
 
export default Wallet;