import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from '@material-ui/core';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';


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
      color: '#E6AF2E',
      fontSize: '1.2rem',
      fontWeight: 'bold',
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

const ModelAssetList = ({user, hasChanged, rerender}) => {

    const [open, setOpen] = useState(false);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [newAmount, setNewAmount] = useState(null);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);
    const classes = useStyles();
    

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

      const onChange = (e) => {
        setNewAmount(e.target.value);
      }


      const handleSave = (e) => {
        e.preventDefault();      
        console.log(newAmount);   
        if (!isNaN(newAmount)) {
          if (newAmount !== '' && newAmount !== null) {
            setError(false);
            fetch('http://localhost:8000/user', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  doesWalletExist: user.doesWalletExist,
                  initialAssets: parseFloat(newAmount),
                  currentAssets: user.currentAssets,
                  modelWallet: user.modelWallet,
                  realWallet: user.realWallet
                })
              }).then(() => {
                setNewAmount(null);
                setIsBeingEdited(false);
                setOpen(false);
                hasChanged(!rerender); 
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

    return ( 
        <div>
            <div className="assets-list">
                <h2 className="heading-info">MODEL WALLET ASSETS LIST</h2>
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
                                {user.modelWallet.map((asset) => (
                                    <TableRow key={asset.id}>
                                        <StyledTableCell align="center">{asset.name}</StyledTableCell>
                                        <StyledTableCell align="center">{asset.percentage}</StyledTableCell>
                                        <StyledTableCell align="center">{(asset.percentage * user.initialAssets / 100).toFixed(2).toString().replace(/\./g, ',')}</StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            <div className="model-assets-buttons">
                <MainButton onClick={handleOpen}>Show Initial Assets</MainButton>
                <Modal
                    open={open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    disableBackdropClick
                >
                    <div style={modalStyle} className={classes.paper}>
                      {!isBeingEdited && 
                      <div>
                        <h1 className="modal-info">Initial Model Assets: <b>{user.initialAssets}</b> zł</h1>
                        <div className="bottom-buttons">
                            <CancelButton onClick={handleClose}>Cancel</CancelButton>
                            <MainButton onClick={handleEdit}>Edit</MainButton>
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
                               onChange={onChange}
                               helperText={helperText}
                               error={error}/>
                            </form>
                          </div>
                          <div className="bottom-buttons">
                            <CancelButton onClick={handleClose}>Cancel</CancelButton>
                            <MainButton onClick={handleSave}>Save</MainButton>
                          </div>
                      </div>
                      }
                    </div>
                </Modal>
                <Link style={{ textDecoration: 'none' }} to={{
                  pathname: '/create',
                  state: {
                    userData: user
                  }
                }}><MainButton>Edit Assets</MainButton></Link>
                <MainButton>Real Wallet</MainButton>
            </div>
        </div>
     );
};
 
export default ModelAssetList;