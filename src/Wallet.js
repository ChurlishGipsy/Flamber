import { useState } from 'react';
import CreateWallet from './CreateWallet';

const Wallet = () => {

    const [doesWalletExist, setDoesWalletExist] = useState(false);
    const [isBeingCreated, setIsBeingCreated] = useState(false);

    const createWallet = () => {
        setIsBeingCreated(true);
    };

    return ( 
        <div className="wallet">
            {!doesWalletExist && !isBeingCreated &&
            <div className="no-wallet">
                {/* <img className="wallet-img" src={walletImg} alt="Wallet"/> */}
                <p className="text-info">
                    It seems you don't have a wallet.
                    <br></br>
                     Would you like to create it?  
                </p>
                <button className="action-btn create-wallet-btn" onClick={() => createWallet()}>Create Wallet</button>
            </div>
            }
            {!doesWalletExist && isBeingCreated && 
                <CreateWallet/>
            }
        </div>
     );
}
 
export default Wallet;