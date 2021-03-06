import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Modal} from '@material-ui/core';
import { useState } from 'react';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#EEE',
      fontSize: '1.3rem',
      fontWeight: 'bold'
    },
    body: {
        fontSize: '1rem'
    },
  }))(TableCell);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    table: {
        minWidth: 500
    }
  }));


const ModelAssetList = ({user}) => {

    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const modalStyle = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
      }

    return ( 
        <div>
            <div className="assets-list">
                <h2 className="heading-info">MODEL ASSETS LIST</h2>
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
                                        <StyledTableCell align="center">{asset.percentage * user.startingAssets / 100}</StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            <div className="model-assets-buttons">
                <Button onClick={handleOpen}>Show Initial Assets</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h1>AAAAAAAAA</h1>
                    </div>
                </Modal>
                <Button>Edit Assets</Button>
                <Button>Real Wallet</Button>
                {/* <p className="heading-info">Initial assets:  &nbsp; {user.startingAssets} zł</p> */}
            </div>
        </div>
     );
}
 
export default ModelAssetList;