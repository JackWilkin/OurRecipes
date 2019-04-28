import React, { useContext } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';
import { decimalToFraction } from '../utils';
import {
  darkBlue, mediumBlue, lightBlue, darkBlueTint,
} from '../Styles/constants';
import RecipeContext from '../Context/RecipeContext';

const SCALE_BUTTON_COUNT = 3;
const SCALE_BUTTON_WIDTH_VALUE = 3.2;
const SCALE_BUTTON_WIDTH = `${SCALE_BUTTON_WIDTH_VALUE}rem`;

const Scale = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${mediumBlue};
    border-right: 1px solid ${mediumBlue};
    border-left: 1px solid ${mediumBlue};
    border-bottom: 1px solid ${mediumBlue};
    padding: 0.5rem;
`;

const ScaleHeader = styled.span`
    font-size: 1.1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`;

const Servings = styled.span`
    padding-right: 0.25rem;
    float: right;
`;

const ScaleInput = styled(Input)`
    width: calc(100% - ${SCALE_BUTTON_COUNT * SCALE_BUTTON_WIDTH_VALUE}rem);
    &.ui.input {
        &> input {
            border-radius: 0;
            width: 100%;
            border: none;
            text-align: center;
        }
    }   
`;

const ScaleButton = styled(Button)`

    &.ui.button {
        background-color: ${lightBlue};
        border-left: solid 1px ${darkBlue};
        border-radius: 0;
        height: 100%;
        width: ${SCALE_BUTTON_WIDTH};
        margin: 0;
        padding: 0;

        :hover {
            background-color: ${darkBlue};
            color: white;
        }

        :active {
            background-color: ${darkBlueTint};
            color: white;
        }
    }
`;

const ScaleButtons = styled.div`
    display: flex;
`;


export default function ScaleTool() {
  const { scaler, setScaler, servings } = useContext(RecipeContext);

  const scalerDisplay = scaler ? decimalToFraction(scaler, 8) : 1;

  const hasServings = !(servings === undefined);

  return (
    <Scale>
      <ScaleHeader>
        Scale recipe
        { hasServings
            && (
            <Servings>
                {`${servings * scaler} Servings`}
            </Servings>
            )
        }
      </ScaleHeader>
      <ScaleInput
        value={scalerDisplay}
        action={(
          <ScaleButtons>
            <ScaleButton onClick={() => setScaler(0.5)}>1/2</ScaleButton>
            <ScaleButton onClick={() => setScaler(1)}>1</ScaleButton>
            <ScaleButton onClick={() => setScaler(2)}>2</ScaleButton>
          </ScaleButtons>
        )}
      />
    </Scale>
  );
}
