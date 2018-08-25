import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      diet: 'balanced',
      caloriesMin: 0,
      caloriesMax: 1500,
      cookingTimeMin: 0,
      cookingTimeMax: 60,
      excluded: '', // List of all ingredients? 
      ingredients: [],
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

  handleAddIngredientButton(event) { // adds the ingredients to list
    let list = this.state.ingredients
    list.push($('.ingredientsList').val())
    this.setState({ingredients: list})
  }

  handleSearchForRecipesButton(event) {
    // make a ajax call for recipes here
  }

  render() {
    return(
      <div className="searchPage">Search

        <div className="ingredientsComponent">
          Ingredients:
          <div>
            <input type="text" className="ingredientsList"></input>
            <button className="ingredientListAdd" onClick={this.handleAddIngredientButton.bind(this)}>Add Ingredient</button>
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

        <div className="caloriesComponent">
          Calorie Range:
          <div>
          <input type="number" min="0" name="caloriesMin" className="caloriesMinInput" onChange={this.handleInputChange.bind(this)}></input>
          <input type="number" min="0" name="caloriesMax" className="caloriesMaxInput" onChange={this.handleInputChange.bind(this)}></input>
          </div>
        </div>

        <div className="cookingTimeComponent">
          Cooking Time:
          <div>
          <input type="number" min="0" name="cookingTimeMin" className="cookingTimeMinInput" onChange={this.handleInputChange.bind(this)}></input>
          <input type="number" min="0" name="cookingTimeMax" className="cookingTimeMaxInput" onChange={this.handleInputChange.bind(this)}></input>
          </div>
        </div>

        <div>
          <button className="searchForRecipes" onClick="handleSearchForRecipesButton">Search!</button>
        </div>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));
