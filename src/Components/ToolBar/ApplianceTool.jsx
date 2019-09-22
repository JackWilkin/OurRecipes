import React, { useContext } from 'react';
import styled from 'styled-components';
import { IconImage } from '../../Styles/constants';
import RecipeContext from '../../Context/RecipeContext';
import Mixer from '../../Content/Images/mixer-white.png';

const Appliances = styled.div`
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

export default function ApplianceTool() {
  const {
    recipeAppliances,
  } = useContext(RecipeContext);

  const hasAppliances = recipeAppliances && recipeAppliances.length > 0;

  const appliances = !hasAppliances ? [] : recipeAppliances.map(
    appliance => <Appliance key={appliance.id}>{appliance.name}</Appliance>,
  );

  return (
    <Appliances>
      <IconImage src={Mixer} />
      <ApplianceList>{appliances}</ApplianceList>
    </Appliances>
  );
}
