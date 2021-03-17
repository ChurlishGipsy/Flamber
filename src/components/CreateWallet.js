import AddIcon from '@material-ui/icons/Add';
import {Modal, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useState } from 'react'; 
import {useHistory} from 'react-router-dom';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

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

const CreateWallet = () => {

    
    const [modelWallet, setModelWallet] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputPercentage, setInputPercentage] = useState('')
    const [initialAssets, setInitialAssets] = useState('');
    const [percentageSum, setPercentageSum] = useState(0);    
    const [nameHelperText, setNameHelperText] = useState('');
    const [initialAssetsHelperText, setInitialAssetsHelperText] = useState('')    
    const [percentageHelperText, setPercentageHelperText] = useState('');
    const [nameError, setNameError] = useState(false)
    const [percentageError, setPercentageError] = useState(false);
    const [initialAssetsError, setInitialAssetsError] = useState(false);
    const [initialAssetsOpen, setInitialAssetsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const classes = useStyles();


    const handleAdd = (e) => {
        e.preventDefault();
        if (isNaN((inputPercentage)) || inputPercentage === '0') {
            setPercentageHelperText('Invalid format. Please try again.');
            setPercentageError(true);
            setInputPercentage('');
            if (inputName === '') {
                setNameHelperText('Please enter a valid asset name');
                setNameError(true);
                setInputName('');
            }
        } else if (inputName === '') {
            setNameHelperText('Please enter a valid asset name');
            setNameError(true);
            setInputName('');
        }
        else {
            const newAsset = {
                    name: inputName,
                    percentage: parseFloat(inputPercentage),
                    id: modelWallet.length + 1
                }
                setPercentageSum(percentageSum + parseFloat(inputPercentage));
                setModelWallet([...modelWallet, newAsset]);
                setNameError(false);
                setPercentageError(false);
                setNameHelperText('');
                setPercentageHelperText();
                setInputName('');
                setInputPercentage('');
            }
    }

    const handleDelete = (id) => {
        setPercentageSum(percentageSum - modelWallet[id-1].percentage);
        const newModelWallet = modelWallet.filter(asset => asset.id !== id);
        for (const asset of newModelWallet) {
            if (asset.id > id) {
                asset.id -= 1;
            }
        }
        setModelWallet(newModelWallet);
    }

    const handleCancel = () => {
        history.push('/')
    }

    const handleModalClose = () => {
        setInitialAssets('')
        setInitialAssetsOpen(false);
    }

    const handleAssetsSave = (e) => {
        e.preventDefault();
        if (!isNaN(initialAssets) && initialAssets !== '') {
            setInitialAssetsError(false)
            setIsPending(true);
            fetch('http://localhost:8000/user', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                doesWalletExist: true,
                initialAssets: parseFloat(initialAssets),
                currentAssets: null,
                modelWallet: modelWallet,
                realWallet: []
                })
            }).then(() => {
            setIsPending(false);
            history.push('/');
                })
            setInitialAssetsOpen(false);
        } else {
            setInitialAssetsError(true);
            setInitialAssetsHelperText('Invalid format. Please try again.');
        }
        setInitialAssets('');
        

    }

    const handleSave = (e) => {
        e.preventDefault();
        setInitialAssetsOpen(true);
    }


    
    return (
        <div className="create-wallet-container">
            {!isPending && <div>
            <h1 className="title">Create Model Wallet Asset List</h1>
            <form onSubmit={handleAdd}>
                <div className="wallet-form">
                    <p className="label">Asset name</p>
                    <p className="label">%</p>
                    <div></div>
                    <TextField
                    value={inputName}
                    required
                    helperText={nameHelperText}
                    error={nameError}
                    onChange={(e) => setInputName(e.target.value)}
                    className="test" 
                    margin="normal"/>
                    <TextField
                    value={inputPercentage}
                    required
                    helperText={percentageHelperText}
                    error={percentageError}
                    onChange={(e) => setInputPercentage(e.target.value)}
                    margin="normal" />
                    <MainButton className="action-btn add-btn"  onClick={handleAdd}><AddIcon fontSize="large"/></MainButton>
                </div>
                {modelWallet.length > 0 && 
                <div className="assets-list">
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Model Asset Name </StyledTableCell>
                                    <StyledTableCell align="center">Composition %</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {modelWallet.map((asset) => (
                                    <TableRow key={asset.id}>
                                        <StyledTableCell align="center">{asset.name}</StyledTableCell>
                                        <StyledTableCell align="center">{asset.percentage}</StyledTableCell>
                                        <StyledTableCell align="center"><CancelButton onClick={() => handleDelete(asset.id)}><ClearIcon/></CancelButton></StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
            <div className="bottom-buttons">
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                    {modelWallet.length > 0 && <MainButton onClick={handleSave}>Continue</MainButton>}
                    {modelWallet.length === 0 &&<MainButton disabled>Continue</MainButton>}
                </div>
            </form>
            <Modal
                    open={initialAssetsOpen}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    disableBackdropClick
                >
                    <div style={modalStyle} className={classes.paper}>
                      {percentageSum === 100 && <div>
                        <h1 className="modal-info">Enter initial model assets</h1>
                        <div className="centered-container">
                        <form onSubmit={handleAssetsSave}>
                              <TextField
                              color="primary"
                              required
                              value={initialAssets}
                              variant="outlined"
                               label="Amount"
                               onChange={(e) => setInitialAssets(e.target.value)}
                               helperText={initialAssetsHelperText}
                               error={initialAssetsError}/>
                            </form>
                        </div>
                        <div className="bottom-buttons">
                            <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
                            <MainButton onClick={handleAssetsSave}>Save</MainButton>
                        </div>
                      </div>}
                      {percentageSum !== 100 && 
                      <div className="centered-container">
                        <p class="modal-error-info">Your total model wallet assets percentage is not equal 100%! Please make adjustments and try again.</p>
                        <MainButton onClick={handleModalClose}>Continue</MainButton>    

                      </div>
                      }
                      
                      
                    </div>
                </Modal>
            </div>}
            {isPending && <div className="centered"><CircularProgress size='6rem'/></div>}
        </div>
     );
}
 
export default CreateWallet;