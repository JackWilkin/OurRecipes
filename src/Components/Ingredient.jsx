import React, { useContext } from 'react';
import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';
import { decimalToFraction, convertUnit } from '../utils';
import { mediumBlue, lightBlue } from '../Styles/constants';
import RecipeContext from '../Context/RecipeContext';

const HOVER_GREY = 'rgba(0, 0, 0, 0.09);';

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

const convertableUnitStyles = `
  cursor: pointer;

  .ui.tab.active, .ui.tab.open {
    :hover {
      background-color: ${HOVER_GREY};
    }
  }
`;

const Unit = styled(Tab)`
    ${props => (props.hasUnit ? '' : 'display: none')};
    ${props => (props.unitConvertable ? convertableUnitStyles : '')};

    .menu {
        max-height: ${props => (props.open ? '5rem' : '0')};
        transition: max-height 0.2s ease-out;
        padding: 0;
        ${props => (props.unitConvertable ? '' : 'display: none;')};
    }

    .ui.attached.menu {
        min-height: 0;
    }
    .ui.tab.active, .ui.tab.open {
        border-radius: 0;
        border-top: none;
        border-left: 1px solid ${mediumBlue};
        border-bottom: none;
        border-right: 1px solid ${mediumBlue};
        padding: 0.75rem;
        font-size: 1rem;
        margin: 0;
        margin-left: -1px;
        transition: background-color 0.3s ease-out;
    }

    .ui.menu {
      a.active.item {
        background-color: ${lightBlue};
        pointer-events: none;

        :hover {
          background-color: ${lightBlue};
        }
      }

      a.item {
        ${props => (props.open ? 'display: flex' : 'display: none')};
        border-right: 1px solid ${mediumBlue};
        
        :hover {
          background-color: ${HOVER_GREY};
        }
      }
    }

    .ui.attached+.ui.attached.menu:not(.top) {
        border-left: 1px solid ${mediumBlue};
        border-bottom: none;
        border-right: none;
        border-radius: 0;
        ${props => (props.open ? `border-top: 1px solid ${mediumBlue}` : '')};
    }

    .ui.bottom.attached.menu>.item:first-child {
      border-radius: 0;
  }
`;

function createIngredientDisplay(ingredient) {
  let ingredientDisplay = ingredient.name;
  if (ingredient.plural && !ingredient.hasUnit && ingredient.quantity > 1) {
    ingredientDisplay = ingredient.plural;
  }

  return ingredientDisplay;
}

function Ingredient(props) {
  const { ingredient } = props;
  const { availableUnits, scaler } = useContext(RecipeContext);
  const [selectedUnit, setSelectedUnit] = React.useState(
    ingredient.hasUnit ? ingredient.unit.id : 0,
  );
  const [openTabs, setOpenTabs] = React.useState(false);
  const [quantity, setQuantity] = React.useState(ingredient.quantity);

  const quantityDisplay = decimalToFraction(quantity * scaler, 1000);
  const ingredientDisplay = createIngredientDisplay(ingredient);

  const toggleTab = () => setOpenTabs(!openTabs);

  const handleTabChange = (e, { activeIndex }) => {
    const newUnit = availableUnits[activeIndex];
    const origionalUnit = ingredient.unit;
    setQuantity(convertUnit(ingredient.quantity, newUnit.scaler, origionalUnit.scaler));
    setSelectedUnit(newUnit.id);
  };

  const panes = availableUnits.map(u => (
    {
      menuItem: u.name,
      render: () => (
        <Tab.Pane
          key={u.id}
          onClick={toggleTab}
          open={openTabs}
          attached="top"
        >
          {u.name}
        </Tab.Pane>
      ),
    }
  ));

  if (ingredient.hasUnit && !ingredient.unitConvertable) {
    panes[ingredient.unit.id] = {
      menuItem: ingredient.unit.name,
      render: () => (
        <Tab.Pane
          key={ingredient.unit.id}
          onClick={toggleTab}
          open={openTabs}
          attached="top"
        >
          {ingredient.unit.name}
        </Tab.Pane>
      ),
    };
  }

  return (
    <IngredientTool>
      <Quantity>{quantityDisplay}</Quantity>
      <Unit
        defaultActiveIndex={selectedUnit}
        onTabChange={handleTabChange}
        hasUnit={ingredient.hasUnit}
        unitConvertable={ingredient.unitConvertable}
        menu={{ attached: 'bottom' }}
        open={openTabs}
        panes={panes}
      />
      <IngredientDisplay>{ingredientDisplay}</IngredientDisplay>
    </IngredientTool>
  );
}

export default Ingredient;
