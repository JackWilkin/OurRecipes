import React, { useContext } from 'react';
import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';
import RecipeContext from '../Context/RecipeContext';
import { convertUnit } from '../utils';
// import { Link } from 'react-router-dom';
import { mediumBlue, lightBlue } from '../Styles/constants';
// import { createIngredientDisplay } from '../utils';

const HOVER_GREY = 'rgba(0, 0, 0, 0.09);';
const convertableUnitStyles = `
  cursor: pointer;

  .ui.tab.active, .ui.tab.open {
    :hover {
      background-color: ${HOVER_GREY};
    }
  }
`;

const StyledUnit = styled(Tab)`
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

export default function Unit(props) {
  const {
    ingredient, setCurrentQuantity, setCurrentUnit, currentUnit,
  } = props;
  const { availableUnits } = useContext(RecipeContext);
  const [openTabs, setOpenTabs] = React.useState(false);
  const toggleTab = () => setOpenTabs(!openTabs);

  const handleTabChange = (e, { activeIndex }) => {
    const newUnit = availableUnits[activeIndex];
    const origionalUnit = ingredient.unit;
    setCurrentQuantity(convertUnit(ingredient.quantity, origionalUnit.scaler, newUnit.scaler));
    setCurrentUnit(availableUnits[newUnit.id]);
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

  // if (ingredient.hasUnit && !ingredient.unitConvertable) {
  //   panes[ingredient.unit.id] = {
  //     menuItem: ingredient.unit.name,
  //     render: () => (
  //       <Tab.Pane
  //         key={ingredient.unit.id}
  //         onClick={toggleTab}
  //         open={openTabs}
  //         attached="top"
  //       >
  //         {ingredient.unit.name}
  //       </Tab.Pane>
  //     ),
  //   };
  // }

  return (
    <StyledUnit
      defaultActiveIndex={currentUnit ? currentUnit.id : 0}
      onTabChange={handleTabChange}
      unitConvertable={ingredient.unitConvertable}
      menu={{ attached: 'bottom' }}
      open={ingredient.unitConvertable && openTabs}
      panes={panes}
    />
  );
}
