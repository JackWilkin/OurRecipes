import React, { useContext } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { styled as muiStyled } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import { createIngredientDisplay, decimalToFraction } from '../utils';
import { mediumBlue, lightBlue, darkBlue } from '../Styles/constants';
import RecipeContext from '../Context/RecipeContext';
import GlobalContext from '../Context/GlobalContext';
import Unit from './Unit';

const IngredientTool = withStyles({
  root: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    outline: `1px solid ${darkBlue}`,
    marginBottom: '1rem',
    padding: 0,
    borderRadius: 0,
  },
})(Card);

const IngredientSummary = withStyles({
  root: {
    display: 'flex',
    padding: 0,

    '&:last-child': {
      padding: 0,
    },
  },
})(CardContent);

const Quantity = styled.span`
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

const IngredientDisplay = withStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1rem',
    color: darkBlue,
    transition: 'background-color 0.3s ease-out',
    overflow: 'hidden',
    padding: '0.5rem',
  },
})(Typography);

const IngredientDetails = withStyles({
  root: {
    borderTop: `1px solid ${mediumBlue}`,
    padding: '0.5rem',
    backgroundColor: '#7080906e',
    color: '#777777',
    fontWeight: 'bold',
    textAlign: 'center',

    '&:last-child': {
      paddingBottom: '0.5rem',
    },
  },
})(CardContent);

function Ingredient(props) {
  const { ingredient } = props;
  const { scaler } = useContext(RecipeContext);
  const { availableUnits } = useContext(GlobalContext);
  const hasNotes = ingredient.notes !== '';
  const hasUnit = ingredient.unit !== null;
  const [expanded, setExpanded] = React.useState(hasNotes);
  const [currentQuantity, setCurrentQuantity] = React.useState(ingredient.quantity);
  const [currentUnit, setCurrentUnit] = React.useState(ingredient.unit ? ingredient.unit : 0);

  const viewIngredient = {
    quantity: currentQuantity,
    unit: availableUnits.find(unit => unit.id === currentUnit),
    name: ingredient.name,
  };

  const ingredientDisplayInfo = createIngredientDisplay({ ingredient: viewIngredient, scaler });
  const quantityDisplay = decimalToFraction(currentQuantity * scaler, 1000);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const OpenDetailsIcon = muiStyled(IconButton)({
    marginLeft: 'auto',
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'background-color 0.3s ease',
    borderRadius: 0,
    borderRight: expanded ? `1px solid ${mediumBlue}` : 'none',
    borderLeft: expanded ? 'none' : `1px solid ${mediumBlue}`,
    padding: '0.25rem',
    '&:hover': {
      backgroundColor: lightBlue,
      color: 'white',
    },
  });

  return (
    <IngredientTool disabled={!hasNotes}>
      <IngredientSummary>
        <Quantity>{quantityDisplay}</Quantity>
        {hasUnit && (
          <Unit
            setCurrentQuantity={setCurrentQuantity}
            currentUnit={currentUnit}
            setCurrentUnit={setCurrentUnit}
            ingredient={ingredient}
          />
        )}
        <IngredientDisplay>
          {ingredientDisplayInfo.ingredientDisplay}
        </IngredientDisplay>
        {hasNotes && (
        <OpenDetailsIcon
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </OpenDetailsIcon>
        )}
      </IngredientSummary>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <IngredientDetails>{ingredient.notes}</IngredientDetails>
      </Collapse>
    </IngredientTool>
  );
}

export default Ingredient;
