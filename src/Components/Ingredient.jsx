import React, { useContext } from 'react';
import styled from 'styled-components';
import { createIngredientDisplay } from '../utils';
import { mediumBlue, lightBlue, darkBlue } from '../Styles/constants';
import RecipeContext from '../Context/RecipeContext';
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
    color: #2E3E55;
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
  const hasNotes = ingredient.notes !== undefined;
  const hasUnit = !(ingredient.unit === null);
  const [currentQuantity, setCurrentQuantity] = React.useState(ingredient.quantity);
  const [currentUnit, setCurrentUnit] = React.useState(ingredient.unit);
  const [showNotes, setShowNotes] = React.useState(hasNotes);
  // const [currentIngredient, setCurrentIngredient] = React.useState(ingredient.name);

  const viewIngredient = {
    quantity: currentQuantity,
    unit: currentUnit,
    name: ingredient.name,
  };

  const ingredientDisplayInfo = createIngredientDisplay({ ingredient: viewIngredient, scaler });

  return (
    <IngredientTool>
      <IngredientInfo>
        <Quantity>{ingredientDisplayInfo.quantityDisplay}</Quantity>
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
