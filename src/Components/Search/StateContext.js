import { createContext, useContext } from 'react';

const SelectStateContext = createContext({
  selected: null,
  setSelected: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
  isFocused: false,
  setIsFocused: () => {},
  multiple: false,
  ellipseThreshold: 10,
});

const useSelectState = () => useContext(SelectStateContext);
const SelectStateProvider = SelectStateContext.Provider;

export {
  SelectStateProvider,
  useSelectState,
};
