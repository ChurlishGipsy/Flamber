import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateWallet from './CreateWallet';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        
    }
})

const Wallet = () => {

    const [userData, setUserData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [doesWalletExist, setDoesWalletExist] = useState(false);
    const [isBeingCreated, setIsBeingCreated] = useState(false);
    const classes = useStyles();
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
                <div>
                    <div className="assets-list">
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nazwa aktywa </TableCell>
                                        <TableCell align="center">Skład [%]</TableCell>
                                        <TableCell align="center">Skład [zł]</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    {/* {userData.modelWallet.map((asset) => (
                 <div key={asset.id}>
                     <p>{asset.name}</p>
                  </div>
                    ))} */}
                </div>
            }
            {!userData && !isPending &&  !doesWalletExist && !isBeingCreated &&
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