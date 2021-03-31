import {useContext, useState, useEffect} from 'react'
import {Button} from '@material-ui/core'
import { UserContext } from "../contexts/UserContext";
import {CircularProgress} from '@material-ui/core';






const Settings = () => {
    const {data, setData} = useContext(UserContext)
    const [isPending, setIsPending] = useState(false);

    const handleReset = () => {
        setIsPending(true);
        const emptyData = {
            doesWalletExist: false,
            initialAssets: null,
            currentAssets: null,
            modelWallet: [],
            realWallet: []
        }
        fetch('http://localhost:8000/user', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(emptyData)
            }).then(() => {
            setData(emptyData)
            setIsPending(false);
        })
    }

    useEffect(() => {
        if (!data) return;
      }, [data]);


    return data ? ( 
        <div className="centered">

            {!isPending && <Button color="secondary" onClick={handleReset}>Reset Data</Button>}
            {isPending && <div className="centered"><CircularProgress size='6rem'/></div>}
        </div>
     ) : (
        <div className="centered"><CircularProgress size='6rem'/></div>
        )
}
 
export default Settings;