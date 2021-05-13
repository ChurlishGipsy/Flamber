import {Link, useHistory} from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {CircularProgress, TextField} from '@material-ui/core';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {MainButton} from './reusable/MainButton';
import {CancelButton} from './reusable/CancelButton';
import {StyledTableCell} from './reusable/StyledTableCell';


  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '50%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 1),
    },
    table: {
        minWidth: 500
    }
  }));

const UpdateAssets = () => {

  const {data, setData} = useContext(UserContext);
  const [modelWallet, setModelWallet] = useState([]);
  const [realWallet, setRealWallet] = useState([]);
  const [assetValue, setAssetValue] = useState('');
  const [assetHelperText, setAssetHelperText] = useState('');
  const [assetError, setAssetError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const classes = useStyles();
  const history = useHistory();

    const handleAdd = (id) => {
      if (!isNaN(assetValue.replace(/,/g, '.')) && assetValue !== '') {
        setAssetHelperText('');
        setAssetError(false);
        const newModelWallet = modelWallet.filter(asset => asset.id !== id);
        const asset = {
          name: modelWallet[0].name,
          value: parseFloat(assetValue.replace(/,/g, '.')),
          id: id
        }
        console.log(asset)
        setRealWallet([...realWallet, asset]);
        setModelWallet(newModelWallet);
      }        
      else {
        setAssetHelperText('Invalid format. Please try again. ');
        setAssetError(true);
      }
        setAssetValue('');
        
    }; 

    const handleUpdate = () => {

        if (modelWallet.length === 0) {
          const date = new Date();
          const currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
          let currentAssets = 0;
          for (const asset of realWallet) {
            currentAssets += asset.value;
          }
          const updatedWallet = {
            realWallet,
            date: currentDate, 
            currentAssets
          }
          const updatedData = {
            doesWalletExist: data.doesWalletExist,
            modelWallet: data.modelWallet,
            realWalletUpdates: [...data.realWalletUpdates, updatedWallet],
            creationDate: data.creationDate
          }       
          setIsPending(true)   
          fetch('http://localhost:8000/user', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
            }).then(() => {
            setData(updatedData);
            setIsPending(false);
            history.push('/real-assets');
                }) 
        }
        

      }

    useEffect(() => {
        if (!data) return;
        else if ( data && realWallet.length === 0 ){
        setModelWallet(data.modelWallet);
        }
      }, [data, realWallet, modelWallet]);

    return data ?  ( 
        <div className="centered">
            <h2 className="heading-info">UPDATE ASSETS</h2>
            <div className="assets-list">
              {!isPending && <TableContainer component={Paper}>
                <Table className={classes.table}>
                      <TableHead>
                          <TableRow>
                                  <StyledTableCell align="center">Model Asset Name </StyledTableCell>
                                  <StyledTableCell align="center">Value</StyledTableCell>
                                  <StyledTableCell align="center"></StyledTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                        {realWallet.map((asset) => (
                          <TableRow key={asset.id}>
                            <StyledTableCell align="center">{asset.name} </StyledTableCell>
                            <StyledTableCell align="center">{asset.value.toFixed(2).toString().replace(/\./g, ',')} zł</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                          </TableRow>
                        ))}
                        {modelWallet.map((asset) => (
                            <TableRow key={asset.id}>
                                <StyledTableCell align="center">{asset.name}</StyledTableCell>
                                {asset === modelWallet[0] && <StyledTableCell align="center"><TextField value={assetValue} error={assetError} helperText={assetHelperText} onChange={(e) => setAssetValue(e.target.value)}></TextField></StyledTableCell>}
                                {asset === modelWallet[0] && <StyledTableCell align="center"><MainButton color="primary" variant="text" onClick={() => handleAdd(asset.id)}><AddIcon/></MainButton></StyledTableCell>}
                                {asset !== modelWallet[0] && <StyledTableCell align="center"></StyledTableCell>}
                                {asset !== modelWallet[0] && <StyledTableCell align="center"></StyledTableCell>}
                            </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>}
              {isPending && <div className="centered"><CircularProgress size='6rem'/></div>}
            </div>
            <div className="bottom-buttons">
                <Link style={{ textDecoration: 'none' }} to="/real-assets"><CancelButton color="primary" variant="text">Cancel</CancelButton></Link>
                <MainButton color="secondary" variant="contained" onClick={handleUpdate}>Update</MainButton>
            </div>
        </div>
     ) : (
        <div className="centered"><CircularProgress size='6rem'/></div>
       );
};
 
export default UpdateAssets;