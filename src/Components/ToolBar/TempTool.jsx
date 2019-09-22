import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import Switch from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Oven from '../../Content/Images/oven-white.png';
import {
  lightBlue, IconImage,
} from '../../Styles/constants';
import RecipeContext from '../../Context/RecipeContext';
import { convertTemperature } from '../../utils';

const TemperatureSwitch = withStyles({
  root: {
    color: lightBlue,
    backgroundColor: 'lightgrey',
    borderRadius: 0,
    '&$checked': {
      backgroundColor: lightBlue,
      color: 'lightgrey',
    },
  },
  checked: {
    backgroundColor: lightBlue,
    color: 'lightgrey',
  },
})(Switch);

const TemperatureTool = styled.div`
    display: flex;
    height: fit-content;
    align-items: center;
    margin-top: 1rem;
`;

const OvenHeatDisplay = styled.span`
    width: max-content;
    color: white;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    margin-right: 1rem;
`;

const FAIconImage = styled(FontAwesomeIcon)`
    &.svg-inline--fa.fa-w-8 {
        width: 2.5rem;
        height: 2.5rem;
    }
`;

/**
 * Display values for temp tool
 * @param {int} ovenHeat
 * @param {bool} isCelsius
 * @returns {String} celsius
 * @returns {String} fahrenheit
 */
function ovenHeatDisplay({ ovenHeat, isCelsius }) {
  const hasOvenHeat = ovenHeat > 0;
  let celsius = 'Celsius';
  let fahrenheit = 'Fahrenheit';
  if (hasOvenHeat) {
    const convertedTemp = convertTemperature(ovenHeat, isCelsius);
    const celsiusDisplay = `${isCelsius ? ovenHeat : convertedTemp} C°`;
    const fahrenheitDisplay = `${isCelsius ? convertedTemp : ovenHeat} F°`;
    celsius = celsiusDisplay;
    fahrenheit = fahrenheitDisplay;
  }
  return { celsius, fahrenheit };
}

export default function TempTool() {
  const { ovenHeat, isCelsius } = useContext(RecipeContext);
  const [inCelsius, setInCelsius] = React.useState(isCelsius);
  const { celsius, fahrenheit } = ovenHeatDisplay({ ovenHeat, isCelsius });
  const hasOvenHeat = !(ovenHeat === 0);

  return (
    <TemperatureTool>
      {hasOvenHeat
        ? <IconImage src={Oven} />
        : <FAIconImage icon={faThermometerHalf} />}

      <OvenHeatDisplay>
        { inCelsius ? celsius : fahrenheit}
      </OvenHeatDisplay>
      <TemperatureSwitch
        icon="C°"
        checkedIcon="C°"
        checked={inCelsius}
        onChange={() => setInCelsius(!inCelsius)}
      />
      <TemperatureSwitch
        icon="F°"
        checkedIcon="F°"
        checked={!inCelsius}
        onChange={() => setInCelsius(!inCelsius)}
      />
    </TemperatureTool>
  );
}
