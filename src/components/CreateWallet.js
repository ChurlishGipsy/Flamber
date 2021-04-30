import AddIcon from '@material-ui/icons/Add';
import {Modal, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useState, useEffect,  useContext } from 'react'; 
import {useHistory} from 'react-router-dom';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { UserContext } from '../contexts/UserContext';

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
      
    const { data, setData } = useContext(UserContext);
    const [modelWallet, setModelWallet] = useState([]);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [percentageSum, setPercentageSum] = useState(0);  
    const [inputName, setInputName] = useState('');
    const [inputPercentage, setInputPercentage] = useState('')
    const [initialAssets, setInitialAssets] = useState('');
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

    useEffect(() => {
        if (!data) return;
        else {
            setModelWallet(data.modelWallet);
            if (data.modelWallet.length) {
                setIsBeingEdited(true);
            }
            let sum = 0;
            for (const asset of data.modelWallet) {
                sum += asset.percentage;
            }
            setPercentageSum(sum);
        }
      }, [data]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (isNaN((inputPercentage)) || inputPercentage === '0' || inputPercentage === '') {
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
            const date = new Date();
            const currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            const updatedData = {
                doesWalletExist: true,
                modelWallet: modelWallet,
                realWalletUpdates: [],
                creationDate: currentDate
                }
            fetch('http://localhost:8000/user', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
            }).then(() => {
            setData(updatedData)
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
        if (!isBeingEdited) {
            setInitialAssetsOpen(true);
        }
        else {
            const updatedWallet = {
                doesWalletExist: data.doesWalletExist,
                modelWallet: modelWallet,
                realWalletUpdates: data.realWalletUpdates,
                creationDate: data.creationDate
                }
            setIsPending(true);
            fetch('http://localhost:8000/user', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedWallet)
            }).then(() => {
            setData(updatedWallet);
            setIsPending(false);
            history.push('/');
                }) 
        }
    }


    
    return data ? (
        <div className="centered">
            {!isPending && <div style={{minWidth: '90%'}}>
            {modelWallet.length === 0 && <h1 className="title">Create Model Wallet</h1>}
            {modelWallet.length > 0 && <h1 className="title">Edit Model Wallet</h1>}
            <form onSubmit={handleAdd}>
                {percentageSum !== 100 && <div className="wallet-form">
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
                    <MainButton color="primary" className="action-btn add-btn"  onClick={handleAdd}><AddIcon fontSize="large"/></MainButton>
                </div>}
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
                                        <StyledTableCell align="center">{asset.percentage.toString().replace(/\./g, ',')}</StyledTableCell>
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
                    {!isBeingEdited && modelWallet.length > 0 && <MainButton color="secondary" variant="contained" onClick={handleSave}>Continue</MainButton>}
                    {!isBeingEdited &&modelWallet.length === 0 &&<MainButton disabled>Continue</MainButton>}
                    {isBeingEdited && modelWallet.length === 0 &&<MainButton disabled>Save</MainButton>}
                    {isBeingEdited && modelWallet.length > 0 && percentageSum !== 100 &&<MainButton disabled>Save</MainButton>}
                    {isBeingEdited && modelWallet.length > 0 && percentageSum === 100 && <MainButton color="secondary" variant="contained" onClick={handleSave}>Save</MainButton>}
                </div>
            </form>
            <Modal
                    open={initialAssetsOpen}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    disableBackdropClick>
                    <div style={modalStyle} className={classes.paper}>
                      {percentageSum === 100 && <div>
                        <p className="modal-info">Do you want to save your model wallet?</p>
                        {/* <div className="centered-container">
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
                        </div> */}
                        <div className="bottom-buttons" style={{paddding: 0}}>
                            <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
                            <MainButton color="primary" onClick={handleAssetsSave}>Save</MainButton>
                        </div>
                      </div>}
                      {percentageSum !== 100 && 
                      <div className="centered-container">
                        <p className="modal-error-info">Your total model wallet assets percentage is not equal 100%! Please make adjustments and try again.</p>
                        <MainButton color="primary" onClick={handleModalClose}>Continue</MainButton>    

                      </div>
                      }
                      
                      
                    </div>
                </Modal>
            </div>}
            {isPending && <CircularProgress size='6rem'/>}
        </div>
     ) : (
        <div className="centered"><CircularProgress size='6rem'/></div>
     );
}
 
export default CreateWallet;