import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  components as ReactSelectComponents,
} from 'react-select';

import { useSelectState } from './StateContext';

export default function DropdownIndicator({ selectProps, ...props }) {
  const { menuOpen } = useSelectState();
  return (
    <ReactSelectComponents.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={menuOpen ? faCaretUp : faCaretDown} />
    </ReactSelectComponents.DropdownIndicator>
  );
}
