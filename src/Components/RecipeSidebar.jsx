import React, { useContext } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faCaretDown, faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import ScaleTool from './ScaleTool';
import Oven from '../Content/Images/oven-white.png';
import Mixer from '../Content/Images/mixer-white.png';
import {
  onMobile, darkBlue, mediumBlue, lightBlue,
} from '../Styles/constants';
import { convertTemperature } from '../utils';
import RecipeContext from '../Context/RecipeContext';

const TOOL_STYLES = `
    background-color: ${mediumBlue};
    padding: 0.5rem;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${darkBlue};
    color: white;
    min-width: 20rem;
    height: fit-content;
    margin-top: 1rem;
    margin-left: 1rem;

    ${onMobile} {
        margin: 0;
    }
`;

const SidebarHeader = styled.div`
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    font-weight: bold;
    font-size: 1.5rem;

    > :last-child {
        float: right;
    }
`;

const Tools = styled.div`
    background-color: ${mediumBlue};
    transition: max-height 0.2s ease-out;
    max-height: ${props => (props.isOpen ? '16rem' : '0')};
    overflow: hidden;
`;

const ToolsHeaderIcon = styled(FontAwesomeIcon)`
    margin-right: 1rem;
    cursor: pointer;
`;

const IconImage = styled.img`
    width: 2.5rem;
    height: 2.5rem;
`;

const FAIconImage = styled(FontAwesomeIcon)`
    &.svg-inline--fa.fa-w-8 {
        width: 2.5rem;
        height: 2.5rem;
    }
`;
const ApplianceTool = styled.div`
    ${TOOL_STYLES}
    display: flex;
`;

const ApplianceList = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 0.5rem;
`;

const Appliance = styled.div`
    padding-bottom: 0.5rem;
`;

// const ApplianceDisplay = styled.span`
//     font-weight: bold;
//     padding-left: 0.25rem;
// `;

const TemperatureSwitch = styled(Checkbox)`
    background-color: ${props => (props.checked ? lightBlue : 'lightgrey')};

    :hover {
      ${props => (props.checked ? '' : `background-color: ${darkBlue};`)};
    }

    &.ui.radio.checkbox {
        min-width: auto;
        label {
            padding: 0.5rem;
            color: ${props => (props.checked ? 'white' : 'gray')};

            :hover {
              ${props => (props.checked ? '' : 'color: white;')};
            }

            ::before, ::after {
                display: none;
            }
        }
    }
`;

const OvenHeatTool = styled.div`
    ${TOOL_STYLES}
    display: flex;
    height: fit-content;
    width: 100%;
`;

const OvenHeatDisplay = styled.span`
    width: 100%;
    background-color: white;
    color: ${darkBlue};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function RecipeSidebar() {
  const recipe = useContext(RecipeContext);
  const hasAppliances = !(recipe.appliances === undefined || recipe.appliances.length === 0);
  const hasOvenHeat = !(recipe.ovenHeat === undefined);
  const hasTemperature = !(recipe.isCelsius === undefined);
  let appliances;
  let celsius;
  let fahrenheit;

  if (hasAppliances) {
    appliances = recipe.appliances.map(
      appliance => <Appliance key={appliance.id}>{appliance.name}</Appliance>,
    );
  }

  if (!hasTemperature) {
    fahrenheit = 'Fahrenheit';
    celsius = 'Celsius';
  }
  if (recipe.isCelsius) {
    celsius = hasOvenHeat ? recipe.ovenHeat : 'Celsius';
    fahrenheit = hasOvenHeat ? convertTemperature(recipe.ovenHeat, true) : 'Fahrenheit';
  } else {
    fahrenheit = hasOvenHeat ? recipe.ovenHeat : 'Fahrenheit';
    celsius = hasOvenHeat ? convertTemperature(recipe.ovenHeat, false) : 'Celsius';
  }

  const [isCelsius, setisCelsius] = React.useState(recipe.isCelsius);
  const [ovenHeat, setOvenHeat] = React.useState(recipe.ovenHeat);
  const [isToolsOpen, setIsToolsOpen] = React.useState(false);

  if (ovenHeat === undefined) {
    setOvenHeat(isCelsius ? celsius : fahrenheit);
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <ToolsHeaderIcon icon={faToolbox} color="white" />
          Tools
        <ToolsHeaderIcon icon={faCaretDown} onClick={() => { setIsToolsOpen(!isToolsOpen); }} color="white" />
      </SidebarHeader>
      <Tools isOpen={isToolsOpen}>
        <ScaleTool />
        { hasTemperature && (
          <OvenHeatTool>
            {hasOvenHeat
              ? <IconImage src={Oven} />
              : <FAIconImage icon={faThermometerHalf} />}

            <OvenHeatDisplay>
              {ovenHeat}
            </OvenHeatDisplay>
            <TemperatureSwitch
              radio
              label="C°"
              checked={isCelsius === true}
              onChange={() => {
                setisCelsius(!isCelsius);
                setOvenHeat(celsius);
              }}
            />
            <TemperatureSwitch
              radio
              label="F°"
              checked={isCelsius === false}
              onChange={() => {
                setisCelsius(!isCelsius);
                setOvenHeat(fahrenheit);
              }}
            />
          </OvenHeatTool>
        )}
        { hasAppliances && (
          <ApplianceTool>
            <IconImage src={Mixer} />
            <ApplianceList>{appliances}</ApplianceList>
          </ApplianceTool>
        )}
      </Tools>
    </Sidebar>
  );
}
