import { emphasize } from '@material-ui/core/styles/colorManipulator';

export default function styles(theme) {
  // TODO: remove or make a theme
  const light = theme.palette.type === 'light';
  const defaultFontSize = '16px'; // theme.typography.pxToRem(16);
  const width = '20rem';
  return {
    root: {
      borderRadius: '4px',
      backgroundColor: 'white',
    },
    inlineRoot: {
      display: 'inline-flex',
    },
    input: {
      display: 'flex',
      width: '100%',
      padding: 0,
      paddingLeft: '0.875rem',
      paddingRight: '1rem',
      height: '3.4rem',
      fontSize: defaultFontSize,
    },
    inputMultiple: {
      display: 'flex',
      width: '100%',
      padding: 0,
      paddingLeft: '0.875rem',
      paddingRight: '1rem',
      minHeight: '3.4rem',
      maxHeight: '5rem',
      fontSize: defaultFontSize,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'auto',
    },
    selectContainer: {
      display: 'flex',
    },
    selectContainerAutoWidth: {
      minWidth: width,
    },
    selectContainerFullWidth: {
      width: '100%',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
      borderRadius: '4px',
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: defaultFontSize,
    },
    placeholder: {
      position: 'absolute',
      left: '0.75rem',
      fontFamily: theme.typography.fontFamily,
      fontSize: defaultFontSize,
      opacity: light ? 0.42 : 0.5,
    },
    paper: {
      maxWidth: width,
      position: 'absolute',
      zIndex: 99,
      overflowX: 'visible',
      overflowY: 'visible',
      marginTop: theme.spacing.unit,
    },
  };
}
