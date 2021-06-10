import {useContext, useState, useEffect} from 'react'
import { UserContext } from "../contexts/UserContext";
import { AuthContext } from '../contexts/AuthContext';
import { FirestoreContext} from '../contexts/FirestoreContext';
import {CircularProgress} from '@material-ui/core';
import {MainButton} from './reusable/MainButton';
import { Alert } from '@material-ui/lab';



const Settings = () => {
    
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(UserContext);
    const {sendDataReset} = useContext(FirestoreContext);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');


    const handleReset = async () => {
        setIsPending(true);
        try {
            await sendDataReset(currentUser.uid);
            setIsPending(false);
        }
        catch {
            setError('Failed to reset data! Try again. ')
        }
    }

    useEffect(() => {
        if (!data) return;
      }, [data]);


    return data ? ( 
        <div className="centered">
            <h2 className="overview-title">Settings</h2>
            <p><b style={{marginRight: 10}}>E-mail:</b> {currentUser.email}</p>
            {!isPending && <MainButton color="secondary" variant="contained" onClick={handleReset}>Reset Data</MainButton>}
            {error && <Alert variant="filled" severity="error">{error}</Alert>}
            {isPending && <div className="centered"><CircularProgress size='6rem'/></div>}
        </div>
     ) : (
        <div className="centered"><CircularProgress size='6rem'/></div>
        )
}
 
export default Settings;