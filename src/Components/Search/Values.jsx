import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelectState } from './StateContext';
import { keyCodes } from './KeyboardInteraction';


function noop() {}


export function SingleValue({ children, innerProps, selectProps }) {
  const { classes } = selectProps;
  const { ellipseThreshold } = useSelectState();
  let requiresToolTip = false;
  let displayValue = children;
  if (ellipseThreshold > 0 && displayValue.length > ellipseThreshold) {
    displayValue = `${displayValue.substr(0, ellipseThreshold)}...`;
    requiresToolTip = true;
  }
  if (requiresToolTip) {
    return (
      <Tooltip title={children}>
        <Typography
          className={classes.singleValue}
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          {...innerProps}
        >
          {displayValue}
        </Typography>
      </Tooltip>
    );
  }
  return (
    <Typography
      className={classes.singleValue}
      {...innerProps}
    >
      {displayValue}
    </Typography>
  );
}

export function MultiValue({ children, selectProps, removeProps }) {
  const { isFocused, ellipseThreshold } = useSelectState();
  const { classes } = selectProps;

  let label = children;
  if (label.length > ellipseThreshold) {
    label = `${label.substr(0, ellipseThreshold)}...`;
  }

  return (
    <Chip
      title={children}
      tabIndex={-1}
      label={label}
      className={classNames(classes.chip, {
        [classes.chipFocused]: isFocused,
      })}
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon {...removeProps} />}
    />
  );
}

export function ValueContainer({ selectProps, children }) {
  const {
    isFocused, menuOpen, setMenuOpen, setSelected,
  } = useSelectState();
  const { classes } = selectProps;

  let onClick = noop;
  let onKeyDown = noop;
  // This accounts for when a use clicks the select even after selecting a value
  // it will open the menu without having to click away first
  if (isFocused && !menuOpen) {
    onClick = () => setMenuOpen(true);
    // allows arrow down to open menu
    onKeyDown = (e) => {
      if (e.keyCode === keyCodes.DOWN) {
        if (!menuOpen) {
          setMenuOpen(true);
        } else {
          // @todo allow navigating options
        }
      }
      if (e.keyCode === keyCodes.BACKSPACE && isFocused) {
        setSelected();
      }
    };
  }
  return (
    // we need the on click for the above reason but not key events
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classes.valueContainer}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}
