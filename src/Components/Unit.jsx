import React, { useContext } from 'react';
import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';
import GlobalContext from '../Context/GlobalContext';
import { convertUnit } from '../utils';
import { mediumBlue, lightBlue, darkBlue } from '../Styles/constants';
// import { Link } from 'react-router-dom';
// import { createIngredientDisplay } from '../utils';

const convertableUnitStyles = `
  cursor: pointer;

  .ui.tab.active, .ui.tab.open {
    :hover {
      background-color: ${darkBlue};
      color: white;
    }
  }
`;

const StyledUnit = styled(Tab)`
    ${props => (props.unitConvertable ? convertableUnitStyles : '')}
    border-right: 1px solid ${mediumBlue};

    .ui {
      &.menu {
        max-height: ${props => (props.open ? '5rem' : '0')};
        transition: max-height 0.2s ease-out;
        padding: 0;
        ${props => (props.unitConvertable ? '' : 'display: none;')};

        &.attached {
          min-height: 0;

          &.bottom .item.active {
            border-radius: 0;
          }
        }

        a.item {
          ${props => (props.open ? 'display: flex' : 'display: none')};
          border-right: 1px solid ${mediumBlue};

          &.active {
            background-color: ${lightBlue};
            pointer-events: none;
          }
          
          :hover {
            background-color: ${darkBlue};
            color: white;
            border-radius: 0 !important;
          }
        }
      }
      &.tab.active {
        border-radius: 0;
        border-top: none;
        border-bottom: none;
        border-left: none;
        border-right: none;
        padding: 0.75rem;
        font-size: 1rem;
        margin: 0;
        transition: background-color 0.3s ease-out;
        color: ${darkBlue};
        width: auto;
        background-color: white;
        font-weight: bold;

        ${props => (props.open ? '' : `
        height: 100%;
        align-items: center;
        justify-content: center;
        display: flex;`)}
      }

      &.attached+.ui.attached.menu:not(.top) {
        border-left: 1px solid ${mediumBlue};
        ${props => (props.open ? `border-top: 1px solid ${mediumBlue};` : '')}
        border-bottom: none;
        border-right: none;
        border-radius: 0;
      }
    }
`;

export default function Unit(props) {
  const {
    ingredient, setCurrentQuantity, setCurrentUnit, currentUnit,
  } = props;
  const { availableUnits } = useContext(GlobalContext);
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
