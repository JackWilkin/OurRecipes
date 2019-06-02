import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import { styled as muiStyled } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { createIngredientDisplay, getRecipeImage } from '../utils';
import { darkBlue, lightBlue } from '../Styles/constants';
import GlobalContext from '../Context/GlobalContext';
// import Avatar from '@material-ui/core/Avatar';

const RecipePreview = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
})(Card);

const RecipeHeader = withStyles({
  root: {
    backgroundColor: darkBlue,
    minWidth: '15rem',
    '& span': {
      color: 'white',
      fontSize: '1.3rem',
    },
  },
})(CardHeader);

const RecipeLink = styled(Link)`
  color: white;
  padding-left: 1rem;

  &:hover {
    color: ${lightBlue};
  }
`;

const RecipeMedia = withStyles({
  root: {
    height: '15rem',
    paddingTop: '56.25%',
  },
})(CardMedia);

const RecipeCardActions = withStyles({
  root: {
    display: 'flex',
    backgroundColor: darkBlue,
    padding: 0,
    '& span': {
      color: 'white',
    },
  },
})(CardActions);

const RecipeIngredient = styled.div`
    padding: 0.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
`;

const RecipeIngredients = withStyles({
  root: {
    height: '15rem',
    overflow: 'auto',
    padding: 0,
  },
})(CardContent);

const DetailsHeader = withStyles({
  root: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
})(Typography);

export default function RecipeCard(props) {
  const { recipe } = props;
  const { hasImage, recipeImage } = getRecipeImage(recipe.id);
  const { availableUnits } = useContext(GlobalContext);
  const [expanded, setExpanded] = React.useState(false);

  const ingredients = recipe.ingredients ? recipe.ingredients.map((ingredient) => {
    const ingredientUnit = availableUnits.find(unit => unit.id === ingredient.unit);
    const viewIngredient = {
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredientUnit,
    };
    return (
      <RecipeIngredient key={ingredient.id}>
        {createIngredientDisplay({ ingredient: viewIngredient, scaler: 1 }).ingredientString}
      </RecipeIngredient>
    );
  }) : [];


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const OpenDetailsIcon = muiStyled(IconButton)({
    marginLeft: 'auto',
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  });

  return (
    <RecipePreview>
      <RecipeHeader
        action={(
          <Tooltip title="View recipe">
            <RecipeLink to={`/Recipe/${recipe.id}`}>
              <FontAwesomeIcon size="lg" icon={faInfoCircle} />
            </RecipeLink>
          </Tooltip>
        )}
        title={recipe.title}
        subheader={recipe.subTitle}
      />
      {hasImage ? <RecipeMedia image={recipeImage} /> : (
        <RecipeIngredients>
          {ingredients}
        </RecipeIngredients>
      )}
      <RecipeCardActions disableActionSpacing>
        {/* <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share: copy link">
          <ShareIcon />
        </IconButton> */}
        <OpenDetailsIcon
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </OpenDetailsIcon>
      </RecipeCardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {hasImage && <DetailsHeader variant="h6">Ingredients</DetailsHeader>}
          {hasImage && ingredients}
          <DetailsHeader variant="h6">Instructions</DetailsHeader>
          <Typography paragraph>{recipe.instructions}</Typography>
        </CardContent>
      </Collapse>
    </RecipePreview>
  );
}
