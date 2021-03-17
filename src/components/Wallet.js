import { useState, useEffect } from 'react';
import ModelAssetList from './ModelAssetList';
import {CircularProgress} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';


const Wallet = () => {

    const [userData, setUserData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [doesWalletExist, setDoesWalletExist] = useState(false);
    const [isBeingCreated, setIsBeingCreated] = useState(false);
    const createWallet = () => {
        setIsBeingCreated(true);
        history.push('/create');
    };
    const [rerender, setRerender] = useState(false);
    const history = useHistory();

    
 
    

    useEffect(() => {
        fetch('http://localhost:8000/user')
        .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            setUserData(data);
            if (data.doesWalletExist === true) {
                setDoesWalletExist(true);
            }
            setIsPending(false);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })

    },[rerender])

    return ( 
        <div className="wallet">
            {error && <div>{ error }</div>}
            {isPending && <div className="centered"><CircularProgress size='6rem'/></div>}
            {userData && !isPending &&  doesWalletExist  &&
             <ModelAssetList hasChanged={setRerender} rerender={rerender}  user={userData}/>
            }
            {userData && !isPending &&  !doesWalletExist && !isBeingCreated &&
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