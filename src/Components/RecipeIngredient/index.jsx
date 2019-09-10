import React, { useContext } from 'react';
import styled from 'styled-components';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { mediumBlue, darkBlue } from '../../Styles/constants';
import RecipeContext from '../../Context/RecipeContext';
import GlobalContext from '../../Context/GlobalContext';
import UnitSelection from './UnitSelection';
import { decimalToFraction } from '../../utils';

const IngredientTool = styled.div`    
  display: flex;
  outline: 1px solid ${darkBlue};
  flex-direction: column;
  margin-bottom: 1rem;
`;

const IngredientSummary = styled.div`    
  display: flex;
  width: 100%;
`;

const IngredientDetails = styled.span`    
  display: flex;
  width: 100%;
  padding: 0.5rem;
  background-color: #7080906e;
  color: #777777;
  font-weight: bold;
  text-align: center;
  border-top: 1px solid ${darkBlue};
`;

const QuantityDisplay = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1rem;
  border-right: 1px solid ${mediumBlue};
  background-color: #7080906e;
  color: #777777;
  font-weight: bold;
`;

const UnitDisplay = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1rem;
  border-right: 1px solid ${mediumBlue};
`;

const IngredientDisplay = styled.span`
  display: flex;
  flex-grow: 1;
  padding: 0.5rem;
`;

const UpCarrot = withStyles({
  root: {
    transform: 'rotate(180deg)',
    borderLeft: `1px solid ${mediumBlue}`,
    height: 'auto',
    cursor: 'pointer',
  },
})(ExpandMoreIcon);

const DownCarrot = withStyles({
  root: {
    borderLeft: `1px solid ${mediumBlue}`,
    height: 'auto',
    cursor: 'pointer',
  },
})(ExpandMoreIcon);

export default function RecipeIngredient(props) {
  const { ingredient } = props;
  const { scaler } = useContext(RecipeContext);
  const { availableUnits } = useContext(GlobalContext);
  const [currentQuantity, setCurrentQuantity] = React.useState(ingredient.quantity);
  const [currentUnit, setCurrentUnit] = React.useState(ingredient.unit);
  const hasUnit = currentUnit !== null;
  const hasNotes = ingredient.notes !== '';
  const [showUnits, setShowUnits] = React.useState(false);
  const [showNotes, setShowNotes] = React.useState(hasNotes);

  const unit = availableUnits.find(u => u.id === currentUnit);
  const name = ingredient;
  const quantityDisplay = decimalToFraction(currentQuantity * scaler);

  const openNotes = () => {
    setShowNotes(!showNotes);
  };

  const openUnitSelection = () => {
    setShowUnits(!showUnits);
  };

  return (
    <IngredientTool disabled={!hasNotes}>
      <Collapse in={showUnits} timeout="auto" unmountOnExit>
        <UnitSelection
          setCurrentQuantity={setCurrentQuantity}
          currentUnit={currentUnit}
          setCurrentUnit={setCurrentUnit}
          ingredient={ingredient}
        />
      </Collapse>
      <IngredientSummary>
        <QuantityDisplay>{quantityDisplay}</QuantityDisplay>
        {hasUnit && <UnitDisplay>{unit.name}</UnitDisplay>}
        {hasUnit && <UpCarrot onClick={openUnitSelection} />}
        <IngredientDisplay>{name}</IngredientDisplay>
        {hasNotes && <DownCarrot onClick={openNotes} />}
      </IngredientSummary>
      <Collapse in={showNotes} timeout="auto" unmountOnExit>
        <IngredientDetails>{ingredient.notes}</IngredientDetails>
      </Collapse>
    </IngredientTool>
  );
}
