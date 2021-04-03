import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LineChart from './dashboard/LineChart';
import {useContext, useEffect} from 'react';
import {UserContext} from '../contexts/UserContext';
import {CircularProgress} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 50
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
  }));



const Overview = () => {


    const {data} = useContext(UserContext);
    const classes = useStyles();

    useEffect(() => {
        if (!data) return;
      }, [data]);

    return data ? ( 
        <div className={classes.root}>
             <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <h1>Wallet Overview</h1>
                </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <LineChart/>
                </Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
            </Grid>
        </div>
     ) : (
        <div className="centered"><CircularProgress size='6rem'/></div>
       );
}
 
export default Overview;