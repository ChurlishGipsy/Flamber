import { useState, useEffect } from 'react';
import CreateWallet from './CreateWallet';
import ModelAssetList from './ModelAssetList'
import {CircularProgress} from '@material-ui/core';


const Wallet = () => {

    const [userData, setUserData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [doesWalletExist, setDoesWalletExist] = useState(false);
    const [isBeingCreated, setIsBeingCreated] = useState(false);
    const [url, setUrl] = useState('http://localhost:8000/user')
    const createWallet = () => {
        setIsBeingCreated(true);
    };
    const [rerender, setRerender] = useState(false);

    // const [test, setTest] = useState(false)
    // const hasChanged = () => {
    //     setTest(true);
    // }
 
    

    useEffect(() => {
        fetch(url)
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
            console.log('use effect ran');
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })

    },[url,rerender])

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
                <button className="action-btn create-wallet-btn" onClick={createWallet}>Create Wallet</button>
            </div>
            }
            {!isPending &&  !doesWalletExist && isBeingCreated && 
                <CreateWallet/>
            }
        </div>
     );
}
 
export default Wallet;