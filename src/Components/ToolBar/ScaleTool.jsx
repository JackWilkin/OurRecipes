import React, { useContext } from 'react';
import styled from 'styled-components';
import RecipeContext from '../../Context/RecipeContext';
import {
  darkBlue, mediumBlue,
} from '../../Styles/constants';

const Scale = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${mediumBlue};
    border-left: 1px solid ${mediumBlue};
    border-bottom: 1px solid ${mediumBlue};
`;

const ScaleHeader = styled.span`
    font-size: 1.1rem;
    padding-bottom: 0.5rem;
    padding-left: 0.25rem;
`;

const Servings = styled.span`
    padding-right: 0.25rem;
    float: right;
`;

const ScaleDisplay = styled.span`

`;

const ScaleInput = styled.input`
    width: 2rem;
    height: 2rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    background: lightgrey;
    border: 1px solid ${darkBlue};
    padding: 0.25rem;
    font-size: 1rem;
    color: #555555;
`;

const ScaleButtons = styled.div`
    display: flex;
    font-size: 1.5rem;
`;

export default function ScaleTool() {
  const { scaler, setScaler, servings } = useContext(RecipeContext);
  const [scalerDisplay, setScalerDisplay] = React.useState(scaler);
  const hasServings = !(servings === undefined);

  const scaleRecipe = (ones, numerator, denominator) => {
    if (ones.value === '' && numerator.value === '' && denominator.value === '') {
      setScaler(1);
      setScalerDisplay(1);
    } else {
      const onesInteger = parseInt(ones.value, 10);
      const numeratorInteger = parseInt(numerator.value, 10);
      const denominatorInteger = parseInt(denominator.value, 10);
      const onesIsValid = ones.value.match(/^[0-9]+$/) != null && onesInteger > 0;
      const numeratorIsValid = numerator.value.match(/^[0-9]+$/) != null && numeratorInteger > 0;
      const denominatorIsValid = denominator.value.match(/^[0-9]+$/) != null && denominatorInteger > 0;

      if (onesIsValid) {
        if (numeratorIsValid && denominatorIsValid) {
          const newScaler = onesInteger + (numeratorInteger / denominatorInteger);
          setScaler(newScaler);
          setScalerDisplay(newScaler);
        } else {
          setScaler(onesInteger);
          setScalerDisplay(onesInteger);
        }
      }
    }
  };

  return (
    <Scale>
      <ScaleHeader>
        <ScaleDisplay>{`Scaler: ${scalerDisplay}`}</ScaleDisplay>
        {hasServings && <Servings>{`${servings * scaler} Servings`}</Servings>}
      </ScaleHeader>
      <ScaleButtons>
        <ScaleInput
          id="ones"
          min="1"
          type="number"
          onChange={e => scaleRecipe(e.target, document.getElementById('numerator'), document.getElementById('denominator'))}
        />
        <ScaleInput
          id="numerator"
          min="1"
          type="number"
          onChange={e => scaleRecipe(document.getElementById('ones'), e.target, document.getElementById('denominator'))}
        />
        <span>/</span>
        <ScaleInput
          id="denominator"
          min="2"
          type="number"
          onChange={e => scaleRecipe(document.getElementById('ones'), document.getElementById('numerator'), e.target)}
        />
      </ScaleButtons>
    </Scale>
  );
}
