// import React, { Component, useContext } from 'react';
// // import '../Css/Browse.css';
// import { restdb } from '../RecipeAPI/RestDB.js';
// import RecipePreview from '../Components/RecipePreview.js';
// import RecipeClient from '../RecipeAPI/RecipeClient'
// import BrowseContext from '..//Context/BrowseContext';
// import styled from 'styled-components';

// async function getRecipeData(setRecipe) {
//     const client = new RecipeClient();
//     const recipes = await client.getAllRecipes();
//     console.log(JSON.stringify(recipes));
//     // setRecipe(recipes);

//     // restdb.get('recipe?q={}&h={"$orderby": {"RecipeTitle": 1}}')
//     //   .then(res => {
//     //     let recipes = res.data;
//     //     this.setState({displayRecipes : recipes});
//     //   });
// }

// const StyledBrowse = styled.div``;

// function Browse({ context }) {
//     const {
//         recipes,
//       } = useContext(BrowseContext);
//     return (
//     <BrowseContext.Provider value={BrowseContext}>
//         <StyledBrowse>
//             {/* <div className="Browse">
//                 <header className="Browse-header">
//                     <script src="https://<databasename>.restdb.io/assets/js/eventsource.min.js"></script>
//                     <script src="https://<databasename>.restdb.io/rest/_jsapi.js?plainjs=true"></script>
//                 </header>
//                 <div class="browse-body">
//                     <h1>All Recipes</h1>
//                     {recipes}
//                 </div>
//             </div> */}

//         </StyledBrowse>
//       </BrowseContext.Provider>
//     );
//   }
//   export default Browse;
