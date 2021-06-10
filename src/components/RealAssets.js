import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import {CircularProgress} from '@material-ui/core';
import empty from '../assets/empty.png';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import percentRound from 'percent-round';
import {MainButton} from './reusable/MainButton';
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



const RealAssets = () => {
    const {data} = useContext(UserContext);
    const classes = useStyles();


    // const calcValue = (value, overallAssets) => {
    //   const decimalValue = new Big(value);
    //   const decimalOverallAssets = new Big(overallAssets);
    //   console.log(decimalValue.div(decimalOverallAssets))
    //   return decimalValue.div(decimalOverallAssets).times(100).round(2).toString();
    // }

    const calcPercentage = (index) => {
      let composition = [];
      if (data) {
        data.realWalletUpdates[data.realWalletUpdates.length - 1].realWallet.forEach((asset) => {
          composition.push(100*(asset.value / data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets))
        })
      const calculatedComposition = percentRound(composition,2)
      return calculatedComposition[index].toFixed(2);
      } 
    }

    useEffect(() => {
      if (!data) return;  
    }, [data]);


    return data ? ( 
        <div className="centered">
            <h1 className="heading-info">REAL ASSETS</h1>
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
                                {data.realWalletUpdates[data.realWalletUpdates.length - 1].realWallet.map((asset, index) => (
                                    <TableRow key={asset.id}>
                                        <StyledTableCell align="center">{asset.name}</StyledTableCell>
                                        <StyledTableCell align="center">{asset.value.toFixed(2).toString().replace(/\./g, ',')} zł</StyledTableCell>
                                        <StyledTableCell align="center">{calcPercentage(index)} %</StyledTableCell>
                                        <StyledTableCell align="center">
                                          {100*(asset.value / data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets).toFixed(4) > data.modelWallet[asset.id-1].percentage 
                                          && <div className="parallel">
                                            <p>+ {(calcPercentage(index) - data.modelWallet[index].percentage).toFixed(2) } %</p>
                                            <TrendingUpIcon  style={{ color: '#00b418' }}/> 
                                          </div>}
                                          {100*(asset.value / data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets).toFixed(4) === data.modelWallet[asset.id-1].percentage 
                                          && <div className="parallel">
                                            <p>  0.00 %</p>
                                            <DragHandleIcon style={{ color: '#E6AF2E'}}/>
                                          </div>}
                                          {100*(asset.value / data.realWalletUpdates[data.realWalletUpdates.length - 1].currentAssets).toFixed(4) < data.modelWallet[asset.id-1].percentage 
                                          && <div className="parallel">
                                            <p>- {(data.modelWallet[index].percentage - calcPercentage(index)).toFixed(2) } %</p>
                                            <TrendingDownIcon style={{ color: '#ff0000' }}/>
                                          </div> }
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
              <Link style={{ textDecoration: 'none' }} to="/model-assets"><MainButton color="primary" variant="text">Model Wallet</MainButton></Link>
              <Link style={{ textDecoration: 'none' }} to="/update-assets"><MainButton color="secondary" variant="contained">Update Assets</MainButton></Link>
            </div>
        </div>
     ) : (
      <div className="centered"><CircularProgress size='6rem'/></div>
     );
};
 
export default RealAssets;