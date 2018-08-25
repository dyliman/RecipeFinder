import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';

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
    }
  }

  handleInputChange(event) { // for cooking time and calories
    let settingState = {}
    settingState[event.target.getAttribute('name')] = event.target.value
    this.setState(settingState)
  }

  render() {
    return(
      <div className="searchPage">Search
        <div className="ingredientsComponent">
          Ingredients:
          <div>
            <input className="ingredientsList"></input>
            <button className="ingredientListAdd">Add Ingredient</button>
          </div>
        </div>
        <div className="dietComponent">
          Diet Type:
          <div>
          <select className="dietInput">
            <option name="balanced">Balanced</option>
            <option name="high-protein">High Protein</option>
            <option name="high-fiber">High Fiber</option>
            <option name="low-fat">Low Fat</option>
            <option name="low-carb">Low Carb</option>
            <option name="low-sodium">Low Sodium</option>
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
          <button>Search!</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));
