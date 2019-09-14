import React, { useContext } from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import RecipeIngredient from './RecipeIngredient';
import RecipeContext from '../Context/RecipeContext';
// 

const Ingredients = styled.div``;

const RecipeIngredientTool = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const DoneCheckbox = withStyles({
  root: {
    padding: 0,
    marginLeft: '0.5rem',
    height: 'max-content',
    transform: 'scale(1.17)',
    color: 'green',
  },
})(Checkbox);

function createIngredientTool(ingredient) {
  const [disabled, setDisabled] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <RecipeIngredientTool key={ingredient.id}>
      <RecipeIngredient
        disabled={disabled}
        collapsed={collapsed}
        key={ingredient.id}
        ingredient={ingredient}
      />
      <DoneCheckbox
        onChange={() => { setDisabled(!disabled); setCollapsed(!collapsed); }}
        checkedIcon={<FontAwesomeIcon icon={faMinusCircle} />}
        icon={<FontAwesomeIcon icon={faPlusCircle} />}
      />
    </RecipeIngredientTool>
  );
}

export default function RecipeIngredients() {
  const { ingredients } = useContext(RecipeContext);

  const ingredientList = ingredients.map(createIngredientTool);

  return (
    <Ingredients>
      {ingredientList}
    </Ingredients>
  );
}
