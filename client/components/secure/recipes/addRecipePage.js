import React from 'react';

class AddRecipe extends React.Component {
  render() {
    return (
      <div className="row" style={{marginTop: '3%'}} >
        <div className="container">
          <div className="col s12 m12 l12"> 
            <div className="col m2"></div>
            <div className="col s12 m8 white">     
              <form action="">
                <h5 className="center">Add a Recipe</h5>
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Recipe Image</span>
                    <input type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input id="recipeName" type="text" className="validate" />
                    <label for="recipName">Name of Recipe</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="description" className="materialize-textarea" data-length="250"></textarea>
                    <label for="description">Description</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <select>
                      <option value="" disabled selected>Choose Meal type</option>
                      <option value="1">Breakfast</option>
                      <option value="2">Elevenses</option>
                      <option value="3">Brunch</option>
                      <option value="4">Lunch</option>
                      <option value="5">Plate lunch</option>
                      <option value="6">Dinner</option>
                    </select>
                    <label>Meal Type</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="mealType" type="text" className="validate" />
                    <label for="mealType">Meal Type</label>
                  </div>
                </div>
                <div className="row">
                  <h5 className="center">Ingredients</h5>
                  <ul className="collection">
                    <li className="collection-item">50g of brown rice</li>
                    <li className="collection-item">2 cups of sugar</li>
                    <li className="collection-item">3 eggs</li>
                  </ul>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="ingredients" type="text" className="validate" />
                    <label for="ingredients">Ingredients</label>
                  </div>
                </div>
                <div className="row">
                   <div className="col s2 m6"><a href="#" className="btn">next ingredient</a></div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <h5 className="center">Method</h5>
                    <textarea className="method"></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col m3"></div>
                  <div className="input-field col m6 center">
                    <input type="submit" value="Add Recipe" className="btn" />
                  </div>
                  <div className="col m3"></div>
                </div>
              </form>
            </div>     
            <div className="col m2"></div> 
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecipe;