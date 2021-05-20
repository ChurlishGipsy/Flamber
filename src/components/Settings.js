import {useContext, useState, useEffect} from 'react'
import { UserContext } from "../contexts/UserContext";
import {CircularProgress} from '@material-ui/core';
import {MainButton} from './reusable/MainButton';
import { AuthContext } from '../contexts/AuthContext';
import { Grid } from '@material-ui/core';




const Settings = () => {
    
    const {currentUser} = useContext(AuthContext);
    const {data, setData} = useContext(UserContext)
    const [isPending, setIsPending] = useState(false);

    const handleReset = () => {
        setIsPending(true);
        const emptyData = {
            doesWalletExist: false,
            modelWallet: [],
            realWalletUpdates: [],
            creationDate: null
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
            <h2 className="overview-title">Settings</h2>
            <p><b style={{marginRight: 10}}>E-mail:</b> {currentUser.email}</p>
            {!isPending && <MainButton color="secondary" variant="contained" onClick={handleReset}>Reset Data</MainButton>}
            {isPending && <div className="centered"><CircularProgress size='6rem'/></div>}
        </div>
     ) : (
        <div className="centered"><CircularProgress size='6rem'/></div>
        )
}
 
export default Settings;