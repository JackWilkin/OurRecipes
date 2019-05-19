import React, { useContext } from 'react';
import styled from 'styled-components';
import { createIngredientDisplay, decimalToFraction } from '../utils';
import { mediumBlue, lightBlue, darkBlue } from '../Styles/constants';
import RecipeContext from '../Context/RecipeContext';
import GlobalContext from '../Context/GlobalContext';
import Unit from './Unit';

const IngredientTool = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px solid ${darkBlue};
    border-right: 1px solid ${darkBlue};
    border-bottom: 1px solid ${darkBlue};
    margin-bottom: 1rem;
`;

const IngredientInfo = styled.div`
    display: flex;
    height: fit-content;
    border-top: 1px solid ${mediumBlue};
`;

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

const IngredientDisplay = styled.div`
    ${props => (props.hasNotes ? 'cursor: pointer' : 'pointer-events: none')};
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 1rem;
    color: ${darkBlue};
    transition: background-color 0.3s ease-out;
    overflow: hidden;

    &:hover {
      background-color: ${lightBlue};
      color: white;
    }
`;
const IngredientNotes = styled.div`
    border-top: 1px solid ${mediumBlue};
    flex-grow: 1;
    display: ${props => (props.showNotes ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #7080906e;
    color: #777777;
    font-weight: bold;
`;

function Ingredient(props) {
  const { ingredient } = props;
  const { scaler } = useContext(RecipeContext);
  const { availableUnits } = useContext(GlobalContext);
  const hasNotes = ingredient.notes && ingredient.notes !== '';
  const hasUnit = ingredient.unit !== null;
  const [showNotes, setShowNotes] = React.useState(hasNotes);
  const [currentQuantity, setCurrentQuantity] = React.useState(ingredient.quantity);
  const [currentUnit, setCurrentUnit] = React.useState(ingredient.unit ? ingredient.unit : 0);
  // const [currentIngredient, setCurrentIngredient] = React.useState(ingredient.name);

  const viewIngredient = {
    quantity: currentQuantity,
    unit: availableUnits.find(unit => unit.id === currentUnit),
    name: ingredient.name,
  };

  const ingredientDisplayInfo = createIngredientDisplay({ ingredient: viewIngredient, scaler });
  const quantityDisplay = decimalToFraction(currentQuantity * scaler, 1000);

  return (
    <IngredientTool>
      <IngredientInfo>
        <Quantity>{quantityDisplay}</Quantity>
        {hasUnit && (
          <Unit
            setCurrentQuantity={setCurrentQuantity}
            currentUnit={currentUnit}
            setCurrentUnit={setCurrentUnit}
            ingredient={ingredient}
          />
        )}
        <IngredientDisplay hasNotes={hasNotes} onClick={() => setShowNotes(!showNotes)}>
          {ingredientDisplayInfo.ingredientDisplay}
        </IngredientDisplay>
      </IngredientInfo>
      <IngredientNotes showNotes={showNotes}>{ingredient.notes}</IngredientNotes>
    </IngredientTool>
  );
}

export default Ingredient;
