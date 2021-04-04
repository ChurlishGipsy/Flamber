import { useState, useEffect, useContext } from 'react';
import ModelAssets from './ModelAssets';
import {CircularProgress} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


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


    return ( 
        <div className="wallet">
            {/* {error && <div>{ error }</div>} */}
            {isPending && <div className="centered"><CircularProgress size='6rem'/></div>}
            {data && !isPending &&  doesWalletExist  &&
             <ModelAssets/>
            }
            {data && !isPending &&  !doesWalletExist && !isBeingCreated &&
            <div className="no-wallet">
                <p className="text-info">
                    It seems you don't have a wallet.
                    <br></br>
                     Would you like to create it?  
                </p>
                <Link to="/create" className="action-btn create-wallet-btn" onClick={createWallet}>Create Wallet</Link>
            </div>
            }
        </div>
     );
}
 
export default Wallet;