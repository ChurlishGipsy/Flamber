import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LineChart from './dashboard/LineChart';
import {useContext, useEffect} from 'react';
import {UserContext} from '../contexts/UserContext';
import {CircularProgress} from '@material-ui/core';
import CurrentAssets from './dashboard/CurrentAssets';
import AssetsChange from './dashboard/AssetsChange';
import LastUpdate from './dashboard/LastUpdate';
import DoughtnutChart from './dashboard/DoughnutChart';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 50,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
    }
  }));



const Overview = () => {


    const {data} = useContext(UserContext);
    const classes = useStyles();

    useEffect(() => {
        if (!data) return;
      }, [data]);

    return data ? ( 
        <div className={classes.root}>
             <Grid container spacing={3} >
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <h2 className="overview-title">Wallet Overview</h2>
                </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                      <CurrentAssets/>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                      <AssetsChange/>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                      <LastUpdate/>
                    </Paper>
                </Grid>
                <Grid  item xs={6}>
                <Paper className={classes.paper}>
                    <LineChart/>
                </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <DoughtnutChart/>
                </Paper>
                </Grid>
            </Grid>
        </div>
     ) : (
        <div className="centered"><CircularProgress size='6rem'/></div>
       );
}
 
export default Overview;