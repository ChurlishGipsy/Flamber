import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';



export const CancelButton = withStyles(() => ({
    root: {
      color: 'red',
      fontSize: '1.6rem',
      fontWeight: 'bold',
    },
  }))(Button);