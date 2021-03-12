import AddIcon from '@material-ui/icons/Add';
import {TextField, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useState } from 'react'; 
import { makeStyles, withStyles} from '@material-ui/core/styles';

import {useHistory} from 'react-router-dom';
    
const CancelButton = withStyles(() => ({
    root: {
      color: 'red',
      fontSize: '1.4rem',
      fontWeight: 'bold',
    },
  }))(Button);

  const MainButton = withStyles(() => ({
    root: {
      color: '#E6AF2E',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  }))(Button);


const CreateWallet = () => {

    
    const [modelWallet, setModelWallet] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputPercentage, setInputPercentage] = useState('')
    const [nameHelperText, setNameHelperText] = useState('');
    const [percentageHelperText, setPercentageHelperText] = useState('');
    const [error, setError] = useState(false)
    const history = useHistory();

    const handleAdd = (e) => {
        e.preventDefault();
        const newAsset = {
            name: inputName,
            percentage: inputPercentage,
            id: modelWallet.length + 1
        }
        setModelWallet([...modelWallet, newAsset]);
        setInputName('');
        setInputPercentage('');
    }

    const handleCancel = () => {
        setModelWallet([]);
        setInputName(null);
        setInputPercentage(null);
        setNameHelperText(null);
        setPercentageHelperText(null);
        setError(null);
        history.push('/')
    }

    const handleSave = (e) => {
        e.preventDefault();

    }


    
    return ( 
        <div className="create-wallet-container">
            <h1 className="title">Create Model Wallet Asset List</h1>
            <form onSubmit={handleAdd}>
                <div className="wallet-form">
                    <p className="label">Asset name</p>
                    <p className="label">%</p>
                    <div></div>
                    <TextField
                    value={inputName}
                    required
                    onChange={(e) => setInputName(e.target.value)}
                    className="test" 
                    margin="normal"/>
                    <TextField
                    value={inputPercentage}
                    required
                    onChange={(e) => setInputPercentage(e.target.value)}
                    margin="normal" />
                    <MainButton className="action-btn add-btn"  onClick={handleAdd}><AddIcon fontSize="large"/></MainButton>
                </div>
                
                <div className="bottom-buttons">
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                    <MainButton onClick={handleSave}>Save</MainButton>
                </div>
            </form>
        </div>
     );
}
 
export default CreateWallet;