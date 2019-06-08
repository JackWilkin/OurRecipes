/* eslint-disable react/prop-types, react/jsx-handler-names */
import React, {
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import ReactSelect from 'react-select';
import { withStyles } from '@material-ui/core/styles';

import {
  SelectStateProvider,
} from './StateContext';

import styles from './styles';
import DropdownIndicator from './DropDownIndicator';
import {
  Option,
  NoOptionsMessage,
} from './Options';
import {
  ValueContainer,
  SingleValue,
  MultiValue,
} from './Values';
import Control from './Control';
import Menu from './Menu';
import Placeholder from './Placeholder';

function noop() {}

function SelectContainer({ selectProps, children }) {
  const { classes } = selectProps;
  let className = classes.selectContainer;
  if (selectProps.fullWidth) {
    className = classNames(className, classes.selectContainerFullWidth);
  } else {
    className = classNames(className, classes.selectContainerAutoWidth);
  }
  return (<div className={className}>{children}</div>);
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator,
  SelectContainer,
  IndicatorSeparator: () => null,
};

const SearchableSelect = ({
  options, value, label, onFocus = noop,
  onBlur = noop, placeholder = '',
  onChange = () => {}, multiple = false, inline = false,
  menuIsOpen = false, ignoreAccents = true,
  selectRef, ellipseThreshold = 25, isClearable = false,
  ...props
}) => {
  const { classes, theme } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = useState(value);
  const [menuOpen, setMenuOpen] = useState(menuIsOpen);
  useEffect(() => {
    setSelected(value);
  }, [value]);
  useEffect(() => {
    if (isFocused) {
      setMenuOpen(true);
    } else if (menuIsOpen !== true) {
      setMenuOpen(false);
    }
  }, [isFocused]);


  function handleChangeMulti(updatedValue) {
    setSelected(updatedValue);
    onChange(updatedValue);
  }

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
    // heightest z-index = 2147483647
    // Select options should always be visiable
    menuPortal: base => ({ ...base, zIndex: 2147483647 }),
  };
  let inputProps = {};
  // Prevent the label from filling the input when value or placeholder
  if (selected) {
    inputProps = {
      shrink: true,
    };
  }
  let visablePlaceholder = placeholder;
  if (!isFocused && label) {
    visablePlaceholder = '';
  }

  let rootClassName = classes.root;
  if (inline) {
    rootClassName = classes.inlineRoot;
  }

  return (
    <SelectStateProvider value={{
      selected,
      setSelected,
      menuOpen,
      setMenuOpen,
      isFocused,
      setIsFocused,
      multiple,
      ellipseThreshold,
    }}
    >
      <div className={rootClassName}>
        <ReactSelect
          classes={classes}
          styles={selectStyles}
          textFieldProps={{
            label,
            InputLabelProps: inputProps,
          }}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur(e);
          }}
          options={options}
          components={components}
          value={selected}
          onChange={(e) => {
            setMenuOpen(false);
            handleChangeMulti(e);
          }}
          placeholder={visablePlaceholder}
          isMulti={multiple}
          ref={selectRef}
          menuIsOpen={menuOpen}
          menuPortalTarget={document.body}
          ignoreAccents={ignoreAccents}
          isFocused={isFocused}
          isClearable={isClearable}
          {...props}
        />
      </div>
    </SelectStateProvider>
  );
};

export default withStyles(styles, { withTheme: true })(SearchableSelect);
