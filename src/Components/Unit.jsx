import React, { useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import GlobalContext from '../Context/GlobalContext';
import { convertUnit } from '../utils';
import { mediumBlue, lightBlue, darkBlue } from '../Styles/constants';

const UnitTool = withStyles({
  root: {
    boxShadow: 'none',
    borderRight: `1px solid ${mediumBlue}`,
    width: '5rem',
  },
  expanded: {
    margin: 'auto',
    width: 'auto',
  },
})(ExpansionPanel);

const UnitDisplay = withStyles({
  root: {
    fontWeight: 'bold',
    paddingLeft: '0.5rem',
    transition: 'background-color 0.3s ease',

    '& div': {
      padding: 0,
    },

    '&:hover': {
      backgroundColor: darkBlue,
      color: 'white',
      '& svg': {
        color: 'white',
      },
    },
  },
})(ExpansionPanelSummary);

const UnitChoices = withStyles({
  root: {
    padding: 0,
    maxWidth: '15rem',
    flexWrap: 'wrap',
    maxHeight: '5rem',
  },
})(ExpansionPanelDetails);

const UnitRadioButton = withStyles({
  root: {
    backgroundColor: lightBlue,
    borderRadius: 0,
    flexBasis: '33.3333%',
    padding: '0.5rem',
    transition: 'background-color 0.3s ease',
    '& svg': {
      color: darkBlue,
    },
  },
  checked: {
    pointerEvents: 'none',
  },
})(Radio);

export default function Unit(props) {
  const {
    ingredient, setCurrentQuantity, setCurrentUnit, currentUnit,
  } = props;
  const { availableUnits } = useContext(GlobalContext);
  const unitConvertable = true;

  const handleChange = (event) => {
    const newUnitId = parseInt(event.target.value, 10);
    const newUnit = availableUnits.find(unit => unit.id === newUnitId);
    const oldUnit = availableUnits.find(unit => unit.id === ingredient.unit.id);
    setCurrentQuantity(convertUnit(ingredient.quantity, oldUnit.scaler, newUnit.scaler));
    setCurrentUnit(newUnitId);
  };

  const unitChoices = availableUnits.map(unit => (
    <UnitRadioButton
      checked={currentUnit === unit.id}
      onChange={handleChange}
      value={unit.id}
      name={unit.name}
      aria-label={unit.name}
      icon={unit.name}
      key={unit.id}
    />
  ));

  return (
    <UnitTool>
      <UnitDisplay expandIcon={<ExpandMoreIcon />}>
        {availableUnits.find(unit => unit.id === currentUnit).name}
      </UnitDisplay>
      <UnitChoices>{unitChoices}</UnitChoices>
    </UnitTool>
  );
}
