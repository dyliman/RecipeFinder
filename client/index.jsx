  import React from 'react';
  import ReactDOM from 'react-dom';
  import $ from 'jquery';

  class App extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        from: 0,
        to: 50,
        diet: 'balanced',
        caloriesMin: 0,
        caloriesMax: 1500,
        cookingTimeMin: 0,
        cookingTimeMax: 60,
        recipes: [],
        excluded: [], // List of all ingredients? 
      }
    }

    handleInputChange(event) { // for cooking time and calories
      let settingState = {}
      settingState[event.target.getAttribute('name')] = event.target.value
      this.setState(settingState)
    }

    handleDietSelect(event) { // for changing diet type
      this.setState({diet: event.target.value})
    }

    handleExcludeIngredientButton(event) { // adds the ingredients to list
      let list = this.state.excluded
      list.push($('.ingredientsList').val()) // will currently have a bug if user puts extra whitespace. idea to fix: dont worry about whitespace user puts, and just get rid of all whitespace when doing logic
      this.setState({excluded: list})
      $('.ingredientsList').val('')
    }

    handleSearchForRecipesButton(event) {
      let id = '6cac6fec'
      let key = 'd6ccba2d483993160f27cce8eb7b990a'
      let url = `https://api.edamam.com/search?q=${$('.query').val().split(' ').join('+')}&app_id=${id}&app_key=${key}&from=${this.state.from}&to=${this.state.to}&diet=${this.state.diet}&calories=${this.state.caloriesMin}-${this.state.caloriesMax}&time=${this.state.cookingTimeMin}-${this.state.cookingTimeMax}&excluded=${this.state.excluded.join('&excluded=')}`
      console.log(url)
      $.ajax({
        type: 'GET',
        url: url,
        success: (data) => {
          this.setState({recipes:data.hits})
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    renderIngredientList() { // renders the user's ingredients to the screen
      return this.state.excluded.map((currentIngredient) => {
        return(
          <li className="currentIngredient" name={`${currentIngredient}`}>
            {`${currentIngredient}`}
          </li>
        )
      })
    }

    handleRenderRecipes() {
      return this.state.recipes.map((currentRecipe) => {
        let name = currentRecipe.recipe.label
        let calories = currentRecipe.recipe.calories
        let image = currentRecipe.recipe.image
        let time = currentRecipe.recipe.totalTime
        let recipeYield = currentRecipe.recipe.yield
        let url = currentRecipe.recipe.url
        let ingredients = currentRecipe.recipe.ingredientLines
        return(
          <div className="currentRecipe" name={`${currentRecipe}`}>
            <img className="recipeImage" src={`${image}`}></img>
            <div className="recipeInformation">
              <div className="recipeName">{name}</div>
              <div className="recipeDetails">
                <div className="recipeCalories">{`Calories: ${Math.ceil(calories)}`}</div>
                <div className="recipeTime">{`Cooking Time: ${time}`}</div>
                <div className="recipeYield">{`Yields: ${recipeYield} Servings`}</div>
              </div>
              <a className="recipeURL" href={`${url}`}>For the full recipe, click here</a>
              <div className="recipeIngredients">{ingredients}</div>
            </div>
          </div>
        )
      })
    }

    render() {
      return(
        <div className="mainPage"> 
          <div className="mainTitle">Design Your Recipe</div>
            <div className="SearchOptionSide">
              <div className = "searchOptions">

                <div className="searchColumn">
                  <div className="queryComponent">
                    Recipe Search: <span className="optional">(Optional)</span>
                    <div>
                      <input type="text" className="query"></input>
                    </div>
                  </div>

                  <div className="dietComponent">
                    Diet Type:
                    <div>
                    <select className="dietInput" onChange={this.handleDietSelect.bind(this)}>
                      <option value="balanced">Balanced</option>
                      <option value="high-protein">High Protein</option>
                      <option value="high-fiber">High Fiber</option>
                      <option value="low-fat">Low Fat</option>
                      <option value="low-carb">Low Carb</option>
                      <option value="low-sodium">Low Sodium</option>
                    </select>
                    </div>
                  </div>
                </div> 


                <div className="searchColumn">
                    <div className="ingredientsComponent">
                      Exclude Ingredients: <span className="optional">(Optional)</span>
                    <div>
                      <input type="text" className="ingredientsList"></input>
                      <button className="ingredientListAdd" onClick={this.handleExcludeIngredientButton.bind(this)}>Add Ingredient</button>
                    </div>
                  </div>

                  <div className="UserIngredientsSide">
                    <div className="ListOfIngredientsTitle">List of Excluded Ingredients</div>
                    <div className="ListOfIngredients">
                      <ul>
                        {this.renderIngredientList()}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="searchColumn">
                  <div className="caloriesComponent">
                    Calorie Range:
                    <div>
                    <input type="number" min="0" defaultValue="0" name="caloriesMin" className="caloriesMinInput" onChange={this.handleInputChange.bind(this)}></input>
                    <input type="number" min="0" defaultValue="1500" name="caloriesMax" className="caloriesMaxInput" onChange={this.handleInputChange.bind(this)}></input>
                    </div>
                  </div>

                  <div className="cookingTimeComponent">
                    Cooking Time (Minutes):
                    <div>
                    <input type="number" min="0" defaultValue="0" name="cookingTimeMin" className="cookingTimeMinInput" onChange={this.handleInputChange.bind(this)}></input>
                    <input type="number" min="0" defaultValue="60" name="cookingTimeMax" className="cookingTimeMaxInput" onChange={this.handleInputChange.bind(this)}></input>
                    </div>
                  </div>
                </div> 
              </div>

              <div className="searchDiv">
                <button className="searchForRecipes" onClick={this.handleSearchForRecipesButton.bind(this)}>Search!</button>
              </div>
              
            </div>
          

          <div className="recipeList">
            <div className="recipeTitle">Recipes</div>
            {this.handleRenderRecipes()}
          </div>
        </div>
      )
    }
  }

  ReactDOM.render(<App />, document.getElementById('App'));
