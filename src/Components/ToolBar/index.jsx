import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ScaleTool from './ScaleTool';
import TempTool from './TempTool';
import ApplianceTool from './ApplianceTool';
import { onMobile, darkBlue, mediumBlue } from '../../Styles/constants';
import RecipeContext from '../../Context/RecipeContext';

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${darkBlue};
    color: white;
    height: fit-content;
    margin-top: 1rem;
    margin-left: 1rem;

    ${onMobile} {
        margin: 0;
    }
`;

const Header = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    font-weight: bold;
    font-size: 1.5rem;
    min-width: max-content;
    > :last-child {
        float: right;
        padding-right: 0.5rem;
    }
`;

const Tools = withStyles({
  wrapperInner: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: mediumBlue,
    flexWrap: 'wrap',
    padding: '0.5rem',
  },
})(Collapse);

const HeaderIcon = styled(FontAwesomeIcon)`
    margin-right: 1rem;
    cursor: pointer;
`;

export default function ToolBar() {
  const {
    recipeAppliances, isCelsius,
  } = useContext(RecipeContext);

  const [expanded, setExpanded] = React.useState(true);
  const hasAppliances = recipeAppliances && recipeAppliances.length > 0;
  const hasTemperature = isCelsius !== undefined;

  return (
    <Sidebar>
      <Header onClick={() => setExpanded(!expanded)}>
        <HeaderIcon icon={faToolbox} />
        <ExpandMoreIcon />
      </Header>
      <Tools in={expanded} timeout="auto" unmountOnExit>
        <ScaleTool />
        { hasTemperature && <TempTool /> }
        { hasAppliances && <ApplianceTool /> }
      </Tools>
    </Sidebar>
  );
}
