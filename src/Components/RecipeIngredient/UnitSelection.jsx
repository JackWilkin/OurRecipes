import React, { useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import GlobalContext from '../../Context/GlobalContext';
import { convertUnit } from '../../utils';
import { lightBlue, darkBlue } from '../../Styles/constants';

const UnitTool = styled.div`
  display: flex;
  border-bottom: 1px solid ${darkBlue};
`;

const UnitRadioButton = withStyles({
  root: {
    flex: 'auto',
    backgroundColor: lightBlue,
    borderRadius: 0,
    fontSize: '115%',
    padding: '0.5rem',
    transition: 'background-color 0.3s ease',
    outline: `1px solid ${darkBlue}`,
    '& svg': {
      color: darkBlue,
    },
    '&:hover': {
      backgroundColor: darkBlue,
      color: 'white',
    },
  },
  checked: {
    flex: 'initial',
    pointerEvents: 'none',
    '& svg': {
      color: 'white',
    },
  },
})(Radio);

export default function Unit(props) {
  const {
    ingredient, setCurrentQuantity, setCurrentUnit, currentUnit,
  } = props;
  const { availableUnits } = useContext(GlobalContext);

  const handleChange = (event) => {
    const newUnitId = parseInt(event.target.value, 10);
    const newUnit = availableUnits.find(unit => unit.id === newUnitId);
    const oldUnit = availableUnits.find(unit => unit.id === ingredient.unit);
    setCurrentQuantity(convertUnit(ingredient.quantity, oldUnit.scaler, newUnit.scaler));
    setCurrentUnit(newUnitId);
  };

  const unitChoices = availableUnits.map(unit => (
    <UnitRadioButton
      onChange={handleChange}
      value={unit.id}
      icon={unit.name}
      key={unit.id}
      checked={currentUnit === unit.id}
    />
  ));

  return (
    <UnitTool>
      {unitChoices}
    </UnitTool>
  );
}
