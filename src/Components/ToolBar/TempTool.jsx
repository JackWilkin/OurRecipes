import React, { useContext } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import Oven from '../../Content/Images/oven-white.png';
import {
  darkBlue, lightBlue, IconImage, TOOL_STYLES,
} from '../../Styles/constants';
import RecipeContext from '../../Context/RecipeContext';

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

const TemperatureTool = styled.div`
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

const FAIconImage = styled(FontAwesomeIcon)`
    &.svg-inline--fa.fa-w-8 {
        width: 2.5rem;
        height: 2.5rem;
    }
`;

export default function TempTool() {
  const {
    ovenHeat, setInCelsius, inCelsius, celsius, fahrenheit,
  } = useContext(RecipeContext);

  const hasOvenHeat = !(ovenHeat === 0);
  return (
    <TemperatureTool>
      {hasOvenHeat
        ? <IconImage src={Oven} />
        : <FAIconImage icon={faThermometerHalf} />}

      <OvenHeatDisplay>
        {inCelsius ? celsius : fahrenheit}
      </OvenHeatDisplay>
      <TemperatureSwitch
        radio
        label="C°"
        checked={inCelsius === true}
        onChange={() => setInCelsius(!inCelsius)}
      />
      <TemperatureSwitch
        radio
        label="F°"
        checked={inCelsius === false}
        onChange={() => setInCelsius(!inCelsius)}
      />
    </TemperatureTool>
  );
}
