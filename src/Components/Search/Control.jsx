import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelectState } from './StateContext';
import { keyCodes } from './KeyboardInteraction';

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

export default function Control({
  children, selectProps, innerProps, innerRef,
}) {
  const {
    isFocused, menuOpen, setMenuOpen, selected, setSelected, multiple,
  } = useSelectState();
  const { classes, textFieldProps } = selectProps;
  return (
    <TextField
      variant="outlined"
      fullWidth
      onKeyDown={(e) => {
        if (e.keyCode === keyCodes.DOWN) {
          if (!menuOpen) {
            setMenuOpen(true);
          } else {
            // @todo allow navigating options
          }
        }
        if (e.keyCode === keyCodes.BACKSPACE && isFocused) {
          if (multiple) {
            selected.pop();
            setSelected([...selected]);
          } else {
            setSelected(null);
          }
        }
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: multiple ? classes.inputMultiple : classes.input,
          inputRef: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...textFieldProps}
    />
  );
}
