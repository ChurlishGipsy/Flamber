import { Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

export const MainButton = withStyles(() => ({
    root: {
      fontSize: '1.4rem',
      fontWeight: 'bold'
    },
  }))(Button);