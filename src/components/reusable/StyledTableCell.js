import {  withStyles} from '@material-ui/core/styles';
import {TableCell} from '@material-ui/core';

export const StyledTableCell = withStyles(() => ({
    head: {
      backgroundColor: '#EEE',
      fontSize: '1.3rem',
      fontWeight: 'bold'
    },
    body: {
        fontSize: '1rem'
    },
  }))(TableCell);