import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function Menu({ selectProps, innerProps, children }) {
  const { classes } = selectProps;
  return (
    <Paper
      square
      className={classes.paper}
      {...innerProps}
    >
      {children}
    </Paper>
  );
}
