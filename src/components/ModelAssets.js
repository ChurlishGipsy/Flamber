import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from '@material-ui/core';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import {CircularProgress} from '@material-ui/core';


    const StyledTableCell = withStyles(() => ({
      head: {
        backgroundColor: '#EEE',
        fontSize: '1.3rem',
        fontWeight: 'bold'
      },
      body: {
          fontSize: '1rem'
      },
    }))(TableCell);

  const CancelButton = withStyles(() => ({
    root: {
      color: 'red',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
  }))(Button);

  const MainButton = withStyles(() => ({
    root: {
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
  }))(Button);

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

  const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  };

const ModelAssets = () => {

    const {data, setData} = useContext(UserContext)
    const [open, setOpen] = useState(false);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [newAmount, setNewAmount] = useState(null);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);
    const classes = useStyles();
    
    useEffect(() => {
      if (!data) return;
    }, [data]);

    const handleOpen = () => {
        setOpen(true);      
      };
    
      const handleClose = () => {
        setOpen(false);
        setIsBeingEdited(false);
      };

      const handleEdit = () => {
        setIsBeingEdited(true);
      };

      const handleSave = (e) => {
        e.preventDefault();      
        if (!isNaN(newAmount)) {
          if (newAmount !== '' && newAmount !== null) {
            setError(false);
            const updatedData = {
              doesWalletExist: data.doesWalletExist,
              initialAssets: parseFloat(newAmount),
              modelWallet: data.modelWallet,
              realWalletUpdates: data.realWalletUpdates
            }
            fetch('http://localhost:8000/user', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(updatedData)
              }).then(() => {
                setNewAmount(null);
                setIsBeingEdited(false);
                setOpen(false);
                setData(updatedData)
            }) 
          } else {
            setHelperText('Please enter valid assets amount.');
            setError(true);
          }
          
        } else {
          setHelperText('Invalid format. Please try again.');
          setError(true);
        }
      }

    return data ? ( 
        <div className="centered">
            <h2 className="heading-info">MODEL WALLET ASSETS</h2>
            <div className="assets-list">
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Model Asset Name </StyledTableCell>
                                    <StyledTableCell align="center">Composition %</StyledTableCell>
                                    <StyledTableCell align="center">Composition zł</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.modelWallet.map((asset) => (
                                    <TableRow key={asset.id}>
                                        <StyledTableCell align="center">{asset.name}</StyledTableCell>
                                        <StyledTableCell align="center">{asset.percentage}</StyledTableCell>
                                        <StyledTableCell align="center">{(asset.percentage * data.initialAssets / 100).toFixed(2).toString().replace(/\./g, ',')}</StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            <div className="model-assets-buttons">
                <MainButton color="primary" variant="text" onClick={handleOpen}>Show Initial Assets</MainButton>
                <Modal
                    open={open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    disableBackdropClick
                >
                    <div style={modalStyle} className={classes.paper}>
                      {!isBeingEdited && 
                      <div>
                        <h1 className="modal-info">Initial Model Assets: <b>{data.initialAssets}</b> zł</h1>
                        <div className="bottom-buttons">
                            <CancelButton onClick={handleClose}>Cancel</CancelButton>
                            <MainButton color="secondary" variant="contained" onClick={handleEdit}>Edit</MainButton>
                        </div>
                      </div>
                      }
                      {isBeingEdited && 
                      <div>
                        <h1 className="modal-info">Enter new amount:</h1>
                          <div className="centered-container">
                            <form onSubmit={handleSave}>
                              <TextField
                              color="primary"
                              required
                              variant="outlined"
                               label="Amount"
                               onChange={(e) => setNewAmount(e.target.value)}
                               helperText={helperText}
                               error={error}/>
                            </form>
                          </div>
                          <div className="bottom-buttons">
                            <CancelButton onClick={handleClose}>Cancel</CancelButton>
                            <MainButton color="secondary" variant="contained" onClick={handleSave}>Save</MainButton>
                          </div>
                      </div>
                      }
                    </div>
                </Modal>
                <Link style={{ textDecoration: 'none' }} to="/create"><MainButton color="primary" variant="text">Edit Assets</MainButton></Link>
                <Link  style={{ textDecoration: 'none '}} to="/real-assets"><MainButton color="primary" variant="text">Real Wallet</MainButton></Link>
            </div>
        </div>
     ) : (
      <div className="centered"><CircularProgress size='6rem'/></div>
     )
};
 
export default ModelAssets;