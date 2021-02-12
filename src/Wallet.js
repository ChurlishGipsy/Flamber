import { useState } from 'react';
const Wallet = () => {

    const [doesWalletExist, setDoesWalletEist] = useState(false);

    return ( 
        <div className="wallet">
            {!doesWalletExist && 
            <div className="no-wallet">
                <p>
                    It seems you don't have a wallet.
                    <br></br>
                     Would you like to create it?  
                </p>
                <button className="action-btn create-wallet-btn">Create Wallet</button>
            </div>
            }
        </div>
     );
}
 
export default Wallet;