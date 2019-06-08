import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Placeholder({ selectProps, innerProps, children }) {
  const { classes } = selectProps;
  return (
    <Typography
      color="textSecondary"
      className={classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}
