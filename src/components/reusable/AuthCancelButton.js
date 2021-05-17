import {Button} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';

export const AuthCancelButton = withStyles(() => ({
    root: {
      color: 'red',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
  }))(Button);