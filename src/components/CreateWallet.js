import { useState, useEffect,  useContext } from 'react'; 
import {useHistory} from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import save from '../assets/save.png'
import ErrorIcon from '@material-ui/icons/Error';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import {CircularProgress} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import {MainButton} from './reusable/MainButton';
import {CancelButton} from './reusable/CancelButton';
import {StyledTableCell} from './reusable/StyledTableCell';
import {Modal, TextField, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { db } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import { FirestoreContext } from '../contexts/FirestoreContext';



  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '50%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 1)
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
    const {currentUser} =useContext(AuthContext);
    const {sendRealWalletUpdate} = useContext(FirestoreContext);
    const [modelWallet, setModelWallet] = useState([]);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [percentageSum, setPercentageSum] = useState(0);  
    const [inputName, setInputName] = useState('');
    const [inputPercentage, setInputPercentage] = useState('')
    const [nameHelperText, setNameHelperText] = useState('');
    const [percentageHelperText, setPercentageHelperText] = useState('');
    const [nameError, setNameError] = useState(false)
    const [percentageError, setPercentageError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
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
        if (!isNaN(inputPercentage.replace(/,/g, '.')) && inputPercentage !== '0' && inputPercentage !== '') {
            if (inputName === '') {
                setNameHelperText('Please enter a valid asset name');
                setNameError(true);
                setInputName('');
            } else {
                const newAsset = {
                    name: inputName,
                    percentage: parseFloat(inputPercentage.replace(/,/g, '.')),
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
        else  {
            setPercentageHelperText('Invalid format. Please try again.');
            setPercentageError(true);
            setInputPercentage('');
            if (inputName === '') {
                setNameHelperText('Please enter a valid asset name');
                setNameError(true);
                setInputName('');
            }
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
        history.push('/model-assets')
    }

    const handleWalletSave = async (e) => {
        e.preventDefault();
        setIsPending(true);
        const date = new Date();
        const currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        const updatedData = {
            doesWalletExist: true,
            modelWallet: modelWallet,
            realWalletUpdates: [],
            creationDate: currentDate
        }
        try {
            await sendRealWalletUpdate(updatedData, currentUser.uid);
            setIsPending(false);
            history.push('/model-assets');
        } catch (error) {
            console.error("Error occured: ", error);
        }
        setModalOpen(false);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        if (!isBeingEdited) {
            setModalOpen(true);
        }
        else {
            const updatedWallet = {
                doesWalletExist: data.doesWalletExist,
                modelWallet: modelWallet,
                realWalletUpdates: data.realWalletUpdates,
                creationDate: data.creationDate
            }
            setIsPending(true);
            db.collection("users").doc(currentUser.uid).set(updatedWallet).then(() => {
                setData(updatedWallet);
                setIsPending(false);
                history.push('/model-assets');
            })
            .catch((error) => {
                console.error("Error occured: ", error);
            });
            // fetch('http://localhost:8000/user', {
            // method: 'PUT',
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify(updatedWallet)
            // }).then(() => {
            // setData(updatedWallet);
            // setIsPending(false);
            // history.push('/model-assets');
            // }) 
        }
    }


    
    return data ? (
        <div className="centered">
            {!isPending && <div style={{minWidth: '90%'}}>
            {modelWallet.length === 0 && <h1 className="heading-info">Create Model Wallet</h1>}
            {modelWallet.length > 0 && <h1 className="heading-info">Edit Model Wallet</h1>}
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
                    <MainButton color="primary" onClick={handleAdd}><AddIcon fontSize="large"/></MainButton>
                </div>}
                {modelWallet.length > 0 && 
                <div className="assets-list">
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Model Asset Name </StyledTableCell>
                                    <StyledTableCell align="center">Composition</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {modelWallet.map((asset) => (
                                    <TableRow key={asset.id}>
                                        <StyledTableCell align="center">{asset.name}</StyledTableCell>
                                        <StyledTableCell align="center">{asset.percentage.toString().replace(/,/g, '.')} %</StyledTableCell>
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
                    {!isBeingEdited && modelWallet.length > 0 && <MainButton color="secondary" variant="contained" onClick={handleEdit}>Continue</MainButton>}
                    {!isBeingEdited &&modelWallet.length === 0 &&<MainButton disabled>Continue</MainButton>}
                    {isBeingEdited && modelWallet.length === 0 &&<MainButton disabled>Save</MainButton>}
                    {isBeingEdited && modelWallet.length > 0 && percentageSum !== 100 &&<MainButton disabled>Save</MainButton>}
                    {isBeingEdited && modelWallet.length > 0 && percentageSum === 100 && <MainButton color="secondary" variant="contained" onClick={handleEdit}>Save</MainButton>}
                </div>
            </form>
            <Modal
                    open={modalOpen}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    disableBackdropClick>
                    <div style={modalStyle} className={classes.paper}>
                      {percentageSum === 100 && <div className="centered-container">
                        <img style={{paddingTop: 50}} src={save} alt="Save Icon"/>
                        <p className="modal-info">Would you like to save your model wallet?</p>
                        <div className="modal-bottom-buttons" style={{paddding: '5px !important'}}>
                            <CancelButton onClick={() => setModalOpen(false)}>Cancel</CancelButton>
                            <MainButton color="secondary" variant="contained" onClick={handleWalletSave}>Save</MainButton>
                        </div>
                      </div>}
                      {percentageSum !== 100 && 
                      <div className="centered-container">
                        <div className="modal-header">
                            <p className="modal-header-info">Warning</p>
                            <ErrorIcon/>
                        </div>
                        <p className="modal-info">Your total model wallet assets percentage is not equal 100%! <br/> Please make adjustments and try again.</p>
                        <MainButton color="secondary" variant="contained" onClick={() => setModalOpen(false)}>Continue</MainButton>    
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