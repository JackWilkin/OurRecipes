import React from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

export function NoOptionsMessage({ children, selectProps, innerProps }) {
  const { classes } = selectProps;
  return (
    <Typography
      color="textSecondary"
      className={classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

export function Option({
  children, innerRef, isFocused, isSelected, innerProps,
}) {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
        whiteSpace: 'normal',
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}
