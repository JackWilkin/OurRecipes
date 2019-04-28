import React, { useContext } from 'react';
import styled from 'styled-components';
import { createIngredientDisplay } from '../utils';
import { mediumBlue } from '../Styles/constants';
import RecipeContext from '../Context/RecipeContext';
import Unit from './Unit';

const IngredientTool = styled.div`
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
`;

const IngredientDisplay = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 1rem;
`;

function Ingredient(props) {
  const { ingredient } = props;
  const { scaler } = useContext(RecipeContext);
  const [currentQuantity, setCurrentQuantity] = React.useState(ingredient.quantity);
  const [currentUnit, setCurrentUnit] = React.useState(ingredient.unit);
  const [currentIngredient, setCurrentIngredient] = React.useState(ingredient.name);
  const viewIngredient = {
    quantity: currentQuantity,
    unit: currentUnit,
    name: currentIngredient,
  };

  const ingredientDisplayInfo = createIngredientDisplay({ ingredient: viewIngredient, scaler });

  return (
    <IngredientTool>
      <Quantity>{ingredientDisplayInfo.quantityDisplay}</Quantity>
      {ingredient.hasUnit
      && (
      <Unit
        setCurrentQuantity={setCurrentQuantity}
        currentUnit={currentUnit}
        setCurrentUnit={setCurrentUnit}
        ingredient={ingredient}
      />
      )
      }
      <IngredientDisplay>{ingredientDisplayInfo.ingredientDisplay}</IngredientDisplay>
    </IngredientTool>
  );
}

export default Ingredient;
