import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import {CircularProgress} from '@material-ui/core';
import empty from '../assets/empty.png';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import DragHandleIcon from '@material-ui/icons/DragHandle';

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


const MainButton = withStyles(() => ({
  root: {
    fontSize: '1.3rem',
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



const RealAssets = () => {
    const {data} = useContext(UserContext);
    const classes = useStyles();

    useEffect(() => {
      if (!data) return;
      else console.log(data);
    }, [data]);


    return data ? ( 
        <div className="centered">
            <h2 className="heading-info">REAL ASSETS</h2>
            <div className="assets-list">
            {data.realWalletUpdates.length > 0 && <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Asset Name </StyledTableCell>
                                    <StyledTableCell align="center">Value</StyledTableCell>
                                    <StyledTableCell align="center">Composition</StyledTableCell>
                                    <StyledTableCell align="center">Deviation</StyledTableCell>
                                    <StyledTableCell align="center">Deviation Value</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.realWalletUpdates[data.realWalletUpdates.length - 1].realWallet.map((asset) => (
                                    <TableRow key={asset.id}>
                                        <StyledTableCell align="center">{asset.name}</StyledTableCell>
                                        <StyledTableCell align="center">{asset.value.toFixed(2).toString().replace(/\./g, ',')} zł</StyledTableCell>
                                        <StyledTableCell align="center">{100*(asset.value / data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets).toFixed(3) } %</StyledTableCell>
                                        <StyledTableCell align="center">
                                          {100*(asset.value / data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets).toFixed(4) > data.modelWallet[asset.id-1].percentage 
                                          && <TrendingUpIcon  style={{ color: '#00b418' }}/> }
                                          {100*(asset.value / data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets).toFixed(4) === data.modelWallet[asset.id-1].percentage 
                                          && <DragHandleIcon style={{ color: '#E6AF2E'}}/>}
                                          {100*(asset.value / data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets).toFixed(4) < data.modelWallet[asset.id-1].percentage 
                                          && <TrendingDownIcon style={{ color: '#ff0000' }}/>}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {(asset.value - data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets * (data.modelWallet[asset.id-1].percentage/100)).toFixed(2).toString().replace(/\./g, ',')} zł
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                    {data.realWalletUpdates.length === 0 && 
                    <div className="starting-message">
                      <img src={empty} alt="Empty Wallet Icon"/>
                      <p className="starting-info">It seems that your wallet is empty. To start, please update your model wallet with real value of assets you've invested in. </p> 
                      
                    </div>}
            </div>
            <div className="bottom-buttons">
              <Link style={{ textDecoration: 'none' }} to="/"><MainButton color="primary" variant="text">Model Wallet</MainButton></Link>
              <Link style={{ textDecoration: 'none' }} to="/update-assets"><MainButton color="secondary" variant="contained">Update Assets</MainButton></Link>
            </div>
        </div>
     ) : (
      <div className="centered"><CircularProgress size='6rem'/></div>
     );
};
 
export default RealAssets;