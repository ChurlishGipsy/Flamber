import { useState, useEffect } from 'react';
import CreateWallet from './CreateWallet';
import ModelAssetList from './ModelAssetList'


const Wallet = () => {

    const [userData, setUserData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [doesWalletExist, setDoesWalletExist] = useState(false);
    const [isBeingCreated, setIsBeingCreated] = useState(false);
    const createWallet = () => {
        setIsBeingCreated(true);
    };

    

    useEffect(() => {
        fetch('http://localhost:8000/user')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            setUserData(data);
            setDoesWalletExist(true);
        })
    },[])

    return ( 
        <div className="wallet">
            {userData && !isPending &&  doesWalletExist  &&
             <ModelAssetList user={userData}/>
            }
            {userData && !isPending &&  !doesWalletExist && !isBeingCreated &&
            <div className="no-wallet">
                <p>
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