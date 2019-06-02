import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { darkBlue } from '../Styles/constants';

const Spinner = withStyles({
  root: {
    color: darkBlue,
  },
})(CircularProgress);

export default function LoadingSpinner() {
  return (
    <Spinner size="5rem" thickness={6} />
  );
}
