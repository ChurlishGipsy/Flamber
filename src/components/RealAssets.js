import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from '@material-ui/core';
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

const RealAssets = () => {
    const {data} = useContext(UserContext);
    const classes = useStyles();

    useEffect(() => {
      if (!data) return;
    }, [data]);


    return data ? ( 
        <div className="centered">
            <h2 className="heading-info">REAL ASSETS</h2>
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
            <div className="bottom-buttons">
            <Link style={{ textDecoration: 'none' }} to="/"><MainButton>Model Wallet</MainButton></Link>
                <MainButton>Update Wallet</MainButton>
            </div>
        </div>
     ) : (
      <div className="centered"><CircularProgress size='6rem'/></div>
     );
}
 
export default RealAssets;